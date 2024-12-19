<template>
    <main id="main-ranking">
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
  
      <div v-if="!juego" class="ranking-container">
        <h1 class="titulo">RANKING</h1>
  
          <div v-if="error" class="error">
          Error: {{ error }}
        </div>
  
        <table v-if="!loading && !error" class="ranking-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Puntuación</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rankings" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.puntuacion }}</td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="puntuacion !== null" class="puntuacion-final">
        <p>Puntuación es: <strong>{{ puntuacion }}</strong></p>
        </div>
  
        <RouterLink to="/jugar">
          <q-btn color="red-12" size="25px" class="boton-volver" glossy label="Volver"></q-btn>
        </RouterLink>
      </div>
    </main>
  </template>
  
  <script>
  import axios from 'axios';
  import { useQuasar, QSpinnerFacebook } from 'quasar';
  
  export default {
    name: "Ranking",
    props: {
      juego: Boolean, 
      puntuacion: {
      type: Number,
      default: 0,
    },
    },
    data() {
      return {
        rankings: [], 
        loading: true, 
        error: null,   
      };
    },
    methods: {
      async fetchRanking() {
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'white',
          spinnerSize: 50,
          message: 'Cargando datos...',
          backgroundColor: 'black',
          messageColor: 'white',
        });
  
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/ranking");
          this.rankings = response.data;
        } catch (err) {
          this.error = "No se pudo cargar la tabla de ranking.";
          console.error(err);
        } finally {
          this.loading = false;
          this.$q.loading.hide(); 
        }
      },
    },
    mounted() {
      this.fetchRanking();
    }
  };
  </script>
  
<style scoped>
  #main-ranking {
    background-image: url("../assets/bioma/parque.jpg"); 
    background-position: center center;
    background-size: cover; 
    background-attachment: fixed;
    height: 100vh; 
  }
  .puntuacion-final {
  margin-bottom: 20px;
  font-size: 18px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 8px;
}
  .ranking-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    font-family: 'Press Start 2P', cursive;
  }
  
  .titulo {
    font-family: 'Press Start 2P', cursive;
    font-size: 42px;
    margin-bottom: 20px;
    color: #e5ba0c;
  }
  
  .ranking-table {
    width: 80%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .ranking-table th, .ranking-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    background-color: #1c1c1c;
    color: #d59b3d;
    font-family: 'Press Start 2P', cursive;
    font-size: 17px;
  }
  
  .ranking-table th {
    background-color: #333;
    color: #e5ba0c;
  }
  
  
  .boton-volver {
    position: fixed;
    bottom: 20px;
    transform: translateX(-50%);
    width: 200px;
    font-size: 18px;
    padding: 10px;
    text-align: center;
  }
  </style>
  