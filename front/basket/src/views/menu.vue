<script setup>

import { ref,watch } from 'vue';
import { useRoute } from 'vue-router';

    const visibleOpciones=ref(true);




    function ocultarTot(){
        visibleOpciones.value=false;

    }

 
const route = useRoute();
   
watch(route, (newRoute, oldRoute) => {
  // Verificamos si estamos en la misma ruta y queremos mostrar los botones
  if (newRoute.path === '/jugar') {
    visibleOpciones.value = true;
  }
});
 
    
</script>

<template>
  <main>
    
 <div v-if="visibleOpciones">
   <RouterLink to="/jugar/historia" @click="ocultarTot">Historia</RouterLink>
   <br>
   <RouterLink to="/jugar/arcade" @click="ocultarTot">Arcade</RouterLink>
   <br>
   <RouterLink to="/jugar/multijugador" @click="ocultarTot">2 Jugadores</RouterLink>
   <br>
   <RouterLink to="/" @click="ocultarTot">Volver</RouterLink>
</div>


   <RouterView />


  </main>
</template>
