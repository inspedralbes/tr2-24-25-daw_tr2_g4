<script setup>
import { ref, reactive, onBeforeUnmount, onMounted } from 'vue';
import SalasPrivadas from '@/components/SalasPrivadas.vue';
import { useCounterStore } from '@/stores/counter';
import socketManager from '@/socket';
import Partida from '@/components/Partida.vue';
import Temporizador from '@/components/temporizador.vue';
import confetti from 'canvas-confetti';
import audioPodio from '@/assets/audio/podio_multi.mp3';

const visibleSalas = ref(true);
const visibleJuego = ref(false);
const store = useCounterStore();
const token = store.getLoginInfo.token;
const audio = new Audio(audioPodio);


console.log("Token enviado al servidor:", token);
socketManager.RemSocket();
const visibleFinal = ref(false);
const socket = socketManager.getSocket(token);
const visiblePoder = ref(false);
const visibleRanking = ref(false);
const visibleTempo = ref(false);
const visiblePodio = ref(false);
const visibleCopa = ref(false);

const imagenes = ["/items/banana.webp", "/items/bill_bala.webp",
  "/items/bomba.webp", "/items/caparazon_azul.webp",
  "/items/caparazon_rojo.webp", "/items/caparazon_verde.webp",
  "/items/honguito.webp", "/items/rayo.webp", "/items/estrella.webp"

];

const imagenesCopas = [
  "/podio/copa1.png", 
  "/podio/copa2.png",
  "/podio/copa3.png"  
];

let posiciones = ref("");
let poderes = reactive({ data: "" })
let data = reactive({ preguntas: "" });
let medio = reactive({ poder: "", username: "", num: "" });
let animacionConfetti;
const visibleTedio = ref(false);
const temblor = ref(false);
const puntacionFinal = reactive({ puntuacion: "", posicion: "" })
const imagenCopaGanador = ref(null);

socket.on('tedio', (nombre, poders) => {

  medio.poder = poders.poder;
  medio.num = poders.num;
  medio.username = nombre;
  visibleTedio.value = true;
  temblor.value = true;
  setTimeout(() => {
    temblor.value = false;
  }, 200);
  setTimeout(() => {
    visibleTedio.value = false;
  }, 1500);

})


socket.on('acabar', (index, puntuacion) => {

  if (visibleRanking.value == false) {
    puntacionFinal.puntuacion = puntuacion;
    puntacionFinal.posicion = index;
    visibleJuego.value = false;

    if (index === 1) {
      imagenCopaGanador.value = imagenesCopas[0];
      lanzarConfeti()
    } else if (index === 2) {
      imagenCopaGanador.value = imagenesCopas[1];
      lanzarConfeti()
    } else if (index === 3) {
      imagenCopaGanador.value = imagenesCopas[2];
      lanzarConfeti()
    } else {
      imagenCopaGanador.value = null; 
    }

    visibleFinal.value = true;



  } else if (visibleRanking.value == true) {
    visibleRanking.value = false;
    visiblePodio.value = true;
    audio.play().catch(error => {
      console.error('No se pudo reproducir el audio:', error);
    });
    lanzarConfeti();
  }



})



function siguientePregunta(info) {
  socket.emit('cambio_pregunta', store.loginInfo.username, store.SalaActual, info.canasta);
}

function desconectar() {
  socketManager.RemSocket();
}



function empezar() {
  visibleTempo.value = true;
  if (visibleSalas.value == true) {
    visibleSalas.value = false;

  }


}


function tempoAcabado() {
  visibleTempo.value = false;
  visibleRanking.value = true;
  const SalaActual = store.SalaActual;
  socket.emit('empezar', SalaActual);
  visibleRanking.value = true;
  temporizador();


}



socket.on('ranking', (rankings) => {
  posiciones.value = [...rankings];



})

socket.on('poderes', (param) => {

  visiblePoder.value = true;
  poderes.data = param;
  setTimeout(() => {
    visiblePoder.value = false;
  }, 1000);


})

const tiempo = ref(20);
let interval;

function temporizador() {
  console.log("tiempo", tiempo.value)


  if (interval) return;
  interval = setInterval(() => {
    if (tiempo.value > 0) {
      tiempo.value--;

    } else {
      clearInterval(interval);
      socket.emit('acabar', store.SalaActual);
      resetTimer();
    }
  }, 1000);


  function resetTimer() {
    clearInterval(interval);
    interval = null;
    tiempo.value = 60;

  }


}

