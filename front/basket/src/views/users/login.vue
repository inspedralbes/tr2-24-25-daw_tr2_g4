<script setup>
import { login } from '@/comunication_manager';
import { useCounterStore } from '@/stores/counter';
import { reactive, ref,watch } from 'vue';
import { useRouter } from 'vue-router'; 
   const router = useRouter(); 
   const password= ref('');
   const  isPwd= ref(true);
   const username= ref('') 
   const alert= ref(false);
   const error=reactive({errors:""})
   
  
   
   async function aux_login(){

    const param= reactive({password: '', username: '' })
    param.password= password;
    param.username=username;
    const data = await login(param);
   
    

    if(data.message==undefined){
      const appStore = useCounterStore();
        appStore.setLoginInfo({
          loggedIn: true,
          username: data.user.username,
          avatar: data.user.avatar,
          nivel: data.user.nivel,

        })
        router.push('/jugar'); 



    }else{
     
      error.errors= data.message;
      console.log("error.errors")
      alert.value=true;
      
      
    }
    
   }
    
      
</script>

<template>
  <main>

 


    <q-dialog v-model="alert" backdrop-filter='blur(4px)'>
      <q-card class="tarjeta_login">
        <q-card-section>
          <div class="text-h6">Error</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
        {{ error.errors }}
         </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>


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
    <q-btn color="deep-orange" class="botones_login" @click="aux_login"  glossy label="Login"></q-btn>

   


  </main>

  
</template>


<style scoped>

.tarjeta_login{

  width: 400px;

  font-size: 25px;
}


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
