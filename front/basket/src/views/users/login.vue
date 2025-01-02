<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/comunication_manager'
import { useCounterStore } from '@/stores/counter'
import { useQuasar, QSpinnerFacebook } from 'quasar'
import { onBeforeUnmount } from 'vue'

const $q = useQuasar() 
const router = useRouter()

const username = ref('')
const password = ref('')
const isPwd = ref(true)
const alert = ref(false)
const error = reactive({ errors: "" })
let timer

onBeforeUnmount(() => {
  if (timer !== void 0) {
    clearTimeout(timer)
    $q.loading.hide()
  }
})

async function aux_login() {
  const param = { username: username.value, password: password.value }

  $q.loading.show({
    spinner: QSpinnerFacebook, 
    spinnerColor: 'white',
    spinnerSize: 140,
    backgroundColor: 'black',
    message: 'Iniciando sesión...',
    messageColor: 'black',
  })
  try {
    const data = await login(param)

    $q.loading.hide()

    if (data.message == undefined) {
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

      router.push('/jugar')
    } else {
      error.errors = data.message
      alert.value = true
    }
  } catch (err) {
    $q.loading.hide()
    console.error("Error durante el login:", err)
  }
}
</script>

<template>
  <main class="q-pa-md">
    <!-- Diálogo de error -->
    <q-dialog v-model="alert" backdrop-filter="blur(4px)">
      <q-card>
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

    <!-- Campos de entrada -->
    <q-input
      v-model="username"
      class="q-mb-md"
      filled
      type="text"
      label="Username"
      :dense="true"
    />
    <q-input
      v-model="password"
      class="q-mb-md"
      filled
      :type="isPwd ? 'password' : 'text'"
      label="Contraseña"
      :dense="true"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        ></q-icon>
      </template>
    </q-input>

    <!-- Botones -->
    <div class="text-center q-mt-md">
      <q-btn color="deep-orange" @click="aux_login" glossy label="Login" class="q-mb-md" />
      <RouterLink to="/jugar">
        <q-btn color="red" glossy label="Volver" class="q-mb-md" />
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

.botones_login {
  margin-top: 40px;
  margin-right: 6px;
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
