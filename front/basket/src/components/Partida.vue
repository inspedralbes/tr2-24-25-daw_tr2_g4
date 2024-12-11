<script setup>

import { reactive,ref,computed } from 'vue';
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },




},)

const progress = ref(0.0); 
const color=ref("red");

  
 
const intervalId = setInterval(() => {
  progress.value=progress.value+0.1;
 
  if(progress.value==0.4){
   
  }
  if(progress.value==0.7){
    clearInterval(intervalId);
  } 

}, 1000);
 

  


const emit = defineEmits();



function mezclarRespuestas() {
  const respuestas = [
  props.data.respuesta_correcta,
  props.data.respuestaIncorrecta_1,
  props.data.respuestaIncorrecta_2,
  props.data.respuestaIncorrecta_3
  ]; 
  return respuestas.sort(() => Math.random() - 0.5);


}

const respuestasMezcladas = computed(() => mezclarRespuestas());

function responder(data){

    emit('siguiente', data);
    
}
</script>



<template>
 
  
<div class="problema">
  
 <span class="titul"> {{ props.data.operacion }} </span>
   
    <div class="respuestas">
      <q-linear-progress  :value="progress" :color="color" class=" barra"> </q-linear-progress>
     
      <div v-for="(respuesta, index) in respuestasMezcladas" :key="index">

      <q-btn  color="deep-orange" class="botones_partida" glossy label=""@click="responder(respuesta)"> {{ respuesta }}</q-btn>
    
     
     </div>
    </div>
  
</div>




</template>

<style scoped>

.titul{

  grid-column: span 3;
  font-size: 70px;
  border: 1px solid black;
  
}

.problema{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center

}
.respuestas{
    display: grid;
    grid-column: span 3;
    grid-template-columns: 1fr 1fr;
    
}
 
.botones_partida{

  width: 100%; 
  font-size: 50px;  
}

.barra{
  height: 20px;
  grid-column: span 2;
   
}

</style>
