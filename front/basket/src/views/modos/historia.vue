<template>
   <RouterLink to="/jugar"> 
      <q-btn color="deep-orange" class="botones_menu" glossy label="Volver"></q-btn>
    </RouterLink>
  <div class="fondo">
   
    <div class="niveles">
      <!-- Niveles ajustados en zig-zag -->
      <q-btn round color="blue" glossy class="nivel" style="grid-row: 1; grid-column: 1;"> 10 </q-btn>
      <q-btn round color="blue" glossy class="nivel" style="grid-row: 2; grid-column: 2;"> 9 </q-btn>
      <q-btn round color="blue" glossy class="nivel" style="grid-row: 3; grid-column: 3;"> 8 </q-btn>
      <q-btn round color="blue" glossy class="nivel" style="grid-row: 4; grid-column: 2;"> 7 </q-btn>
      <q-btn round color="blue" glossy class="nivel" style="grid-row: 5; grid-column: 1;"> 6 </q-btn>
      <q-btn round color="blue" glossy class="nivel" style="grid-row: 6; grid-column: 2;"> 5 </q-btn>
      <q-btn round color="blue" glossy class="nivel" style="grid-row: 7; grid-column: 3;"> 4 </q-btn>
      <q-btn round color="blue" glossy class="nivel" style="grid-row: 8; grid-column: 2;"> 3 </q-btn>
      <q-btn round color="blue" glossy class="nivel" style="grid-row: 9; grid-column: 1;"> 2 </q-btn>
      <q-btn round color="blue" glossy class="nivel" style="grid-row: 10; grid-column: 2;"> 1 </q-btn>
    </div>

    <br>
    
   
  </div>
</template>

<style scoped>

.fondo {
  background-image: url('@/assets/imagenes/fondoreal.jpg'); 
  background-size: cover; 
  background-position: center; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
}

.botones_menu {
  display:flex; 
  font-size: 10px;
  left: 150px;
}
</style>
