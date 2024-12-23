<script setup>
import { ref,reactive,onBeforeUnmount,onMounted } from 'vue';
import SalasPrivadas from '@/components/SalasPrivadas.vue';
import JugarOnli from '@/components/JugarOnli.vue';
import { useCounterStore } from '@/stores/counter'; 
import socketManager from '@/socket'; 
import Partida from '@/components/Partida.vue';



const visibleSalas=ref(true);
const visibleJuego=ref(false);
const store = useCounterStore();
const token = store.getLoginInfo.token; 
console.log("Token enviado al servidor:", token);



const socket = socketManager.getSocket(token);


let data= reactive({hola:""});

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


    socket.on('pregunta',(pregunta)=>{
      data.hola=pregunta;
      console.log(data.hola)
      
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
      
      
      {{ data.hola.operacion }}
      <button @click="hola(data.hola.respuestaIncorrecta_2)" > {{ data.hola.respuestaIncorrecta_2 }}</button>
      <button @click="hola(data.hola.respuestaIncorrecta_3)" > {{ data.hola.respuestaIncorrecta_3 }}</button>
      <button @click="hola(data.hola.respuestaIncorrecta_1)" > {{ data.hola.respuestaIncorrecta_1 }}</button>
      <button @click="hola(data.hola.respuesta_correcta)" > {{ data.hola.respuesta_correcta }}</button>

    </div>

    <RouterLink to="/jugar">
          <q-btn color="red-12" @click="desconectar" size="25px" class="boton-volver" glossy label="Volver"></q-btn>
        </RouterLink>


    </div>

    <div v-if="visibleJuego">
      <Partida :data="data.hola" @siguiente="siguientePregunta"> </Partida>

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


</style>