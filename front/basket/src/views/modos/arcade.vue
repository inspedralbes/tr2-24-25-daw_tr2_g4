<script setup>
import { reactive, ref,onMounted } from 'vue';
import Ranking from '../../components/ranking.vue';
import { getPreguntas } from '@/comunication_manager'
import Partida from '../../components/Partida.vue';




const data = reactive({pregunta:""})
const visibleJuego= ref(false)
const index=ref(0);
const puntuacion = ref(0);

onMounted(() => {
  rellenarPreguntas();
  
    });



async function rellenarPreguntas(){

  data.pregunta=await getPreguntas(0)
  console.log(data.pregunta[index.value])
 
    visibleJuego.value=true;
 
}

function siguientePregunta(info){

  
    if(info.fallo){
      visibleJuego.value=false;
       
    }else{   
       index.value++;
      
      if(index.value>19){
        rellenarPreguntas();
        index.value=0;
        

      }

      puntuacion.value+=info.canasta;
    }


}


</script>

<template>
 
    <Partida v-if="visibleJuego" :data="data.pregunta[index]" @siguiente="siguientePregunta"> </Partida>
    <Ranking v-if="!visibleJuego" :puntuacion="puntuacion"/>

</template>

<style scoped>

</style>
