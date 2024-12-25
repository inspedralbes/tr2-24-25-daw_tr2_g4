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

const poderes=reactive({
  caparazon_verde:-1,
  honguito:+1,
  banana:-1,
})



console.log("Token enviado al servidor:", token);
socketManager.RemSocket();

const socket = socketManager.getSocket(token);



let posiciones=ref("")
let data= reactive({preguntas:""});

function pami(){
  socket.emit('cambio_pregunta', store.loginInfo.username, store.SalaActual);

}


function patodos(){

  const SalaActuala = store.SalaActual;
  socket.emit('patodos',SalaActuala);
  
}

socket.on('tedio',(nombre)=>{
  alert("te dio"+nombre)
})

function siguientePregunta(info){
  socket.emit('cambio_pregunta', store.loginInfo.username, store.SalaActual,info.canasta);
}

function desconectar(){
  socketManager.RemSocket();
}

function poder(){
  socket.emit('poder',poderes.banana,store.SalaActual,store.loginInfo.username)

}

function empezar(){
      const SalaActual = store.SalaActual;
      socket.emit('empezar',SalaActual);
      console.log(SalaActual);

    }


    socket.on('adios',()=>{
      console.log("solo para ti")

    })

    socket.on('todos',()=>{
      console.log("hola a todos los de la misma sala")

    })

    socket.on('ranking',(rankings)=>{
      posiciones.value=[...rankings];
      


    })

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

    <div v-if="visibleJuego">

      <table class="ranking-table">
      
      <transition-group name="rank" tag="tbody">
        <tr :class="{'yoMismo': player.username === store.loginInfo.username}" v-for="(player, index) in posiciones.slice(0, 3)" :key="player.username">
          <td>{{ index+1 }}</td>
          <td><img class="foto_ranking" :src="`/public/avatar/boy${player.avatar}.png`" alt="" srcset=""></td>  
       
          <td>{{ player.puntacion }} </td>
        </tr>
      </transition-group>
    </table>
    <button @click="poder"> Banana</button>





      <Partida :data="data.preguntas" @siguiente="siguientePregunta"> </Partida>
      
    </div>
   
  </main>



</template>
 

<style scoped>
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