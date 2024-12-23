<script setup>
import { reactive, ref,onMounted } from 'vue';
import Arcade2 from '../../components/Partida.vue';
import { getPreguntas } from '@/comunication_manager'




const data = reactive({pregunta:""})
const visibleJuego= ref(false)
const index=ref(0);

onMounted(() => {
  rellenarPreguntas();
  
    });



async function rellenarPreguntas(){

  data.pregunta=await getPreguntas(0)
  console.log(data.pregunta[index.value])
 
    visibleJuego.value=true;
 
}

function siguientePregunta(info){

  console.log("hola");
  

    if(info.fallo){
      
       
    }else{   
       index.value++;
       console.log(data.pregunta(index))
      if(index.value>19){
        rellenarPreguntas();
        index.value=0;
      }
    }


}


</script>

<template>
 
    <Arcade2 v-if="visibleJuego" :data="data.pregunta[index]" @siguiente="siguientePregunta"> </Arcade2>


</template>

<style scoped>

</style>
