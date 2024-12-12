<script setup>

import { reactive,ref,computed, watch } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },




},)

const progress = ref(0.0); 
const color = ref(''); 
const aux = ref(0);
let idTemporizador = null;  
reiniciarTemporizador(); 
watch(() => props.data, () => { 
  reiniciarTemporizador();
});

function reiniciarTemporizador() { 
  
  if (idTemporizador) {
    clearInterval(idTemporizador);
  }
 
  progress.value = 0.0;
  color.value = '';
  
  aux.value = 1 / props.data.duracion;  
  iniciarTemporizador();
}

function iniciarTemporizador() { 
  idTemporizador = setInterval(() => {
    
    progress.value = progress.value + aux.value;
    props.data.duracion--;
    
    if (progress.value > 0 && progress.value < 0.2) {
      color.value = 'blue';
    } else if (progress.value > 0.3 && progress.value < 0.6) {
      color.value = 'green';
    } else if (progress.value > 0.7 && progress.value < 0.9) {
      color.value = 'red';
    } else if (progress.value >1) {
      
      clearInterval(idTemporizador);
      responder(-1);  
      
    }
 
    
  }, 1000);
}

  


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
    reiniciarTemporizador();
    
    
}
</script>



<template>
 
  
<div class="problema">
  <div class="tiempo_fuera">
    <div class="tiempo" >{{ props.data.duracion }} </div>
   </div>
    

 <span class="titul"> {{ props.data.operacion }} </span>
   
    <div class="respuestas">
      <q-linear-progress instant-feedback  :value="progress" :color="color" class=" barra"> </q-linear-progress>
     
      <div v-for="(respuesta, index) in respuestasMezcladas" :key="index">

      <q-btn  color="deep-orange" class="botones_partida" glossy label=""@click="responder(respuesta)"> {{ respuesta }}</q-btn>
    
     
     </div>
    </div>
  
</div>




</template>

<style scoped>


@font-face {
  font-family: 'DS-Digital';
  src: url('../assets/fuente/DS-DIGI.TTF') format('truetype');
}
 

.titul{

  grid-column: span 3;
  font-size: 70px;
  border: 1px solid black;
  
}

.tiempo_fuera{
  
  grid-column: 2; 
  place-items: center;
 


}
.tiempo{ 
  border: 1px solid black;
  font-size: 30px;
  font-family: 'DS-Digital';
  text-shadow: 0 0 5px #f00, 0 0 10px #f00, 0 0 20px #f00, 0 0 30px #f00, 0 0 40px #f00, 0 0 50px #f00;
  color: rgb(255, 112, 112);
  background-color: black;
  grid-column: 2;
  place-items: center;
  border: 5px solid rgb(70, 70, 70);
  width: 70px;
  margin: 0 auto;
  
  
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
