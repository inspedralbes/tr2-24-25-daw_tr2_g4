import './assets/main.css'
// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import quasarLang from 'quasar/lang/es';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';
import router from './router';
import App from './App.vue';
import '@quasar/extras/eva-icons/eva-icons.css';
import { Loading } from 'quasar';
import { Notify } from 'quasar';

// Importar el store de Pinia
import { useCounterStore } from './stores/counter';

const app = createApp(App);

app.use(Quasar, {
  plugins: {
    Loading,
    Notify,
  },
  lang: quasarLang,
});

app.use(createPinia());
app.use(router);

// Recuperamos el store de usuario
const userStore = useCounterStore();

// Si existe un token en localStorage, lo usamos para actualizar el estado de login
if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token');
  
  // Aquí puedes agregar más lógica si deseas obtener más detalles del usuario (como su nombre, avatar, etc.)
  userStore.setLoginInfo({
    loggedIn: true,
    username: '', // Aquí puedes llenar estos valores si tienes esos datos disponibles
    email: '', 
    avatar: '', 
    nivel: '', 
    token
  });
}

app.mount('#app');
