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
 

<div>

    {{ props.data.operacion }}

    <div class="respuestas">
    <div v-for="(respuesta, index) in respuestasMezcladas" :key="index">
      <button @click="responder(respuesta)"> {{ respuesta }} </button>
     </div>
    </div>
  
</div>




</template>

<style scoped>

.respuestas{
    display: grid;
    grid-template-columns: 1fr 1fr;
}


</style>
