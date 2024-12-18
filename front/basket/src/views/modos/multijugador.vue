<script setup>
import { ref,reactive } from 'vue';
import SalasPrivadas from '@/components/SalasPrivadas.vue';
import JugarOnli from '@/components/JugarOnli.vue';
import { useCounterStore } from '@/stores/counter'; 
import getSocket from '@/socket';


const visibleSalas=ref(true);
const visibleJuego=ref(false);
const store = useCounterStore();
const token = store.getLoginInfo.token; 
console.log("Token enviado al servidor:", token);

const socket = getSocket(token);

let data= reactive({hola:""});



function pami(){
  socket.emit('cambio_pregunta', store.loginInfo.username, store.SalaActual);

}


function patodos(){

  const SalaActuala = store.SalaActual;
  socket.emit('patodos',SalaActuala);
  
}

function hola(dato){

  socket.emit('cambio_pregunta', store.loginInfo.username, store.SalaActual,dato);

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
      console.log(data)

    })

</script>

<template>
  <main >
    <div v-if="visibleSalas"  class="main-multijugador"> 
      <div class="body_multijugador">
      <SalasPrivadas />
      <button @click="holas">empezar</button>
      <button @click="pami">cambio</button>
      <button @click="patodos">todos de sala</button>
      
      
      {{ data.hola.operacion }}
      <button @click="hola(data.hola.respuestaIncorrecta_2)" > {{ data.hola.respuestaIncorrecta_2 }}</button>
      <button @click="hola(data.hola.respuestaIncorrecta_3)" > {{ data.hola.respuestaIncorrecta_3 }}</button>
      <button @click="hola(data.hola.respuestaIncorrecta_1)" > {{ data.hola.respuestaIncorrecta_1 }}</button>
      <button @click="hola(data.hola.respuesta_correcta)" > {{ data.hola.respuesta_correcta }}</button>

    </div>

    </div>

    <div v-if="visibleJuego">
      <JugarOnli></JugarOnli>

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