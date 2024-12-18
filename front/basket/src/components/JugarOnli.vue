<script setup>
import socket from '@/socket';
import { reactive } from 'vue';
import Partida from './Partida.vue';

const data= reactive({});


socket.on('empezar_todos', (preguntas)=>{

 data=preguntas;

})


function siguientePregunta(info){


if(info.fallo){
    visibleJuego.value=false
}else{   
    
    index.value++;


}


}


</script>


<template>

<!--    
<Partida :data="data" @siguiente="siguientePregunta" ></Partida>
-->

{{ data }}

</template>


<style scoped>



</style>