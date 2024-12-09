<script setup>

import { reactive, ref,watch } from 'vue';
import { register } from '@/comunication_manager';
import { useCounterStore } from '@/stores/counter';

   const password= ref('');
   const  isPwd= ref(true);
   const  email= ref('');
   const username= ref('') 
   const slide= ref(3);
   const params = reactive({ username: "", email: "", password: "", avatar:""}); 
   const alert= ref(false);
   const errors=reactive({errores:""})

  async function register_compo() {
     
    params.username=username.value;
    params.email=email.value;
    params.password=password.value;
    params.avatar=slide.value;
    
    const data= await register(params);
   
    
    console.log(data);
    
    if(data.errors==undefined){
      
        useCounterStore.setLoginInfo({
          username: data.user.username,
          avatar: data.user.avatar,
          nivel: data.user.nivel,

        })


    }else{


      errors.errores=data.errors;
      alert.value=true;
      
      
    }

    
    


   }
   


</script>

<template>
  <main>
    
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Error</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
        {{ errors.errores }}
         </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>





    <q-input v-model="username" filled type="text" hint="Username"></q-input>
    <br>
    <br>
    <q-input v-model="email" filled type="email" hint="Correo"></q-input>
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
      
     
     <center>
    < Selecciona tu avatar > 
      <q-carousel
      swipeable
      animated
     
      v-model="slide"
      style="width: 100px; height: 100px;border-radius: 50px; border: 1px solid black;" 
      ref="carousel"
      infinite
      
    >
      <q-carousel-slide :name="1" img-src="/public/avatar/boy1.png" />
      <q-carousel-slide :name="2" img-src="/public/avatar/boy2.png" />
      <q-carousel-slide :name="3" img-src="/public/avatar/boy3.png" />
      <q-carousel-slide :name="4" img-src="/public/avatar/boy4.png" />
      <q-carousel-slide :name="5" img-src="/public/avatar/boy5.png" />
      <q-carousel-slide :name="6" img-src="/public/avatar/boy6.png" />
      <q-carousel-slide :name="7" img-src="/public/avatar/boy7.png" />

      
     
    </q-carousel>
</center>

<RouterLink to="/jugar">  <q-btn color="deep-orange" class="botones_regis"   glossy label="Volver"></q-btn></RouterLink> 

<q-btn color="deep-orange" class="botones_regis" @click="register_compo" glossy label="Registrarse"></q-btn>

   


  </main>

  
</template>


<style scoped>
.botones_regis{
    margin-top: 40px;
 margin-right: 6px;
}


 
</style>
