// store/counter.js
import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  
  // Estado reactivo para almacenar la información de login
  const loginInfo = reactive({
    loggedIn: false,
    username: '',
    email: '',
    avatar: '',
    nivel: '',
    token: localStorage.getItem('token') || '', // Obtén el token desde localStorage si existe
  });

  // Función para actualizar la información de login
  const setLoginInfo = ({ loggedIn, username, email, avatar, nivel, token }) => {
    loginInfo.loggedIn = loggedIn;
    loginInfo.username = username;
    loginInfo.avatar = avatar;
    loginInfo.nivel = nivel;
    loginInfo.email = email;
    loginInfo.token = token;

    // Guardar el token en localStorage para persistencia
    if (token) {
      localStorage.setItem('token', token); // Guardar el token en localStorage
    } else {
      localStorage.removeItem('token'); // Eliminar el token si se desloguea
    }
  };

  // Computed para obtener la información del login
  const getLoginInfo = computed(() => loginInfo);

  return { 
    getLoginInfo, 
    loginInfo, 
    setLoginInfo
  };
});
