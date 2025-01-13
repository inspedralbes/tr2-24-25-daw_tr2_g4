<template>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

  <!-- Enlace para volver -->
  <RouterLink to="/jugar">
    <img style="right: inherit;" src="@/assets/imagenes/volver.png" alt="Volver" class="imagen_volver">
  </RouterLink>

  <div class="jugar" v-if="visibleJugar && !isGameFinished">
    <q-linear-progress :value="progress" color="red" class="progreso"> </q-linear-progress>
    <Partida_Historia :data="data.preguntas[index]" @siguiente="siguientePregunta"> </Partida_Historia>
  </div>

  <div class="fondo" v-else>
    <div class="niveles">
      <q-btn round class="nivel" :class="{'NoDisponible': colores[9]==1, 'Superado': colores[9]==2}" style="grid-row: 1; grid-column: 2;" :label="10" @click="cargarPreguntas(10)" :disabled="isGameFinished"></q-btn>
      <q-btn round class="nivel " :class="{'NoDisponible': colores[8]==1, 'Superado': colores[8]==2}" style="grid-row: 2; grid-column: 3;" :label="9" @click="cargarPreguntas(9)" :disabled="isGameFinished"></q-btn>
      <q-btn round class="nivel" :class="{'NoDisponible': colores[7]==1, 'Superado': colores[7]==2}" style="grid-row: 3; grid-column: 3;" :label="8" @click="cargarPreguntas(8)" :disabled="isGameFinished"></q-btn>
      <q-btn round class="nivel" :class="{'NoDisponible': colores[6]==1, 'Superado': colores[6]==2}" style="grid-row: 4; grid-column: 2;" :label="7" @click="cargarPreguntas(7)" :disabled="isGameFinished"></q-btn>
      <q-btn round class="nivel" :class="{'NoDisponible': colores[5]==1, 'Superado': colores[5]==2}" style="grid-row: 5; grid-column: 1;" :label="6" @click="cargarPreguntas(6)" :disabled="isGameFinished"></q-btn>      
      <q-btn round class="nivel" :class="{'NoDisponible': colores[4]==1, 'Superado': colores[4]==2}" style="grid-row: 6; grid-column: 2;" :label="5" @click="cargarPreguntas(5)" :disabled="isGameFinished"></q-btn>
      <q-btn round class="nivel" :class="{'NoDisponible': colores[3]==1, 'Superado': colores[3]==2}" style="grid-row: 7; grid-column: 3;" :label="4" @click="cargarPreguntas(4)" :disabled="isGameFinished"></q-btn>
      <q-btn round class="nivel" :class="{'NoDisponible': colores[2]==1, 'Superado': colores[2]==2}" style="grid-row: 8; grid-column: 2;" :label="3" @click="cargarPreguntas(3)" :disabled="isGameFinished"></q-btn> 
      <q-btn round class="nivel" :class="{'NoDisponible': colores[1]==1, 'Superado': colores[1]==2}" style="grid-row: 9; grid-column: 1;" :label="2" @click="cargarPreguntas(2)" :disabled="isGameFinished"></q-btn>
      <q-btn round class="nivel" :class="{'NoDisponible': colores[0]==1, 'Superado': colores[0]==2}" style="grid-row: 10; grid-column: 2;" :label="1" @click="cargarPreguntas(1)" :disabled="isGameFinished"></q-btn>
    </div>
  </div>

  <!-- Div para alerta de ganar o perder -->
  <div v-if="isGameFinished" class="alerta" :class="gameResult">
    <!-- Cuadro del nivel actual -->
    <div class="nivel-caja">
      Nivel: {{ nivelActual }}
    </div>

    <p>{{ gameMessage }}</p>

    <!-- Botones de acción -->
    <div class="alert-buttons">
      <q-btn label="Reintentar" @click="reiniciarJuego" color="black" class="boton-alerta"></q-btn>
      <!-- Solo mostrar el botón de "Siguiente" si el jugador ha ganado Y no está en el nivel 10 -->
      <q-btn v-if="gameResult === 'ganaste' && nivelActual !== 10" label="Siguiente" @click="siguienteNivel" color="black" class="boton-alerta"></q-btn>
      <q-btn icon="close" @click="cerrarAlerta" color="red" class="cerrar-alerta"></q-btn>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Partida_Historia from '@/components/Partida_Historia.vue';
import { getPreguntas } from '@/comunication_manager';
import { useCounterStore } from '@/stores/counter';

