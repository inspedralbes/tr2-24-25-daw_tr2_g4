<script setup>
import { reactive,ref,computed, watch, onMounted, onUnmounted } from 'vue';
import { useCounterStore } from '@/stores/counter';
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },




},)


onMounted(() => {
  const useApp = useCounterStore();
  
      if (useApp.ActivarMusica) {
        useApp.ApagarMusica();
        
      }
     
    });

    onUnmounted(() => {
      const useApp = useCounterStore();
      if (useApp.ActivarMusica==false) {
        useApp.EncenderMusica();
        
      }
    });


const Canastas = ref(0)
const valorCanasta= ref(0)
const index = ref(0)

const info= reactive({fallo:false, canasta:0,racha:false})


const animaciones = reactive({encestar: false, fallo1: false, fallo2: false, fallo3:false, fallo4:false, fallo5:false,temblor1:false,
                              temblor2:false, llamas:false, tiro_en_llamas:false

 })
 

function apagarAnimaciones(interrumptor){
  
  animaciones.encestar=false;
  animaciones.fallo1=false;
  animaciones.fallo2=false;
  animaciones.fallo3=false;
  animaciones.fallo4=false;
  animaciones.fallo5=false;
  animaciones.tiro_en_llamas=false;

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

function reiniciarInfo(){

  info.canasta=0;
  info.fallo=false;
  info.racha=false;
}


function apagarAnimaciones_temblores(){

  animaciones.temblor1=false;
  animaciones.temblor2=false;
  animaciones.llamas=false;
  

}
let puntosSeguidos=0;

function comprobarPunto(num) {
  
 reiniciarInfo();

let apagar=0;
   
    apagarAnimaciones_temblores();
    if (props.data.respuesta_correcta == num) {
       

    if (progress.value < 0.3) {
        puntosSeguidos++;
        info.canasta=3;
    } else if(progress.value < 0.7) {
      info.canasta=2;
      puntosSeguidos=0;

    } else if(progress.value < 1){
      info.canasta=1;
      puntosSeguidos=0;
    }else{}
     

      if(puntosSeguidos==3){
       
        apagar=3;

      }
      if(puntosSeguidos==4){
        apagar=4;
      }
      if(puntosSeguidos>=5){
        apagar=5
        info.racha=true; 
        animaciones.tiro_en_llamas=true;
        
      }
      else{
        animaciones.encestar=true;
       
}

    }else{
      let aux= Math.floor(Math.random() * 5) + 1;
      animaciones[`fallo${aux}`] = true;
      info.fallo=true;
      info.canasta=0;
      puntosSeguidos=0;


    }
  
  index.value++;

  setTimeout(() => {
    apagarAnimaciones(apagar);
  }, 500);

 
}



const progress = ref(0.0); 
const color = ref(''); 
const aux = ref(0);
let idTemporizador = null;  
reiniciarTemporizador(); 
watch(() => props.data, () => { 
  reiniciarTemporizador();
});

function reiniciarTemporizador() { 
  
  if (idTemporizador) {
    clearInterval(idTemporizador);
  }
 
  progress.value = 0.0;
  color.value = '';
  
  aux.value = 1 / props.data.duracion;  
  iniciarTemporizador();
}

function iniciarTemporizador() { 
  idTemporizador = setInterval(() => {
    
    progress.value = progress.value + aux.value;
    props.data.duracion--;
    
    if (progress.value > 0 && progress.value < 0.2) {
      color.value = 'blue';
    } else if (progress.value > 0.3 && progress.value < 0.6) {
      color.value = 'green';
    } else if (progress.value > 0.7 && progress.value < 0.9) {
      color.value = 'red';
    } else if (progress.value >1) {
      
      clearInterval(idTemporizador);
      responder(-1);  
      
    }
 
    
  }, 1000);
}

  


const emit = defineEmits();



function mezclarRespuestas() {
  const respuestas = [
  props.data.respuesta_correcta,
  props.data.respuestaIncorrecta_1,
  props.data.respuestaIncorrecta_2,
  props.data.respuestaIncorrecta_3
  ]; 
  return respuestas.sort(() => Math.random() - 0.5);


}

const respuestasMezcladas = computed(() => mezclarRespuestas());

function responder(num){
    
    
  comprobarPunto(num);

  if(info.fallo){
    setTimeout(() => {
      emit('siguiente',info); 
  }, 800);


  }else{

    emit('siguiente',info); 
  }

    reiniciarTemporizador();
   
    
}



</script>

<template>
  <main id="main_arcade">
     
 <div class="body_arcade">
   <!--
  <h4  >Puntos:  {{ Canastas }} </h4>
  
  
  <RouterLink to="/jugar"> <q-btn color="deep-orange"  size="20px" glossy label="Volver"></q-btn></RouterLink>
 -->
   <img id="canasta" src="../assets/bioma/tablero.png" alt="">

   

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
  'animacion_encestar_llamas': animaciones.tiro_en_llamas

  }" 
  src="../assets/bioma/balon.png" alt="" srcset="">

