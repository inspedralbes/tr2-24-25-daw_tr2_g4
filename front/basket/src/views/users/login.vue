<script setup>

import { ref,watch } from 'vue';

   const password= ref('');
   const  isPwd= ref(true);
   const username= ref('') 

    
      
</script>

<template>
  <main>

    <q-input v-model="username" filled type="text" hint="Username" ></q-input>
    <br>
    <br>
   
    <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Contraseña">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          ></q-icon>
        </template>
      </q-input>
    <br>
     
     <br>
      
   
     <RouterLink to="/jugar"> <q-btn color="deep-orange" class="botones_login"   glossy label="Volver"></q-btn></RouterLink>
    <q-btn color="deep-orange" class="botones_login"   glossy label="Login"></q-btn>

   


  </main>

  
</template>


<style scoped>
.botones_login{
    margin-top: 40px;
 margin-right: 6px;
}
.input_login{
 
}

 
</style>
