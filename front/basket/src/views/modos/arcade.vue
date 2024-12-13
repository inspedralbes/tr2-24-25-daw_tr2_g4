<script setup>
import Partida from '@/components/Partida.vue';
import { reactive, ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router'; 
const data = reactive([
  {
    "id": 1,
    "operacion": "5 + 3",
    "respuesta_correcta": 8,
    "respuestaIncorrecta_1": 9,
    "respuestaIncorrecta_2": 7,
    "respuestaIncorrecta_3": 10,
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
  },
  {
    "id": 4,
    "operacion": "15 / 3",
    "respuesta_correcta": 5,
    "respuestaIncorrecta_1": 6,
    "respuestaIncorrecta_2": 4,
    "respuestaIncorrecta_3": 3,
    "modo": "historia",
    "duracion": 20
  },
  {
    "id": 5,
    "operacion": "7 + 8",
    "respuesta_correcta": 15,
    "respuestaIncorrecta_1": 14,
    "respuestaIncorrecta_2": 16,
    "respuestaIncorrecta_3": 13,
    "modo": "arcade",
    "duracion": 30
  },
  {
    "id": 6,
    "operacion": "12 - 5",
    "respuesta_correcta": 7,
    "respuestaIncorrecta_1": 6,
    "respuestaIncorrecta_2": 8,
    "respuestaIncorrecta_3": 9,
    "modo": "historia",
    "duracion": 25
  },
  {
    "id": 7,
    "operacion": "4 * 3",
    "respuesta_correcta": 12,
    "respuestaIncorrecta_1": 10,
    "respuestaIncorrecta_2": 14,
    "respuestaIncorrecta_3": 9,
    "modo": "arcade",
    "duracion": 20
  },
  {
    "id": 8,
    "operacion": "18 / 2",
    "respuesta_correcta": 9,
    "respuestaIncorrecta_1": 8,
    "respuestaIncorrecta_2": 7,
    "respuestaIncorrecta_3": 10,
    "modo": "historia",
    "duracion": 30
  },
  {
    "id": 9,
    "operacion": "10 + 5",
    "respuesta_correcta": 15,
    "respuestaIncorrecta_1": 14,
    "respuestaIncorrecta_2": 16,
    "respuestaIncorrecta_3": 13,
    "modo": "arcade",
    "duracion": 25
  },
  {
    "id": 10,
    "operacion": "20 - 8",
    "respuesta_correcta": 12,
    "respuestaIncorrecta_1": 11,
    "respuestaIncorrecta_2": 13,
    "respuestaIncorrecta_3": 10,
    "modo": "historia",
    "duracion": 20
  },
  {
    "id": 11,
    "operacion": "3 * 7",
    "respuesta_correcta": 21,
    "respuestaIncorrecta_1": 18,
    "respuestaIncorrecta_2": 24,
    "respuestaIncorrecta_3": 20,
    "modo": "arcade",
    "duracion": 15
  },
  {
    "id": 12,
    "operacion": "16 / 4",
    "respuesta_correcta": 4,
    "respuestaIncorrecta_1": 3,
    "respuestaIncorrecta_2": 5,
    "respuestaIncorrecta_3": 6,
    "modo": "historia",
    "duracion": 20
  },
  {
    "id": 13,
    "operacion": "9 + 6",
    "respuesta_correcta": 15,
    "respuestaIncorrecta_1": 14,
    "respuestaIncorrecta_2": 16,
    "respuestaIncorrecta_3": 13,
    "modo": "arcade",
    "duracion": 25
  },
  {
    "id": 14,
    "operacion": "14 - 7",
    "respuesta_correcta": 7,
    "respuestaIncorrecta_1": 6,
    "respuestaIncorrecta_2": 8,
    "respuestaIncorrecta_3": 5,
    "modo": "historia",
    "duracion": 30
  },
  {
    "id": 15,
    "operacion": "8 * 2",
    "respuesta_correcta": 16,
    "respuestaIncorrecta_1": 14,
    "respuestaIncorrecta_2": 12,
    "respuestaIncorrecta_3": 18,
    "modo": "arcade",
    "duracion": 20
  },
  {
    "id": 16,
    "operacion": "24 / 6",
    "respuesta_correcta": 4,
    "respuestaIncorrecta_1": 5,
    "respuestaIncorrecta_2": 3,
    "respuestaIncorrecta_3": 6,
    "modo": "historia",
    "duracion": 25
  },
  {
    "id": 17,
    "operacion": "11 + 4",
    "respuesta_correcta": 15,
    "respuestaIncorrecta_1": 14,
    "respuestaIncorrecta_2": 16,
    "respuestaIncorrecta_3": 13,
    "modo": "arcade",
    "duracion": 30
  },
  {
    "id": 18,
    "operacion": "13 - 9",
    "respuesta_correcta": 4,
    "respuestaIncorrecta_1": 3,
    "respuestaIncorrecta_2": 5,
    "respuestaIncorrecta_3": 6,
    "modo": "historia",
    "duracion": 15
  },
  {
    "id": 19,
    "operacion": "5 * 5",
    "respuesta_correcta": 25,
    "respuestaIncorrecta_1": 20,
    "respuestaIncorrecta_2": 30,
    "respuestaIncorrecta_3": 24,
    "modo": "arcade",
    "duracion": 30
  },
  {
    "id": 20,
    "operacion": "30 / 5",
    "respuesta_correcta": 6,
    "respuestaIncorrecta_1": 5,
    "respuestaIncorrecta_2": 4,
    "respuestaIncorrecta_3": 7,
    "modo": "historia",
    "duracion": 25
  }
]);

const Canastas = ref(0);
const index = ref(0);
const nombreJugador = ref('');
const puntuaciones = ref([]);
const pantallaActiva = ref('ranking'); 
const juegoActivo = ref(false);
const juegoTerminado = ref(false);

// Cargar puntuaciones al iniciar
onMounted(() => {
  puntuaciones.value = JSON.parse(localStorage.getItem('puntuaciones') || '[]');
});

// Guardar nueva puntuación
const guardarPuntuacion = () => {
  puntuaciones.value.push({ nombre: nombreJugador.value, puntuacion: Canastas.value });
  puntuaciones.value.sort((a, b) => b.puntuacion - a.puntuacion);
  localStorage.setItem('puntuaciones', JSON.stringify(puntuaciones.value));
};

// Comenzar el juego
const empezarJuego = () => {
  if (!nombreJugador.value) return alert('Ingresa tu nombre para jugar.');
  pantallaActiva.value = 'juego';
  juegoActivo.value = true;
  Canastas.value = 0;
  index.value = 0;
  juegoTerminado.value = false;
};

// Siguiente pregunta
const siguientePregunta = (respuesta) => {
  if (data[index.value].respuesta_correcta === respuesta) Canastas.value++;
  index.value++;
  if (index.value >= data.length) {
    guardarPuntuacion();
    juegoActivo.value = false;
    juegoTerminado.value = true; 
    pantallaActiva.value = 'resultado';
  }
};

const verRanking = () => {
  pantallaActiva.value = 'ranking'; 
};
</script>



<template>
  <main id="arcade">
    <div class="body_arcade">
      <h3>Arcade</h3>

      <!-- ranking -->
      <div v-if="pantallaActiva === 'ranking'">
        <h5>RANKING</h5>

        <table class="puntuaciones">
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Puntuación</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, i) in puntuaciones" :key="i">
              <td>{{ p.nombre }}</td>
              <td>{{ p.puntuacion }}</td>
            </tr>
          </tbody>
        </table>

        <input type="text" v-model="nombreJugador" placeholder="Ingresa tu nombre" />
        <q-btn color="deep-orange" size="10px" @click="empezarJuego"> <q-icon name="eva-arrow-right-outline" size="200%" /></q-btn>
      </div>

      <!-- juego -->
      <div v-if="pantallaActiva === 'juego'">
        <Partida :data="data[index]" @siguiente="siguientePregunta" />
        <h4>Puntos: {{ Canastas }}</h4>
      </div>

      <!-- puntuacion final -->
      <div v-if="pantallaActiva === 'resultado'">
        <h4>juego terminado</h4>
        <p>Tu puntuacion- {{ Canastas }} de {{ data.length }}</p>
        <q-btn color="deep-orange" class="botones_menu" glossy label="Ver Ranking" @click="verRanking"></q-btn>
      </div>
    </div>
  </main>
</template>

<style scoped>
#arcade {
  display: flex;
  justify-content: center;
  height: 100vh;
}

.body_arcade {
  text-align: center;
}

input {
  margin-bottom: 10px;
}

.puntuaciones {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.puntuaciones th,
.puntuaciones td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.puntuaciones th {
  background-color: #f4f4f4;
  font-weight: bold;
}
</style>
