<script setup>
import { addFriend } from '@/comunication_manager';
import { useCounterStore } from '@/stores/counter';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'; 

const router = useRouter();

// Add friend states
const friendId = ref('');
const addFriendAlert = ref(false);
const addFriendMessage = reactive({ message: '' });

async function aux_addFriend() {
    if (!friendId.value) {
        addFriendMessage.message = 'Por favor, introduce un ID de amigo válido';
        addFriendAlert.value = true;
        return;
    }

    const data = await addFriend({ friendId: friendId.value });

    if (data.success) {
        addFriendMessage.message = 'Amigo añadido con éxito';
    } else {
        addFriendMessage.message = data.message || 'No se pudo añadir al amigo';
    }
    addFriendAlert.value = true;
}

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
      token: data.token
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
    <!-- Notification dialog for adding a friend -->
    <q-dialog v-model="addFriendAlert" backdrop-filter="blur(4px)">
      <q-card class="tarjeta_login">
        <q-card-section>
          <div class="text-h6">Información</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ addFriendMessage.message }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Volver Button -->
    <RouterLink to="/jugar"> <q-btn color="deep-orange" class="botones_login"   glossy label="Volver"></q-btn></RouterLink>

    
    <!-- Add Friend Form -->
    <q-input v-model="friendId" type="text" class="we" placeholder="ID del amigo"></q-input>
    <q-btn color="blue" class="botones_login" @click="aux_addFriend" glossy label="Añadir amigo"></q-btn>
  </main>
</template>

<style scoped>
.tarjeta_login {
  width: 400px;
  font-size: 25px;
}

.botones_login {
  margin-top: 40px;
  margin-right: 6px;
}

.we {
  width: 400px;
  height: 100px;
  font-size: 45px;
}
</style>
