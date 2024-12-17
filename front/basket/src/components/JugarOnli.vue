<script setup>
import socket from '@/socket';
import { reactive } from 'vue';
import Partida from './Partida.vue';

const data= reactive({});


socket.on("datos", (preguntas)=>{

 data=preguntas;

})


function siguiente(info){



}


</script>


<template>

    
<Partida :data="data" @siguiente="siguientePregunta" ></Partida>


</template>


<style scoped>



</style>