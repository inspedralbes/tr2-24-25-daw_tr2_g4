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

const animaciones = reactive({encestar: false, fallo1: false, fallo2: false, fallo3:false, fallo4:false, fallo5:false,temblor1:false,
                              temblor2:false, llamas:false,

 })
 

function apagarAnimaciones(interrumptor){
  console.log(interrumptor)
  animaciones.encestar=false;
  animaciones.fallo1=false;
  animaciones.fallo2=false;
  animaciones.fallo3=false;
  animaciones.fallo4=false;
  animaciones.fallo5=false;

  if(interrumptor==3){

    animaciones.temblor1=true
     
    
  }
  if(interrumptor==4){
    animaciones.temblor2=true;
     
    
    
  }
  if(interrumptor>=5){
    animaciones.llamas=true
  }


}

function apagarAnimaciones_temblores(){

  animaciones.temblor1=false;
  animaciones.temblor2=false;
  animaciones.llamas=false;

}
let puntosSeguidos=0;

function siguientePregunta(num) {
  
let apagar=0;
   
  if (index.value < data.length){
    apagarAnimaciones_temblores();
    if (data[index.value].respuesta_correcta == num) {
       
      animaciones.encestar=true;
      Canastas.value++;
      puntosSeguidos++;

      if(puntosSeguidos==3){
       
        apagar=3;

      }
      if(puntosSeguidos==4){
        apagar=4;
      }
      if(puntosSeguidos>=5){
        apagar=5
      }

    }else{
      puntosSeguidos=0;
      let aux= Math.floor(Math.random() * 5) + 1;
      
      animaciones[`fallo${aux}`] = true;


    }
  index.value++;

  setTimeout(() => {
    apagarAnimaciones(apagar);
  }, 500);
}else{

  console.log("hola");
  
}
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

   

  <img id="balon" 
   
  :class="{'animacion_encestar': animaciones.encestar,
  'animacion_fallo1': animaciones.fallo1,
  'animacion_fallo2': animaciones.fallo2,
  'animacion_fallo3': animaciones.fallo3,
  'animacion_fallo4': animaciones.fallo4,
  'animacion_fallo5': animaciones.fallo5,
  'animacion_temblor1':animaciones.temblor1,
  'animacion_temblor2': animaciones.temblor2,
  'animacion_fuego':animaciones.llamas,

  }" 
  src="../../assets/bioma/balon.png" alt="" srcset="">

</div> 



<Partida class="arcade":data="data[index]" @siguiente="siguientePregunta" />  
  </main>

</template>

<style scoped>

@keyframes temblor1 {
            0% { transform: translate(0, 0); }
            20% { transform: translate(7px, 7px); }
            40% { transform: translate(-7px, -7px); }
            60% { transform: translate(7px, -7px); }
            80% { transform: translate(-7px, 7px); }
            100% { transform: translate(0, 0); }
        }


@keyframes temblor2 {
            0% { transform: translate(0, 0); }
            10% { transform: translate(8px, 8px); }
            20% { transform: translate(-12px, -10px); }
            30% { transform: translate(10px, -15px); }
            40% { transform: translate(-8px, 12px); }
            50% { transform: translate(5px, -10px); }
            60% { transform: translate(-6px, 8px); }
            70% { transform: translate(12px, 15px); }
            80% { transform: translate(-10px, -8px); }
            90% { transform: translate(5px, 12px); }
            100% { transform: translate(0, 0); }
        }

@keyframes llamas {
            0% {
                
                box-shadow: none;
            }
            100% {
                
                box-shadow: 0 0 40px 20px yellow, 0 0 60px 30px red, 0 0 80px 40px #ff4500;
                background-color:rgb(255, 196, 0);
                filter:brightness(1.4);
            }
        }
 @keyframes 
 encestar {
    0% {
        transform: translateY(0); /* Empieza en la parte inferior */
         
    } 50%{

       transform: translateY(-400px)  scale(0.8) rotate(-90deg);
      
    }
    100% {
        transform: translateY(-300px) scale(0.4) rotate(-180deg); /* Sube 200px hacia arriba */
         
    }
  }


  @keyframes 
 fallo1 {
    0% {
        transform: translateY(0); /* Empieza en la parte inferior */
    } 50%{

       transform: translateY(-400px) translateX(-100px)  scale(0.8) rotate(-90deg);
       
    }
    100% {
        transform: translateY(-300px) translateX(-150px)  scale(0.4) rotate(-180deg); /* Sube 200px hacia arriba */
    }
  }

  @keyframes 
 fallo2 {
    0% {
        transform: translateY(0); /* Empieza en la parte inferior */
    } 50%{

       transform: translateY(-400px) translateX(100px)  scale(0.8) rotate(-90deg);
       
    }
    100% {
        transform: translateY(-300px) translateX(150px)  scale(0.4) rotate(-180deg); /* Sube 200px hacia arriba */
    }
  }

  @keyframes 
 fallo3 {
    0% {
        transform: translateY(0); /* Empieza en la parte inferior */
    } 50%{

       transform: translateY(-400px) translateX(10px)  scale(0.8) rotate(-90deg);
       
    }
    70% {
        transform: translateY(-350px)translateX(10px)   scale(0.4) rotate(-180deg); /* Sube 200px hacia arriba */
    }
    100%{
      transform: translateY(-300px) translateX(50px)  scale(0.4) rotate(-180deg); /* Sube 200px hacia arriba */
    }
  }
  @keyframes 
 fallo4{
    0% {
        transform: translateY(0); /* Empieza en la parte inferior */
    }
    100%{
      transform: translateY(-500px) translateX(200px)  scale(0.4) rotate(-180deg); /* Sube 200px hacia arriba */
    }
  }

  @keyframes 
 fallo5{
    0% {
        transform: translateY(0); /* Empieza en la parte inferior */
    }
    100%{
      transform: translateY(-800px) translateX(-100px)  scale(0.4) rotate(-180deg); /* Sube 200px hacia arriba */
    }
  }


.animacion_encestar{

 
  animation: encestar  0.5s linear  ;

}  

.animacion_fallo1{
  animation: fallo1  0.5s linear  ;
}

.animacion_fallo2{
  animation: fallo2  0.5s linear  ;
}
.animacion_fallo3{
  animation: fallo3  0.5s linear  ;
}
.animacion_fallo4{
  animation: fallo4  0.5s linear  ;
}
.animacion_fallo5{
  animation: fallo5  0.5s linear  ;
}

.animacion_temblor1{
  animation: temblor1 0.5s infinite;
}


.animacion_temblor2{
  animation: temblor2 0.5s infinite;
}


.animacion_fuego{

  animation: temblor2 0.5s infinite, llamas 1s forwards;
}





#balon{
  height: 150px;
  width: 150px;
  grid-column: 2;
  grid-row: 2;
  position: relative;
  top: 130px;
  justify-self: center;  
  border-radius: 50%;
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
  background-image: url("../../assets/bioma/parque.jpg"); 
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
