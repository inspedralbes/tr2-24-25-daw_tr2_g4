<script setup>

import { ref,watch } from 'vue';
import { useRoute } from 'vue-router';

    const visibleOpciones=ref(true);




    function ocultarTot(){
        visibleOpciones.value=false;

    }

 
const route = useRoute();
   
watch(route, (newRoute, oldRoute) => {
  
  if (newRoute.path === '/jugar') {
    visibleOpciones.value = true;
  }
});
 
    
</script>

<template>
  <main id="main_menu">
    
 <div id="div_menu" v-if="visibleOpciones">
  <RouterLink to="/jugar/historia" @click="ocultarTot"> <q-btn color="deep-orange" class="botones_menu"   glossy label="Historia"></q-btn></RouterLink>
  
   <br>
   <RouterLink to="/jugar/arcade" @click="ocultarTot"> <q-btn color="deep-orange" class="botones_menu"  glossy label="Arcade"></q-btn></RouterLink>
   <br>
   <RouterLink to="/jugar/multijugador" @click="ocultarTot"><q-btn color="deep-orange" class="botones_menu"  glossy label="Multijugador"></q-btn></RouterLink>
   <br>
  <RouterLink to="/" @click="ocultarTot"> <q-btn color="deep-orange" class="botones_menu"  glossy label="Volver"></q-btn> </RouterLink>
 
</div>


   <RouterView />


  </main>
</template>
<style scoped>

#main_menu{
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100vh; 


}
#div_menu{

  text-align: center;
  grid-column: 2;
  grid-row: 3;
}

.botones_menu{
  margin: 10px;
  width: 200px; 
}
</style>