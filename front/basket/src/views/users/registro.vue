<script setup>
import { reactive, ref } from 'vue';
import { register } from '@/comunication_manager';
import { useCounterStore } from '@/stores/counter';
import { useRouter } from 'vue-router';
import { useQuasar, QSpinnerFacebook } from 'quasar'
import { onBeforeUnmount } from 'vue'

const router = useRouter();
const password = ref('');
const isPwd = ref(true);
const email = ref('');
const username = ref('');
const slide = ref(3);
const params = reactive({ username: "", email: "", password: "", avatar: "" });
const alert = ref(false);
const errors = reactive({ errores: "" });

const $q = useQuasar() 
let timer

onBeforeUnmount(() => {
  if (timer !== void 0) {
    clearTimeout(timer)
    $q.loading.hide()
  }
})

async function register_compo() {
  params.username = username.value;
  params.email = email.value;
  params.password = password.value;
  params.avatar = slide.value;

  $q.loading.show({
    spinner: QSpinnerFacebook,
    spinnerColor: 'white',
    spinnerSize: 140,
    backgroundColor: 'black',
    message: 'Registrando Usuario...',
    messageColor: 'black',
  })
  try {
    const data = await register(params);
    $q.loading.hide()
    console.log(data);

  if (data.errors == undefined) {
    const appStore = useCounterStore()
      appStore.setLoginInfo({
        loggedIn: true,
        username: data.user.username,
        email:data.user.email,
        avatar: data.user.avatar,
        nivel: data.user.nivel,
        token: data.token,
        id_user: data.user.id_user || data.user.id,
      })
    router.push('/jugar');
  } else {
    errors.errores = data.errors;
    alert.value = true;
  }
  } catch (err) {
    $q.loading.hide()
    console.error("Error durante el register:", err)
  }

  
}
</script>

<template>
  <main class="q-pa-md">

    <!-- Dialogo de error -->
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

    <!-- Campos de entrada -->
    <q-input class="q-mb-md" v-model="username" filled type="text" label="Username" />
    <q-input class="q-mb-md" v-model="email" filled type="email" label="Correo electrónico" />
    <q-input class="q-mb-md" v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Contraseña">
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        ></q-icon>
      </template>
    </q-input>

    <!-- Selección de avatar -->
    <div class="q-mb-md text-center">
      <span>Desliza para seleccionar tu avatar</span>
      <q-carousel
        swipeable
        animated
        infinite
        v-model="slide"
        class="q-mt-md"
        style="width: 100px; height: 100px; border-radius: 50%; border: 1px solid #ccc;">
        <q-carousel-slide :name="1" img-src="/public/avatar/foto1.png" />
        <q-carousel-slide :name="2" img-src="/public/avatar/foto2.png" />
        <q-carousel-slide :name="3" img-src="/public/avatar/foto3.png" />
        <q-carousel-slide :name="4" img-src="/public/avatar/foto4.png" />
      </q-carousel>
    </div>

    <!-- Botones -->
    <div class="q-mt-md text-center">
      <q-btn color="deep-orange" @click="register_compo" class="q-mb-md" glossy label="Registrarse" />
      <RouterLink to="/jugar">
        <q-btn color="red" class="q-mb-md" glossy label="Volver" />
      </RouterLink>
    </div>

  </main>
</template>

<style scoped>
.q-card {
  width: 400px;
}

.q-input {
  width: 100%;
}

.q-carousel {
  max-width: 300px;
  margin: 0 auto;
}

.q-btn {
  width: 200px;
}

.q-mb-md {
  margin-bottom: 16px;
}

.q-mt-md {
  margin-top: 16px;
}

</style>