function usarpoder() {

  if (poderes.data) {
    socket.emit('poder', poderes.data, store.SalaActual, store.loginInfo.username)
    poderes.data = "";
  }



}




socket.on('pregunta', (pregunta) => {
  data.preguntas = pregunta;


  if (visibleJuego.value == false) {
    visibleJuego.value = true;
    visibleSalas.value = false;

  }

})

const visibleBoton = ref(false);

function mostrarBoton() {
  visibleBoton.value = !visibleBoton.value;
}

function lanzarConfeti() {
  const end = Date.now() + (15 * 1000);
  const colors = [
    '#ff0000', '#ffff00', '#00ff00', '#0000ff', '#ff00ff',
    '#00ffff', '#ff7f00', '#8a2be2', '#a52a2a', '#000080',
    '#ff1493', '#7fff00', '#d2691e', '#ff4500', '#ff6347'
  ];

  function frame() {
    confetti({
      particleCount: 5,
      angle: 90,
      spread: 15,
      startVelocity: 30,
      decay: 0.9,
      gravity: 1.5,
      origin: { x: Math.random(), y: 0 },
      colors: colors,
    });

    if (Date.now() < end) {
      animacionConfetti = requestAnimationFrame(frame);
    }
  }
  frame();


}


function detenerConfeti() {
  if (animacionConfetti) {
    cancelAnimationFrame(animacionConfetti);
    animacionConfetti = null;
    confetti.reset();

  }
}

function mostrarRanking(){
  visiblePodio.value = false;
  visibleRanking.value = true;
}
</script>