const progress = ref(0.0);
const index = ref(0);
const canastas = ref(0);
const nivel = ref("");
const nivelActual = ref("");
const useApp = useCounterStore();

const isGameFinished = ref(false); 
const gameResult = ref(""); 
const gameMessage = ref(""); 

function siguientePregunta(info) {
  if (info.fallo) {
  } else {
    canastas.value++;
    progress.value += 0.3;
  }

  if (index.value < 2) {
    index.value++;
  } else {
    setTimeout(() => {
      visibleJugar.value = false;

      if (canastas.value == 3) {
        gameMessage.value = "¡Ganaste!";
        gameResult.value = "ganaste"; 
        isGameFinished.value = true;

        if (nivelActual.value === 10) {
          // Si es nivel 10, no permitimos continuar, solo muestra la alerta final
          gameMessage.value = "¡Felicidades, has completado todos los niveles!";
          gameResult.value = "ganaste";
        } else if (useApp.loginInfo.nivel > nivelActual.value) {
          // No hacer nada si el nivel ya está superado
        } else {
          useApp.loginInfo.nivel++;
          nivel.value = useApp.loginInfo.nivel;
          niveles();
        }
      } else {
        gameMessage.value = "Perdiste!";
        gameResult.value = "perdiste"; 
        isGameFinished.value = true;
      }
    }, 800);
  }
}

const visibleJugar = ref(false);
nivel.value = useApp.loginInfo.nivel;

const data = reactive({ preguntas: "" });

async function cargarPreguntas(i) {
  progress.value = 0.0;
  index.value = 0;
  canastas.value = 0;
  data.preguntas = await getPreguntas(i);
  console.log(data.preguntas);
  visibleJugar.value = true;
  nivelActual.value = i;
}

const colores = reactive([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
niveles();

function niveles() {
  for (let index = nivel.value - 1; index >= 0; index--) {
    colores[index] = 2;
  }
  colores[nivel.value] = 0;
}

function reiniciarJuego() {
  // Reinicia el juego actual desde el principio
  cargarPreguntas(nivelActual.value);
  isGameFinished.value = false;
}

function siguienteNivel() {
  // Carga el siguiente nivel
  let siguienteNivel = nivelActual.value + 1;
  
  if (siguienteNivel <= 10) {
    cargarPreguntas(siguienteNivel);
    isGameFinished.value = false;
  } else {
    gameMessage.value = "¡Felicidades, has completado todos los niveles!";
    gameResult.value = "ganaste";
    isGameFinished.value = true; // Esto hará que se muestre la alerta inmediatamente
  }
}

function cerrarAlerta() {
  // Cierra la alerta sin hacer nada más
  isGameFinished.value = false;
}
</script>

<style scoped>
.progreso {
  height: 20px;
}

.NoDisponible {
  filter: grayscale(100%);
}

.Superado {
  filter: hue-rotate(120deg);
}

.imagen_volver {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 40px;
  border: 2px solid white;
  border-radius: 5px;
}

.fondo {
  background-image: url('@/assets/imagenes/fondo1.jpg');
  background-size: 500px 1000px;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
}


.niveles {
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  gap: 30px;
  justify-items: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 5px;
}

.nivel {
  font-size: 16px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Press Start 2P', cursive;
  background-size: cover;
  background-position: center;
  color: white;
  border: 5px solid white;
}

.nivel:nth-child(1),
.nivel:nth-child(2),
.nivel:nth-child(3),
.nivel:nth-child(4),
.nivel:nth-child(5),
.nivel:nth-child(6),
.nivel:nth-child(7),
.nivel:nth-child(8),
.nivel:nth-child(9),
.nivel:nth-child(10) {
  background-image: url('@/assets/imagenes/pelotareal.png');
}

.pregunta {
  margin-top: 20px;
  color: white;
  font-size: 20px;
  text-align: center;
}

/* Estilos para las alertas */
.alerta {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 10px;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
}

.alerta.ganaste {
  background-color: #4caf50;
}

.alerta.perdiste {
  background-color: #d10e00;
}

.boton-alerta {
  margin-top: 15px;
  font-family: 'Press Start 2P', cursive;
}

.nivel-caja {
  background-color: #564caf;
  color: white;
  padding: 10px;
  font-size: 16px;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  margin-top: 30px; 
}

.alert-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}

.cerrar-alerta {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 10px;
}
</style>
