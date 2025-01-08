<script setup>
import arcade from './arcade.vue';



</script>

<template>
  <main>
 
   

    <arcade></arcade>

    <div class="niveles"> 
      
      <q-btn round color="purple" glossy class="nivel_centro"  style="grid-row: 1;" >  10  </q-btn>
      <q-btn round color="purple" glossy class="nivel_centro"  style="grid-row: 2;">  9  </q-btn>
      <q-btn round color="purple" glossy class="nivel_centro_izquierda"  style="grid-row: 3;">  8  </q-btn>
      <q-btn round color="purple" glossy class="nivel_izquierda"  style="grid-row: 4;">  7  </q-btn>
      <q-btn round color="purple" glossy class="nivel_centro_izquierda"  style="grid-row: 5;">  6  </q-btn>
      <q-btn round color="purple" glossy class="nivel_centro"  style="grid-row:6;">  5  </q-btn>
      <q-btn round color="purple" glossy class="nivel_centro_derecha"  style="grid-row: 7;">  4  </q-btn>
      <q-btn round color="purple" glossy class="nivel_derecha"  style="grid-row: 8;">  3  </q-btn>
      <q-btn round color="purple" glossy class="nivel_centro_derecha"  style="grid-row: 9;" >  2  </q-btn>
      <q-btn round color="purple" glossy class="nivel_centro" style="grid-row: 10;" >  1  </q-btn>
    
    </div>

    <br>

    
  <RouterLink to="/jugar"> <q-btn color="deep-orange" class="botones_menu"   glossy label="Volver"></q-btn></RouterLink>

 

  </main>
</template>
<style scoped>
.niveles{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
  display: none;

}

.nivel_centro{
  grid-column: 3;
  font-size: 25px;
  width: 80px;
  
}
.nivel_centro_derecha{
  grid-column: 4;
  font-size: 25px;
  width: 80px;
}
.nivel_centro_izquierda{
  grid-column: 2;
  font-size: 25px;
  width: 80px;
}
.nivel_derecha{
  grid-column: 5;
  width: 80px;
  font-size: 25px;
}
.nivel_izquierda{
  grid-column: 1;
  width: 80px;
  font-size: 25px;
}


 

</style>