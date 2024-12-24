<script setup>
import { ref,reactive,onBeforeUnmount,onMounted } from 'vue';
import SalasPrivadas from '@/components/SalasPrivadas.vue';
import JugarOnli from '@/components/JugarOnli.vue';
import { useCounterStore } from '@/stores/counter'; 
import socketManager from '@/socket'; 
import Partida from '@/components/Partida.vue';
import Ranking from '@/components/Ranking.vue';


const visibleSalas=ref(true);
const visibleJuego=ref(false);
const store = useCounterStore();
const token = store.getLoginInfo.token; 
console.log("Token enviado al servidor:", token);



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



function siguientePregunta(info){
  socket.emit('cambio_pregunta', store.loginInfo.username, store.SalaActual,info.canasta);
}

function desconectar(){
  socketManager.RemSocket();
}


function holas(){
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


 
</script>

<template>
  <main >
    <div v-if="visibleSalas"  class="main-multijugador"> 
      <div class="body_multijugador">
      <SalasPrivadas :socket="socket" />
      <button @click="holas">empezar</button>
      <button @click="pami">cambio</button>
      <button @click="patodos">todos de sala</button>
      
       

    </div>

    <RouterLink to="/jugar">
          <q-btn color="red-12" @click="desconectar" size="25px" class="boton-volver" glossy label="Volver"></q-btn>
        </RouterLink>


    </div>

    <div v-if="visibleJuego">

      <table class="ranking-table">
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Username</th>
          <th>Puntación</th>
        </tr>
      </thead>
      <transition-group name="rank" tag="tbody">
        <tr v-for="(player, index) in posiciones" :key="player.username">
          <td>hola</td>  
          <td>{{ player.username }}</td>
          <td>{{ player.puntacion }}</td>
        </tr>
      </transition-group>
    </table>






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