<template>
  <main>
    <div v-if="visibleSalas" class="main-multijugador">
      <div class="body_multijugador">
        <SalasPrivadas :socket="socket" @boton="mostrarBoton" />

        <q-btn v-if="visibleBoton" color="orange" @click="empezar" size="25px" class="boton-volver" glossy
          label="Empezar"></q-btn>

      </div>




      <RouterLink to="/jugar">
        <q-btn color="red-12" @click="desconectar" size="25px" class="boton-volver" glossy label="Volver"></q-btn>
      </RouterLink>


    </div>
    <Temporizador v-if="visibleTempo" @complete="tempoAcabado" />
    <div v-if="visibleJuego" :class="{ 'temblor': temblor }">

      <div v-if="visibleTedio" class="tedioFuera">
        <div class="tedio">
          <img :src="`/items/${medio.poder}.webp`" alt="">
          <div class="tedio_num"> {{ medio.username }}</div>
          <div class="tedio_nom"> -{{ medio.num }}</div>

        </div>
      </div>
      <table class="ranking-table">

        <transition-group name="rank" tag="tbody">
          <tr :class="{ 'yoMismo': player.username === store.loginInfo.username }"
            v-for="(player, index) in posiciones.slice(0, 3)" :key="player.username">
            <td>{{ index + 1 }}</td>
            <td><img class="foto_ranking" :src="`/avatar/boy${player.avatar}.png`" alt="" srcset=""></td>

            <td>{{ player.puntacion }} </td>
          </tr>
        </transition-group>
      </table>


      <div class="poder">


        <div class="spin" v-if="visiblePoder">
          <img v-for="imagen in imagenes" :src="imagen" alt="">
          <img v-for="imagen in imagenes" :src="imagen" alt="">
        </div>

        <div v-else>
          <img @click="usarpoder" class="static" :src="`/items/${poderes.data.poder}.webp`" alt="">
        </div>


      </div>



      <Partida :data="data.preguntas" @siguiente="siguientePregunta"> </Partida>

    </div>

    <div v-if="visibleRanking">
      <RouterLink to="/jugar" @click.native="detenerConfeti">
          <img style="right: inherit;" src="@/assets/imagenes/volver.png" alt="Volver" class="imagen_volver">
        </RouterLink>
      <div class="bodyR">
        <div class="rankingTotal_ranking-container">
          <div class="tiempo_raninkg"> {{ tiempo }} </div>
          <table class="rankingTotal_table">
            <thead>
              <tr class="rankingTotal_tr">
                <th class="rankingTotal_th">Posición</th>
                <th class="rankingTotal_th">Avatar</th>
                <th class="rankingTotal_th">Username</th>
                <th class="rankingTotal_th">Puntos</th>
              </tr>
            </thead>
            <transition-group name="rank" tag="tbody">
              <tr v-for="(player, index) in posiciones" :key="player.username">
                <td>{{ index + 1 }}</td>
                <td><img class="foto_ranking" :src="`/avatar/boy${player.avatar}.png`" alt="" srcset=""></td>
                <td>{{ player.username }}</td>
                <td>{{ player.puntacion }} </td>
              </tr>
            </transition-group>
          </table>
        </div>
      </div>

    </div>
    <div v-if="visiblePodio">
      <div class="body-p">
        <RouterLink to="/jugar" @click.native="detenerConfeti">
          <img style="right: inherit;" src="@/assets/imagenes/volver.png" alt="Volver" class="imagen_volver">
        </RouterLink>
        <div class="titulo-ganadores">
          <h1>GANADORES</h1>
        </div>
        <div class="contenedor-podio">
          <div class="podio">
            <div class="copa" style="background-image: url('/podio/copa2.png')"></div>
            <div class="numero">2</div>
            <div class="podio-2"></div>
            <div class="jugador">{{ posiciones[1]?.username || "Vacío" }}</div>
            <div class="puntuacion">{{ posiciones[1]?.puntacion || "0" }}</div>
          </div>
          <div class="podio">
            <div class="copa" style="background-image: url('/podio/copa1.png')"></div>
            <div class="numero">1</div>
            <div class="podio-1"></div>
            <div class="jugador">{{ posiciones[0]?.username || "Vacío" }}</div>
            <div class="puntuacion">{{ posiciones[0]?.puntacion || "0" }}</div>
          </div>
          <div class="podio">
            <div class="copa" style="background-image: url('/podio/copa3.png')"></div>
            <div class="numero">3</div>
            <div class="podio-3"></div>
            <div class="jugador">{{ posiciones[2]?.username || "Vacío" }}</div>
            <div class="puntuacion">{{ posiciones[2]?.puntacion || "0" }}</div>
          </div>
        </div>
        <button class="boton-ranking" @click="mostrarRanking">VER RANKING</button>

      </div>
    </div>



    <div v-if="visibleFinal">
        <RouterLink to="/jugar" @click.native="detenerConfeti">
          <img style="right: inherit;" src="@/assets/imagenes/volver.png" alt="Volver" class="imagen_volver">
        </RouterLink>
      <div v-if="imagenCopaGanador!=null">
        <img v-if="imagenCopaGanador" :src="imagenCopaGanador" alt="Copa ganada" class="imagen-copa" />
      </div>
      <div class="pantallaFinalPosicion">{{ puntacionFinal.posicion }}º</div>
      <div class="pantallaFinalPuntuacion"><p class="p-pfp">PUNTUACION</p><br>{{ puntacionFinal.puntuacion }}</div>
    </div>



  </main>



</template>


<style scoped>
.boton-ranking {
  position: fixed; 
  bottom: 50px; 
  right: 20px;
  background-color: #000000; 
  color: #ffffff;
  border: none; 
  border-radius: 8px; 
  padding: 20px 20px; 
  font-family: 'Press Start 2P', cursive; 
  font-size: 1rem; 
  cursor: pointer; 
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); 
  transition: background-color 0.3s, transform 0.2s; 
}

.boton-ranking:hover {
  background-color: #ffffff;
  color: #000000; 
  transform: scale(1.1); 
}

.boton-ranking:active {
  transform: scale(1);
}


.imagen-copa {
  display: block; 
  margin: 0 auto; 
  width: 400px; 
  height: auto; 
  position: relative;
  margin-bottom: 80px;
}

.pantallaFinalPosicion {
  position: absolute; 
  top: 7%;
  left: 52%;
  transform: translateX(-50%);
  font-family: 'Press Start 2P', cursive;
  color: #ffffff;
  text-align: center;
  font-size: 5rem; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
}
.pantallaFinalPuntuacion {
  position: absolute; 
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Press Start 2P', cursive;
  color: #ffffff;
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
}
.p-pfp{
  position: absolute; 
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Press Start 2P', cursive;
  color: #ffffff;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
}


.imagen_volver {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 40px;
  border: 2px solid white;
  border-radius: 5px;
}

.body-p {
  font-family: 'Press Start 2P', cursive;
  background-image: url("@/assets/bioma/parque.jpg");
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 0 20px;
}

.titulo-ganadores {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #FFD700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4);
  margin-bottom: 10px;
}

