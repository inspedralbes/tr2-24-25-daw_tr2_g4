import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  

  const loginInfo = reactive({
    loggedIn: false,
    username: '',
    email:'',
    avatar: '',
    nivel:'',
    token:''
  });


  const setLoginInfo = ({loggedIn,username,email,avatar,nivel,token }) => {
    loginInfo.loggedIn = loggedIn;
    loginInfo.username = username;
    loginInfo.avatar = avatar;
    loginInfo.nivel= nivel;
    loginInfo.token = token;
    loginInfo.email = email;
  };


  const getLoginInfo = computed(() => loginInfo);



  return { 
    getLoginInfo, loginInfo,setLoginInfo

  }
})
