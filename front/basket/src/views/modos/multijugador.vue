<script setup>
import { ref } from 'vue';
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
function  hola(){

      socket.emit('tiro');

    }

</script>

<template>
  <main >
    <div v-if="visibleSalas"  class="main-multijugador"> 
      <div class="body_multijugador">
      <SalasPrivadas />
      <button @click="hola">empezar</button>
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