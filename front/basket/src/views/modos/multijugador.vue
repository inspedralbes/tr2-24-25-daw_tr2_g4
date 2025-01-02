<script setup>
import { ref,reactive,onBeforeUnmount,onMounted } from 'vue';
import SalasPrivadas from '@/components/SalasPrivadas.vue';
import { useCounterStore } from '@/stores/counter'; 
import socketManager from '@/socket'; 
import Partida from '@/components/Partida.vue';


const visibleSalas=ref(true);
const visibleJuego=ref(false);
const store = useCounterStore();
const token = store.getLoginInfo.token; 
 


console.log("Token enviado al servidor:", token);
socketManager.RemSocket();
const visibleFinal=ref(false);
const socket = socketManager.getSocket(token);
const visiblePoder=ref(false);
const visibleRanking=ref(false);

const imagenes=["/src/assets/items/banana.webp", "/src/assets/items/bill_bala.webp",
"/src/assets/items/bomba.webp", "/src/assets/items/caparazon_azul.webp",
"/src/assets/items/caparazon_rojo.webp","/src/assets/items/caparazon_verde.webp",
"/src/assets/items/honguito.webp","/src/assets/items/rayo.webp", "/src/assets/items/estrella.webp"

];


let posiciones=ref("");
let poderes=reactive({data:""})
let data= reactive({preguntas:""});
let medio=reactive({poder:"",username:"",num:""});
const visibleTedio=ref(false);
const temblor=ref(false);
const puntacionFinal=reactive({puntuacion:"",posicion:""})

socket.on('tedio',(nombre,poders)=>{

  medio.poder=poders.poder;
  medio.num=poders.num;
  medio.username=nombre;
  visibleTedio.value=true;
  temblor.value=true;
  setTimeout(() => {
        temblor.value=false;
      }, 200);
      setTimeout(() => {
      visibleTedio.value=false;
      }, 1500);
   
})


socket.on('acabar',(index,puntuacion)=>{

  if(visibleRanking.value==false){
  puntacionFinal.puntuacion=puntuacion;
  puntacionFinal.posicion=index;
  visibleJuego.value=false;
  visibleFinal.value=true;

  }



})


function siguientePregunta(info){
  socket.emit('cambio_pregunta', store.loginInfo.username, store.SalaActual,info.canasta);
}

function desconectar(){
  socketManager.RemSocket();
}


function empezar(){
      const SalaActual = store.SalaActual;
      socket.emit('empezar',SalaActual);
      visibleRanking.value=true;
      if(visibleSalas.value==true){
        visibleSalas.value=false;

      }
      temporizador();

    }



    socket.on('ranking',(rankings)=>{
      posiciones.value=[...rankings];
      


    })

    socket.on('poderes',(param)=>{
      
      visiblePoder.value=true;
      poderes.data=param;
      setTimeout(() => {
 visiblePoder.value=false;
}, 1000); 
  

    })

 const tiempo=ref(10);
 let interval;

 function temporizador(){
    console.log("tiempo",tiempo.value)
      
       
            if (interval) return; 
            interval = setInterval(() => {
                if (tiempo.value > 0) {
                    tiempo.value--;
               
                } else {
                    clearInterval(interval);
                    socket.emit('acabar',store.SalaActual);
                    resetTimer();
                }
            }, 1000);
       

        function resetTimer() {
            clearInterval(interval);
            interval = null;
            tiempo.value = 60;
         
        }


 }   
      
function usarpoder(){

  if(poderes.data){
    socket.emit('poder',poderes.data,store.SalaActual,store.loginInfo.username)
    poderes.data="";
  }



}


  

    socket.on('pregunta',(pregunta)=>{
      data.preguntas=pregunta;

      
      if(visibleJuego.value==false){
        visibleJuego.value=true;
        visibleSalas.value=false;

      }

    })

const visibleBoton=ref(false);
 
    function mostrarBoton(){
      visibleBoton.value=!visibleBoton.value;
    }


</script>

