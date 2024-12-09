<script setup>

import { reactive,ref,computed } from 'vue';
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },




},)

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
  
 <p class="titul"> {{ props.data.operacion }} </p>
   

    <div class="respuestas">
     <div v-for="(respuesta, index) in respuestasMezcladas" :key="index">

      <q-btn  color="deep-orange" class="botones_partida" glossy label=""@click="responder(respuesta)"> {{ respuesta }}</q-btn>
    
     
     </div>
    </div>
  
</div>




</template>

<style scoped>

.titul{

  grid-column: 2;
  font-size: 70px;
  display: inline;
  
}

.problema{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center

}
.respuestas{
    display: grid;
    grid-column: 2;
    grid-template-columns: 1fr 1fr;
    
}
 
.botones_partida{

  width: 170px; 
  margin: 20px;
  font-size: 50px;
  
}

</style>
