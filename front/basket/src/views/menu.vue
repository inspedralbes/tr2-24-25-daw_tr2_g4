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
  

<div class="user_menu" v-if="visibleOpciones">
    <q-btn-dropdown
      class="glossy"
      color="deep-orange"
     icon="eva-person-add-outline"
     menu-anchor="top right"  
     menu-self="bottom right"  
    >
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Cuenta</div>
          <RouterLink to="/user/login">
          <q-btn
          class="botones_desple"
            color="primary"
            label="Login"
            push
            size="sm"
            v-close-popup
          ></q-btn>
        </RouterLink>
        <RouterLink to="/user/register">
        <q-btn
            class="botones_desple"
            color="primary"
            label="Registrarse"
            push
            size="sm"
            v-close-popup
          ></q-btn>
          </RouterLink>
        </div>

        <q-separator vertical inset class="q-mx-lg"></q-separator>

        <div class="column items-center">
          <q-avatar size="72px">
            <img src="/public/avatar/boy1.png">
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">Invitado</div>

          <q-btn
            color="primary"
            label="Logout"
            push
            size="sm"
            v-close-popup
          ></q-btn>
        </div>
      </div>
    </q-btn-dropdown>
  </div>

 


   <RouterView/>


  </main>

  
</template>
<style scoped>

#main_menu{
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr; 
  grid-template-columns: 1fr 1fr 1fr;
  height: 100vh; 


}
.enlaces{
  text-decoration: none;
  color: inherit; 
  
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

 

.botones_desple{
  margin-top: 10px;
  width: 100px;
}
.user_menu{
   
  height: 20%;
  margin-top: 40px;
  grid-column: 3;
  grid-row: 4;
}
</style>