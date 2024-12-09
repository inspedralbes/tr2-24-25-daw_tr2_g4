<script setup>

import { ref,watch } from 'vue';

   const password= ref('');
   const  isPwd= ref(true);
   const username= ref('') 

    
      
</script>

<template>
  <main>
    <br>  <br>
    <q-input v-model="username"  type="text" class="we" ></q-input>
    Username
    <br>
    <br>
   
    <q-input v-model="password"  :type="isPwd ? 'password' : 'text'" class="we">
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

.we{

  width: 400px;
  height: 100px;
  font-size: 45px;
  
}

 
</style>
