import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/es'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import router from './router'
import App from './App.vue'
import '@quasar/extras/eva-icons/eva-icons.css'
import { Loading } from 'quasar'
import piniaPersistedState from 'pinia-plugin-persistedstate'
import { Notify } from 'quasar';
const pinia = createPinia()
pinia.use(piniaPersistedState) 

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Loading, // Aquí añades el plugin Loading
  },
  lang: quasarLang,
})

app.use(pinia)
app.use(router)

app.mount('#app')
