<template>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

  <RouterLink to="/jugar">
    <img src="@/assets/imagenes/volver.png" alt="Volver" class="imagen_volver">
  </RouterLink>

  <div class="fondo">
    <div class="niveles">
      <q-btn round class="nivel" style="grid-row: 1; grid-column: 1;" :label="10" @click="loadQuestions(10)"></q-btn>
      <q-btn round class="nivel" style="grid-row: 2; grid-column: 2;" :label="9" @click="loadQuestions(9)"></q-btn>
      <q-btn round class="nivel" style="grid-row: 3; grid-column: 3;" :label="8" @click="loadQuestions(8)"></q-btn>
      <q-btn round class="nivel" style="grid-row: 4; grid-column: 2;" :label="7" @click="loadQuestions(7)"></q-btn>
      <q-btn round class="nivel" style="grid-row: 5; grid-column: 1;" :label="6" @click="loadQuestions(6)"></q-btn>
      <q-btn round class="nivel" style="grid-row: 6; grid-column: 2;" :label="5" @click="loadQuestions(5)"></q-btn>
      <q-btn round class="nivel" style="grid-row: 7; grid-column: 3;" :label="4" @click="loadQuestions(4)"></q-btn>
      <q-btn round class="nivel" style="grid-row: 8; grid-column: 2;" :label="3" @click="loadQuestions(3)"></q-btn>
      <q-btn round class="nivel" style="grid-row: 9; grid-column: 1;" :label="2" @click="loadQuestions(2)"></q-btn>
      <q-btn round class="nivel" style="grid-row: 10; grid-column: 2;" :label="1" @click="loadQuestions(1)"></q-btn>
    </div>

    <div v-if="question">
      <p>{{ question.pregunta }}</p> <!-- Muestra solo la primera pregunta -->
    </div>
  </div>
</template>

<script>
import { getpregunta } from '@/comunication_manager.js';  // Corregido el nombre de la función

export default {
  data() {
    return {
      question: null, // Almacenamos solo una pregunta
    };
  },
  methods: {
    async loadQuestions(nivel) {
  try {
    const data = await getpregunta(nivel);  // Llama a la función para obtener preguntas
    this.question = data[0];  // Tomar la primera pregunta del array
  } catch (error) {
    console.error('Error loading question:', error);
  }
}

    
  }
};
</script>

<style scoped>
.imagen_volver {
  position: fixed; 
  top: 20px; 
  left: 20px;
  width: 40px;
  border: 2px solid white; 
  border-radius: 5px; 
}

.fondo {
  background-image: url('@/assets/imagenes/fondo1.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0; 
}

.niveles {
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  gap: 30px;
  justify-items: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 5px;
}

.nivel {
  font-size: 16px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Press Start 2P', cursive;
  background-size: cover;
  background-position: center;
  color: white;
  border: 5px solid white; 
}

.nivel:nth-child(1),
.nivel:nth-child(2),
.nivel:nth-child(3),
.nivel:nth-child(4),
.nivel:nth-child(5),
.nivel:nth-child(6),
.nivel:nth-child(7),
.nivel:nth-child(8),
.nivel:nth-child(9),
.nivel:nth-child(10) {
  background-image: url('@/assets/imagenes/pelotareal.png');
}
</style>
