import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  

  const loginInfo = reactive({
    loggedIn: false,
    username: '',
    avatar: '',
    nivel:''
  });


  const setLoginInfo = ({username, avatar,nivel }) => {
    loginInfo.loggedIn = true;
    loginInfo.username = username;
    loginInfo.avatar = avatar;
    loginInfo.nivel= nivel
  };


  const getLoginInfo = computed(() => loginInfo);






  return { 
    getLoginInfo, loginInfo,setLoginInfo


  }
})
