<script setup>
import { ref, watch,onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { onBeforeUnmount } from 'vue';

import socketManager from '@/socket';
import musica from '@/components/musica.vue';


onMounted(() => {

socketManager.RemSocket();
  const useApp = useCounterStore();
  
      if (useApp.ActivarMusica==false) {
        useApp.EncenderMusica();
        
      }
     
    });

  

const $q = useQuasar();
const router = useRouter();

const visibleLog = ref(false);
const useApp = useCounterStore();
const visibleOpciones = ref(true);
const mostrarDialogoArcade = ref(false);
const mostrarDialogoMultijugador = ref(false);

function ocultarTot() {
  visibleOpciones.value = false;
}

function verificarHistoria() {
  if (!useApp.loginInfo.loggedIn) {
    mostrarDialogoMultijugador.value = true;
  } else {
    router.push('/jugar/historia');
  }
}

function verificarMultijugador() {
  if (!useApp.loginInfo.loggedIn) {
    mostrarDialogoMultijugador.value = true;
  } else {
    router.push('/jugar/multijugador');
  }
}

function verificarArcade() {
  if (!useApp.loginInfo.loggedIn) {
    mostrarDialogoArcade.value = true;
  } else {
    router.push('/jugar/arcade');
  }
}

const route = useRoute();

async function salir() {
  $q.loading.show({
    spinner: QSpinnerFacebook,
    spinnerColor: 'white',
    spinnerSize: 140,
    backgroundColor: 'black',
    message: 'Cerrando sesión...',
    messageColor: 'white',
  });

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    useApp.setLoginInfo({
      loggedIn: false,
      username: '',
      email: '',
      avatar: '',
      nivel: '',
      token: '',
    });

    visibleLog.value = false;
  } finally {
    $q.loading.hide();
  }
}

watch(route, (newRoute) => {
  if (newRoute.path === '/jugar') {
    visibleOpciones.value = true;
    socketManager.RemSocket();
  }
});

if (useApp.loginInfo.loggedIn) {
  visibleLog.value = true;
} else {
  visibleLog.value = false;
}
</script>
<template>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

  <main id="main_menu">
    <div id="div_menu" v-if="visibleOpciones">
      <q-btn color="deep-orange" class="botones_menu" glossy label="Historia" @click="verificarHistoria"></q-btn>
      <br>
      <q-btn color="deep-orange" class="botones_menu" glossy label="Arcade" @click="verificarArcade"></q-btn>
      <br>
      <q-btn color="deep-orange" class="botones_menu" glossy label="Multijugador" @click="verificarMultijugador"></q-btn>
      <br>
      <RouterLink to="/" @click="ocultarTot">
        <q-btn color="deep-orange" class="botones_menu" glossy label="Volver"></q-btn>
      </RouterLink>
    </div>

    <div class="user_menu" v-if="visibleOpciones">
      <q-btn-dropdown class="glossy" color="deep-orange" icon="eva-person-add-outline" menu-anchor="top right"
        menu-self="bottom right" size="25px">
        <div class="div_user">
          <div>
            <div style="font-size: 40px; text-align: center">Cuenta</div>
          </div>

          <!-- Loggeado -->
          <div class="menu_avatar" v-if="visibleLog">
            <q-avatar size="90px">
              <img :src="`/avatar/boy${useApp.loginInfo.avatar}.png`" />
            </q-avatar>

            <div style="font-size: 30px">{{ useApp.loginInfo.username }}</div>

            <RouterLink to="/user/perfil">
              <q-btn class="botones_desple" color="black" label="Perfil" push size="30px" v-close-popup
                style="font-size: 16px;"></q-btn>
            </RouterLink>
            <br />
            <RouterLink to="/jugar">
              <q-btn class="botones_desple" color="red" label="Log out" push size="30px" v-close-popup
                @click="salir" style="font-size: 16px;"></q-btn>
            </RouterLink>
          </div>

          <!-- No Loggeado -->
          <div class="menu_avatar" v-else>
            <q-avatar size="90px">
              <img src="/avatar/boy1.png" />
            </q-avatar>

            <!-- Texto de "Invitado" con fuente más pequeña -->
            <div style="font-size: 20px">Invitado</div> <!-- Fuente más pequeña para "Invitado" -->

            <RouterLink to="/user/login">
              <q-btn class="botones_desple" color="black" label="Login" push size="30px" v-close-popup
                style="font-size: 16px;"></q-btn>
            </RouterLink>
            <br />
            <RouterLink to="/user/register">
              <q-btn class="botones_desple" color="grey" label="Registrarse" push size="30px" v-close-popup
                style="font-size: 16px;"></q-btn>
            </RouterLink>
          </div>
        </div>
      </q-btn-dropdown>
    </div>

    <q-dialog v-model="mostrarDialogoArcade" transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-card-section>
          <div class="text-h6">Aviso</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>Si no te registras no se guardará tu puntuación en el ranking global.</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup></q-btn>
          <q-btn flat label="Jugar de todos modos" color="primary" @click="() => { router.push('/jugar/arcade'); }"
            v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="mostrarDialogoMultijugador" transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-card-section>
          <div class="text-h6">Aviso</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>Registrate para jugar este modo.</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Volver al Menú" color="primary" @click="() => { router.push('/jugar'); }"
            v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </main>
</template>

<style scoped>
#main_menu {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100vh;
  font-family: 'Press Start 2P', cursive;
}

.menu_avatar {
  text-align: center;
}

.enlaces {
  text-decoration: none;
  color: inherit;
}

.div_user {
  height: 400px;
  width: 300px;
  font-family: 'Press Start 2P', cursive;
  padding-top: 50px;
}

#div_menu {
  text-align: center;
  grid-column: 2;
  grid-row: 2;
}

.botones_menu {
  margin: 10px;
  width: 350px;
  font-size: 26px;
  border: 1px solid black;
}

.botones_desple {
  margin-top: 10px;
  width: 250px;
  font-size: 5px;
}

.user_menu {
  height: 20%;
  margin-top: 80px; /* Aumenta el margen superior */
  grid-column: 2;
  grid-row: 3;
  align-self: center;
  justify-self: right;
}

</style>
