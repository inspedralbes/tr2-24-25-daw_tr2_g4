<script setup>

import Partida from '@/components/Partida.vue';
import { reactive,ref} from 'vue';

  const data =reactive([{
    "id": 1,
    "operacion": "5 + 3",
    "respuesta_correcta": 8,
    "respuestaIncorrecta_1": 9,
    "respuestaIncorrecta_2": 7,
    "respuestaIncorrecta_3": 6,
    "modo": "arcade",
    "duracion": 20
  },
  {
    "id": 2,
    "operacion": "9 - 4",
    "respuesta_correcta": 5,
    "respuestaIncorrecta_1": 3,
    "respuestaIncorrecta_2": 6,
    "respuestaIncorrecta_3": 7,
    "modo": "historia",
    "duracion": 25
  },
  {
    "id": 3,
    "operacion": "6 * 2",
    "respuesta_correcta": 12,
    "respuestaIncorrecta_1": 10,
    "respuestaIncorrecta_2": 14,
    "respuestaIncorrecta_3": 8,
    "modo": "arcade",
    "duracion": 15
  }])

  const index= ref(0)

  function siguientePregunta(){
    if(index.value < data.length - 1)
      index.value++;
  }

</script>

<template>
  <main>
 



  <h1>Arcade</h1>


  <Partida :data="data[index]" @siguiente="siguientePregunta" />



  <RouterLink to="/jugar"> Volver</RouterLink>

 
  </main>
</template>
