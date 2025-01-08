<script setup>
import { reactive, ref, onMounted } from 'vue';
import Ranking from '../../components/ranking.vue';
import { getPreguntas } from '@/comunication_manager';
import Partida from '../../components/Partida.vue';

import imagen3 from '@/assets/images/3.png';
import imagen2 from '@/assets/images/2.png';
import imagen1 from '@/assets/images/1.png';
import imagenGo from '@/assets/images/go.png';
import marioAudio from '@/assets/audio/mario-kart-8-countdown.mp3';

const data = reactive({ pregunta: "" });
const visibleJuego = ref(false);
const index = ref(0);
const puntuacion = ref(0);

const temporizador = ref(null);
const mostrarTempo = ref(true);
const cargando = ref(true);

const imagenActual = ref(imagen3); 

onMounted(() => {
  iniciarTemporizador();
});

async function iniciarTemporizador() {
  const imagenes = [imagen3, imagen2, imagen1, imagenGo];

  const audio = new Audio(marioAudio);
  audio.play();

  let i = 0;

  const intervalo = setInterval(() => {
    imagenActual.value = imagenes[i]; 
    i++;

    if (i >= imagenes.length) {
      clearInterval(intervalo);

      setTimeout(() => {
        mostrarTempo.value = false;
        rellenarPreguntas();
      }, 1000);
    }
  }, 1000); 
}

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
</script>

<template>
  <main class="main">
    <div v-if="mostrarTempo" class="temporizador">
      <img :src="imagenActual" alt="Temporizador" class="imagen-temporizador" />
    </div>

    <Partida v-if="!cargando && visibleJuego && !mostrarTempo" :data="data.pregunta[index]" @siguiente="siguientePregunta" />
    <Ranking v-if="!cargando && !visibleJuego && !mostrarTempo" :puntuacion="puntuacion" />
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.main {
  background-image: url("@/assets/bioma/parque.jpg");
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  position: relative;
}

.temporizador {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imagen-temporizador {
  width: 30%;
  max-width: 300px;
}
</style>
