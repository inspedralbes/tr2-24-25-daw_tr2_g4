<template>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

  <!-- Enlace para volver -->
  <RouterLink to="/jugar">
    <img src="@/assets/imagenes/volver.png" alt="Volver" class="imagen_volver">
  </RouterLink>

  <div class="fondo">
    <!-- Botones de nivel -->
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

    <div v-if="question" class="pregunta">
      <p>{{ question.operacion }}</p>  
    </div>
  </div>
</template>

<script>
import { getpregunta } from '@/comunication_manager.js';  

export default {
  data() {
    return {
      question: null,  
    };
  },
  methods: {
    // Método para cargar la pregunta según el nivel
    async loadQuestions(nivel) {
      try {
        const data = await getpregunta(nivel); 
        console.log("Pregunta:", data);  

        if (Array.isArray(data) && data.length > 0) {
          this.question = data[0]; 
        } else {
          this.question = data; 
        }
      } catch (error) {
        console.error('Error al cargar la pregunta:', error);
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

.pregunta {
  margin-top: 20px;
  color: white;
  font-size: 20px;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
}
</style>
