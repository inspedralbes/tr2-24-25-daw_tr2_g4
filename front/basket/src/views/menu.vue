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
  <RouterLink to="/jugar/historia" @click="ocultarTot"> <q-btn color="deep-orange" class="botones_menu" disable  glossy label="Historia"></q-btn></RouterLink>
  
   <br>
   <RouterLink to="/jugar/arcade" @click="ocultarTot"> <q-btn color="deep-orange" class="botones_menu"  glossy label="Arcade"></q-btn></RouterLink>
   <br>
   <RouterLink to="/jugar/multijugador" @click="ocultarTot"><q-btn color="deep-orange" class="botones_menu" disable glossy label="Multijugador"></q-btn></RouterLink>
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
     size="25px"
    >
      <div class="div_user">
        <div>
          <div style="font-size: 50px; text-align: center">Cuenta</div>
         
        </div>

         

        <div class="menu_avatar" >
          <q-avatar size="90px">
            <img src="/public/avatar/boy1.png">
          </q-avatar>

          <div style="font-size: 30px">Invitado</div>

          <RouterLink to="/user/login">
          <q-btn
          class="botones_desple"
            color="primary"
            label="Login"
            push
            size="30px"
            v-close-popup
          ></q-btn>
        </RouterLink>
        <br>
        <RouterLink to="/user/register">
        <q-btn
            class="botones_desple"
            color="primary"
            label="Registrarse"
            push
            size="30px"
            v-close-popup
          ></q-btn>
          </RouterLink>  
        </div>
      </div>
    </q-btn-dropdown>
  </div>

 


   


  </main>

  
</template>
<style scoped>

#main_menu{
  display: grid;
  grid-template-rows: 1fr 1fr 1fr ; 
  grid-template-columns: 1fr 1fr 1fr;
  height: 100vh; 


}
.menu_avatar{

 text-align: center;

}
.enlaces{
  text-decoration: none;
  color: inherit; 
  
}
.div_user{
  height: 400px;
  width: 300px;
}

#div_menu{
   
  text-align: center;
  grid-column: 2;
  grid-row: 2;
}

.botones_menu{
  margin: 10px;
  width: 350px;
  font-size: 30px;
  border: 1px solid black; 
}

 

.botones_desple{
  margin-top: 10px;
  width: 250px;
  font-size: 100px;
  
}
.user_menu{
   
  height: 20%;
  margin-top: 40px;
  grid-column: 2;
  grid-row: 3;
  align-self: center; /* Centrado vertical dentro de su celda */
  justify-self: right;
 
}
</style>