<template>
  <main >
    <div v-if="visibleSalas"  class="main-multijugador"> 
      <div class="body_multijugador">
      <SalasPrivadas :socket="socket" @boton="mostrarBoton" />
     
      <q-btn v-if="visibleBoton" color="orange" @click="empezar" size="25px" class="boton-volver" glossy label="Empezar"></q-btn>
     
      
       

    </div>

    <RouterLink to="/jugar">
          <q-btn color="red-12" @click="desconectar" size="25px" class="boton-volver" glossy label="Volver"></q-btn>
        </RouterLink>


    </div>

    <div v-if="visibleJuego" :class="{'temblor': temblor}">
      
      <div v-if="visibleTedio" class="tedioFuera">
      <div class="tedio">
        <img :src="`/src/assets/items/${medio.poder}.webp`" alt="">
      <div class="tedio_num">  {{ medio.username }}</div>
     <div  class="tedio_nom">  -{{ medio.num }}</div>
      
      </div>
    </div>
      <table class="ranking-table">
      
      <transition-group name="rank" tag="tbody">
        <tr :class="{'yoMismo': player.username === store.loginInfo.username}" v-for="(player, index) in posiciones.slice(0, 3)" :key="player.username">
          <td>{{ index+1 }}</td>
          <td><img class="foto_ranking" :src="`/public/avatar/boy${player.avatar}.png`" alt="" srcset=""></td>  
       
          <td>{{ player.puntacion }} </td>
        </tr>
      </transition-group>
    </table>
    

    <div class="poder">


      <div class="spin" v-if="visiblePoder">
        <img v-for="imagen in imagenes" :src="imagen" alt="">
        <img v-for="imagen in imagenes" :src="imagen" alt="">
      </div>
     
    <div  v-else>
        <img @click="usarpoder" class="static" :src="`/src/assets/items/${poderes.data.poder}.webp`" alt="">
    </div>
     
     
    </div>



      <Partida :data="data.preguntas" @siguiente="siguientePregunta"> </Partida>
      
    </div>
   
    <div v-if="visibleRanking" >
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
        <tr v-for="(player, index) in posiciones.slice(0, 3)" :key="player.username">
          <td>{{ index+1 }}</td>
          <td><img class="foto_ranking" :src="`/public/avatar/boy${player.avatar}.png`" alt="" srcset=""></td>  
          <td>{{ player.username }}</td>
          <td>{{ player.puntacion }} </td>
        </tr>
      </transition-group>
        </table>
    </div></div>
    </div>

    <div v-if="visibleFinal" >

      <div  >
        <div class="tiempo_raninkg" >{{ puntacionFinal.posicion }}</div>
        <div class="tiempo_raninkg">{{ puntacionFinal.puntuacion }}</div>
      </div>


    </div>

  </main>



</template>
 

<style scoped>
.poder{
  width: 120px;
  height: 120px;
  border: 1px solid white;
  position: absolute;
  right: 0;
  top:25%;
  overflow: hidden;
  
}
.bodyR{
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: top;
            min-height: 100vh;
            text-align: center;
            font-size: 30px;
}


.tiempo_raninkg{ 
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
        .rankingTotal_table{
          background-color: white;
        }
        .rankingTotal_th, .rankingTotal_td {
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

.spin{
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
    transform: translateY(-800px); /* Altura total de las imágenes visibles */
  }
}
 
.tedioFuera{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width:150px;
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
.tedio img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 70px;
 
}







.poder img{
  
  width: auto;
  height: 100px;
  
}

.static{
  position: absolute;
  top: 50%;            
  left: 50%;           
  transform: translate(-50%, -50%);
  

}
#main-multijugador{
  display: grid;
  grid-template-columns:1fr 1fr 1fr;
 
   
}
.body_multijugador{
  grid-column: 2;

}

.ranking-table {

border-collapse: collapse;
position: absolute;
font-size: 20px;
top:25%;
background-color: white;



}

.yoMismo{

  background-color: rgb(223, 223, 223);
}

.foto_ranking{
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