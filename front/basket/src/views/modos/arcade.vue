<script setup>
import { ref, reactive, onMounted } from 'vue';
import Ranking from '../../components/ranking.vue';
import Partida from '../../components/Partida.vue';
import Temporizador from '../../components/temporizador.vue';
import { getPreguntas } from '@/comunication_manager';

const data = reactive({ pregunta: "" });
const visibleJuego = ref(false);
const index = ref(0);
const puntuacion = ref(0);
const cargando = ref(true);
const mostrarTempo = ref(true);

async function rellenarPreguntas() {
  cargando.value = true;
  data.pregunta = await getPreguntas(0);
  visibleJuego.value = true;
  cargando.value = false;
}

function siguientePregunta(info) {
  if (info.fallo) {
    visibleJuego.value = false;
  } else {
    index.value++;
    if (index.value > 19) {
      rellenarPreguntas();
      index.value = 0;
    }
    puntuacion.value += info.canasta;
  }
}

function ocultarTemporizador() {
  mostrarTempo.value = false;
  rellenarPreguntas();  
}
</script>

<template>
        
  <main class="main">
    <Temporizador v-if="mostrarTempo" @complete="ocultarTemporizador" />

    <Partida v-if="!cargando && visibleJuego && !mostrarTempo" :data="data.pregunta[index]" @siguiente="siguientePregunta" />
    <Ranking v-if="!cargando && !visibleJuego" :puntuacion="puntuacion" />
  </main>
</template>

<style scoped> 

.main {
  background-image: url("@/assets/bioma/parque.jpg");
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  position: relative;
  

}
</style>
