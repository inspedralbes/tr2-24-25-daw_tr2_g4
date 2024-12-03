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


const app = createApp(App)

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
})



app.use(createPinia())
app.use(router)

app.mount('#app')
