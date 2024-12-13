<script setup>

import Partida from '@/components/Partida.vue';
import { reactive, ref } from 'vue';

const data = reactive([
  {
    "id": 1,
    "operacion": "5 + 3",
    "respuesta_correcta": 8,
    "respuestaIncorrecta_1": 9,
    "respuestaIncorrecta_2": 7,
    "respuestaIncorrecta_3": 10,
    "modo": "arcade",
    "duracion": 10
  },
  {
    "id": 2,
    "operacion": "9 - 4",
    "respuesta_correcta": 5,
    "respuestaIncorrecta_1": 3,
    "respuestaIncorrecta_2": 6,
    "respuestaIncorrecta_3": 7,
    "modo": "historia",
    "duracion": 8
  },
  {
    "id": 3,
    "operacion": "6 * 2",
    "respuesta_correcta": 12,
    "respuestaIncorrecta_1": 10,
    "respuestaIncorrecta_2": 14,
    "respuestaIncorrecta_3": 8,
    "modo": "arcade",
    "duracion": 12
  },
  {
    "id": 4,
    "operacion": "15 / 3",
    "respuesta_correcta": 5,
    "respuestaIncorrecta_1": 6,
    "respuestaIncorrecta_2": 4,
    "respuestaIncorrecta_3": 3,
    "modo": "historia",
    "duracion": 7
  },
  {
    "id": 5,
    "operacion": "7 + 8",
    "respuesta_correcta": 15,
    "respuestaIncorrecta_1": 14,
    "respuestaIncorrecta_2": 16,
    "respuestaIncorrecta_3": 13,
    "modo": "arcade",
    "duracion": 12
  },
  {
    "id": 6,
    "operacion": "12 - 5",
    "respuesta_correcta": 7,
    "respuestaIncorrecta_1": 6,
    "respuestaIncorrecta_2": 8,
    "respuestaIncorrecta_3": 9,
    "modo": "historia",
    "duracion": 14
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
]
)
const Canastas = ref(0)
const index = ref(0)
const activar_animacion=ref(false);

function siguientePregunta(num) {
  

   
  activar_animacion.value=true;
  if (index.value < data.length - 1)
    if (data[index.value].respuesta_correcta == num) {
      Canastas.value++;
    }
  index.value++;

  setTimeout(() => {
    activar_animacion.value=false;
  }, 500);
  
}

</script>

<template>
  <main id="main_arcade">

     

 <div class="body_arcade">
   <!--
  <h4  >Puntos:  {{ Canastas }} </h4>
  
  
  <RouterLink to="/jugar"> <q-btn color="deep-orange"  size="20px" glossy label="Volver"></q-btn></RouterLink>
 -->
   <img id="canasta" src="../../assets/bioma/tablero.png" alt="">


  <img id="balon" :class="{'animacion_balon': activar_animacion}" src="../../assets/bioma/balon.png" alt="" srcset="">

</div> 



<Partida class="arcade":data="data[index]" @siguiente="siguientePregunta" />  
  </main>

</template>

<style scoped>
 @keyframes 
 encestar {
    0% {
        transform: translateY(0); /* Empieza en la parte inferior */
    } 50%{

       transform: translateY(-300px)  scale(0.8) rotate(-90deg);
       
    }
    100% {
        transform: translateY(-250px) scale(0.7) rotate(-180deg); /* Sube 200px hacia arriba */
    }
  }


  @keyframes 
 fallo1 {
    0% {
        transform: translateY(0); /* Empieza en la parte inferior */
    } 50%{

       transform: translateY(-300px) translateX(-100px)  scale(0.8) rotate(-90deg);
       
    }
    100% {
        transform: translateY(-250px) translateX(-100px)  scale(0.7) rotate(-180deg); /* Sube 200px hacia arriba */
    }
  }

.animacion_balon{

 
  animation: fallo1 0.5s linear;

}  

#balon{
  height: 150px;
  width: 150px;
  grid-column: 2;
  grid-row: 2;
  position: relative;
  top: 130px;
  justify-self: center;  
}

#canasta{
  grid-row: 1;
  grid-column: span 3;
  justify-self: center;  
  

  
}


#main_arcade {
  display: grid;
  grid-template-columns:1fr 1fr 1fr  ;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100vh;  
    }

.body_arcade{
  grid-column: span 3;
  text-align: center;
  grid-row: span 2;
  background-image: url("../../assets/bioma/casa2.jpg"); 
  background-position:  bottom center;
  background-repeat: no-repeat; 
  background-size: auto;
  height: 80vh; 
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr; 
            
           
           

}
.arcade{
  display: grid;
  grid-column: span 3;
  grid-row: 3;

}


</style>
