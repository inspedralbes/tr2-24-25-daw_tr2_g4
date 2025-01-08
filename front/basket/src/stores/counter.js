// store/counter.js
import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  

    const ActivarMusica=ref(true);

  const ApagarMusica = () => {
      ActivarMusica.value=false;
  }
  const EncenderMusica = () => {
      ActivarMusica.value=true;
  }

  const loginInfo = reactive({
    loggedIn: false,
    username: '',
    email: '',
    avatar: '',
    nivel:'',
    token:'',
    id_user: null,
  });


  const setLoginInfo = ({loggedIn,username,email,avatar,nivel,token,id_user }) => {
    loginInfo.loggedIn = loggedIn;
    loginInfo.username = username;
    loginInfo.avatar = avatar;
    loginInfo.nivel = nivel;
    loginInfo.email = email;
    loginInfo.token = token;
    loginInfo.email = email;
    loginInfo.id_user = id_user;
  };

   

  const SalaActual= ref("");
  




  const getLoginInfo = computed(() => loginInfo);



  return { 
    getLoginInfo, loginInfo,setLoginInfo,ActivarMusica,SalaActual, ApagarMusica, EncenderMusica


  }
})
