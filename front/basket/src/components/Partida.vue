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

   <h4>{{ props.data.operacion }} </h4> 

    <div class="respuestas">
    <div v-for="(respuesta, index) in respuestasMezcladas" :key="index">

      <q-btn color="deep-orange" class="botones_partida" glossy label=""@click="responder(respuesta)"> {{ respuesta }}</q-btn>
    
     
     </div>
    
    </div>
  
</div>




</template>

<style scoped>

.respuestas{
    display: grid;
    grid-template-columns: 1fr 1fr;
}
div{

  text-align: center;
}
.botones_partida{

  width: 50%;
  margin: 5px;

}

</style>