</div> 



 



  <div class="tiempo_fuera">
    <div class="tiempo" >{{ props.data.duracion }} </div>
   </div>
    

 <span class="titul"> {{ props.data.operacion }} </span>
   
    <div class="respuestas">
      <q-linear-progress instant-feedback  :value="progress" :color="color" class=" barra"> </q-linear-progress>
     
      <div v-for="(respuesta, index) in respuestasMezcladas" :key="index">

      <q-btn  color="deep-orange" class="botones_partida" glossy label=""@click="responder(respuesta)"> {{ respuesta }}</q-btn>
    
     
     </div>
    </div>
  





  </main>
<!--<Partida class="arcade":data="data[index]" @siguiente="siguientePregunta" />  -->
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

@keyframes tiro_en_llamas {

  0% {
        transform: translateY(0);
        box-shadow: 0 0 40px 20px yellow, 0 0 60px 30px red, 0 0 80px 40px #ff4500;
                background-color:rgb(255, 196, 0);
                filter:brightness(1.4);
         
    } 50%{

       transform: translateY(-300px)  scale(0.8) rotate(-90deg);
        
      
    }
    100% {
        transform: translateY(-200px) scale(0.4) rotate(-180deg); /* Sube 200px hacia arriba */
         
        box-shadow: 0 30px 30px 20px yellow, 0 40px 50px 30px red, 0 50px  70px 40px #ff4500;
                background-color:rgb(255, 196, 0);
                filter:brightness(1.4);
    }
        }

 @keyframes 
 encestar {
    0% {
        transform: translateY(0); /* Empieza en la parte inferior */
         
    } 50%{

       transform: translateY(-300px)  scale(0.8) rotate(-90deg);
      
    }
    100% {
        transform: translateY(-200px) scale(0.4) rotate(-180deg); /* Sube 200px hacia arriba */
         
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
        transform: translateY(-200px) translateX(-150px)  scale(0.4) rotate(-180deg); /* Sube 200px hacia arriba */
    }
  }

  @keyframes 
 fallo2 {
    0% {
        transform: translateY(0); /* Empieza en la parte inferior */
    } 50%{

       transform: translateY(-300px) translateX(100px)  scale(0.8) rotate(-90deg);
       
    }
    100% {
        transform: translateY(-200px) translateX(150px)  scale(0.4) rotate(-180deg); /* Sube 200px hacia arriba */
    }
  }

  @keyframes 
 fallo3 {
    0% {
        transform: translateY(0); /* Empieza en la parte inferior */
    } 50%{

       transform: translateY(-300px) translateX(10px)  scale(0.8) rotate(-90deg);
       
    }
    70% {
        transform: translateY(-250px)translateX(10px)   scale(0.4) rotate(-180deg); /* Sube 200px hacia arriba */
    }
    100%{
      transform: translateY(-200px) translateX(50px)  scale(0.4) rotate(-180deg); /* Sube 200px hacia arriba */
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

.animacion_encestar_llamas{
  animation: tiro_en_llamas 0.5s linear;
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
  grid-template-rows: 1fr 1fr ;
  max-height: 100svh;
  background-image: url("../assets/bioma/parque.jpg"); 
  background-position: center 150% ;
  background-repeat: no-repeat; 
  background-size: auto;
 
    }

.body_arcade{
  grid-column: span 3;
  text-align: center;
  grid-row: span 2;
  
  max-height: 80svh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr; 
            
           
           

}
.arcade{
  display: grid;
  grid-column: span 3;
  grid-row: 3;

}


@font-face {
  font-family: 'DS-Digital';
  src: url('../assets/fuente/DS-DIGI.TTF') format('truetype');
}
 

.titul{

  grid-column: span 3;
  font-size: 50px;
  border: 1px solid black;
  background-color: white;
  text-align: center
}

.tiempo_fuera{
  
  grid-column: 2; 
  place-items: center;
 


}
.tiempo{ 
  border: 1px solid black;
  font-size: 30px;
  font-family: 'DS-Digital';
  text-shadow: 0 0 5px #f00, 0 0 10px #f00, 0 0 20px #f00, 0 0 30px #f00, 0 0 40px #f00, 0 0 50px #f00;
  color: rgb(255, 112, 112);
  background-color: black;
  grid-column: 2;
  place-items: center;
  border: 5px solid rgb(70, 70, 70);
  width: 70px;
  margin: 0 auto;
  text-align: center;
  
  
}

.problema{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center

}
.respuestas{
    display: grid;
    grid-column: span 3;
    grid-template-columns: 1fr 1fr;
    
}
 
.botones_partida{

  width: 100%; 
  font-size: 50px;  
}

.barra{
  height: 20px;
  grid-column: span 2;
   
}



</style>
