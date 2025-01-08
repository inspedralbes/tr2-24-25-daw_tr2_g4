<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import marioAudio from '@/assets/audio/mario-kart-8-countdown.mp3';
import imagen3 from '@/assets/images/3.png';
import imagen2 from '@/assets/images/2.png';
import imagen1 from '@/assets/images/1.png';
import imagenGo from '@/assets/images/go.png';

const props = defineProps({
  onComplete: {
    type: Function,
    required: true
  }
});

const imagenActual = ref(imagen3);  
const temporizador = ref(3);  
const audio = new Audio(marioAudio);
let intervalo;

const iniciarTemporizador = () => {
  audio.play().catch(error => {
    console.error('No se pudo reproducir el audio:', error);
  });

  const imagenes = [imagen3, imagen2, imagen1, imagenGo];
  let i = 0;

  intervalo = setInterval(() => {
    imagenActual.value = imagenes[i];  
    temporizador.value = 3 - i;  
    i++;

    if (i >= imagenes.length) {
      clearInterval(intervalo); 
      setTimeout(() => {
        props.onComplete();  
      }, 1000);  
    }
  }, 1000);
};

const detenerAudio = () => {
  audio.pause(); 
  audio.currentTime = 0; 
};

onMounted(() => {
  iniciarTemporizador();
});

onBeforeUnmount(() => {
  detenerAudio();  
});

</script>

<template>
  <div class="temporizador">
    <img :src="imagenActual" alt="Temporizador de cuenta regresiva" class="imagen-temporizador" />
  </div>
</template>

<style scoped>
.temporizador {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.imagen-temporizador {
  width: 30%;
  max-width: 300px;
  margin-bottom: 20px;
}

p {
  font-size: 30px;
  color: white;
  font-weight: bold;
  margin-top: 20px;
}
</style>
