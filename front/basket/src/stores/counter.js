import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  

  const loginInfo = reactive({
    loggedIn: false,
    username: '',
    avatar: '',
    nivel:'',
    token:''
  });


  const setLoginInfo = ({loggedIn,username, avatar,nivel,token  }) => {
    loginInfo.loggedIn = loggedIn;
    loginInfo.username = username;
    loginInfo.avatar = avatar;
    loginInfo.nivel= nivel;
    loginInfo.token = token;
  };

   

  


  const getLoginInfo = computed(() => loginInfo);






  return { 
    getLoginInfo, loginInfo,setLoginInfo


  }
})
