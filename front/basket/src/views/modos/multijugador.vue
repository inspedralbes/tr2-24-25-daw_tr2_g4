<script setup>
import { ref } from 'vue';
import SalasPrivadas from '@/components/SalasPrivadas.vue';
import JugarOnli from '@/components/JugarOnli.vue';
import socket from '@/socket';


const visibleSalas=ref(true);
const visibleJuego=ref(false);
 

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