.contenedor-podio {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: flex-end;
  gap: 10px;
  padding: 140px 30px 30px;
  background: #272727;
  border-radius: 15px;
  width: 90%;
  max-width: 1100px;
  height: 100%;
}

.podio {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.copa {
  position: absolute;
  top: -110px;
  width: 130px;
  height: 130px;
  background-size: contain;
  background-repeat: no-repeat;
}

.numero {
  position: absolute;
  top: -95px;
  font-size: 38px;
  font-weight: bold;
  color: #fff;
  z-index: 2;
}

.podio-1 {
  width: 150px;
  height: 250px;
  background: #ff9900;
  border-radius: 10px;
  border: 3px solid #fff;
  box-shadow: inset 0 -5px 0 #cc7a00;
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.9);
  position: relative;
}

.podio-2 {
  width: 130px;
  height: 200px;
  background: #cccccc;
  border-radius: 10px;
  border: 3px solid #fff;
  box-shadow: inset 0 -5px 0 #999999;
  position: relative;
}

.podio-3 {
  width: 130px;
  height: 130px;
  background: #cd7f32;
  border-radius: 10px;
  border: 3px solid #fff;
  box-shadow: inset 0 -5px 0 #9b5a23;
  position: relative;
}

.jugador {
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
}

.puntuacion {
  font-size: 16px;
  color: #ddd;
  margin-top: 5px;
}


.poder {
  width: 120px;
  height: 120px;
  border: 1px solid white;
  position: absolute;
  right: 0;
  top: 25%;
  overflow: hidden;

}

.bodyR {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: top;
  min-height: 100vh;
  text-align: center;
  font-size: 30px;
}


.tiempo_raninkg {
  border: 1px solid black;
  font-size: 100px;
  font-family: 'DS-Digital';
  text-shadow: 0 0 5px #f00, 0 0 10px #f00, 0 0 20px #f00, 0 0 30px #f00, 0 0 40px #f00, 0 0 50px #f00;
  color: rgb(255, 112, 112);
  background-color: black;
  grid-column: 2;
  place-items: center;
  border: 5px solid rgb(70, 70, 70);
  width: 170px;
  margin: 0 auto;
  text-align: center;


}

.rankingTotal_ranking-container {
  width: 90%;
  max-width: 800px;

  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.rankingTotal_ranking-header {
  background-color: #ff4500;
  color: #fff;
  text-align: center;
  padding: 20px;
  font-size: 1.5em;
  font-weight: bold;
}

.rankingTotal_table {
  width: 100%;
  border-collapse: collapse;
}

.rankingTotal_table {
  background-color: white;
}

.rankingTotal_th,
.rankingTotal_td {
  padding: 15px;
  text-align: center;
}

.rankingTotal_th {
  background-color: #ff7043;
  color: #fff;
}

.rankingTotal_tr:nth-child(even) {
  background-color: #f9f9f9;
}

.rankingTotal_tr:hover {
  background-color: #ffebee;
}

.rankingTotal_team {
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
}

.rankingTotal_team img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.spin {
  animation: spin 1s linear;

}

@keyframes temblor {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-10px);
  }

  50% {
    transform: translateX(10px);
  }

  75% {
    transform: translateX(-10px);
  }

  100% {
    transform: translateX(10px);
  }
}

.temblor {
  animation: temblor 0.2s linear infinite;
}

@keyframes spin {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-800px);
    /* Altura total de las imágenes visibles */
  }
}

.tedioFuera {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 150px;
  height: 150px;
  display: grid;

  border-radius: 50%;

}

.tedio_nom {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;

}

.tedio_num {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;

}

.tedio img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 70px;

}

.poder img {

  width: auto;
  height: 100px;

}

.static {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);


}

#main-multijugador {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;


}

.body_multijugador {
  grid-column: 2;

}

.ranking-table {

  border-collapse: collapse;
  position: absolute;
  font-size: 20px;
  top: 25%;
  background-color: white;

}

.yoMismo {

  background-color: rgb(223, 223, 223);
}

.foto_ranking {
  width: 40px;
  height: 40px;
  border-radius: 50%;

}

.ranking-table th,
.ranking-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.ranking-table th {
  background-color: #f2f2f2;
}

.rank-enter-active,
.rank-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.rank-enter-from,
.rank-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.rank-move {
  transition: transform 0.5s ease;
}
</style>