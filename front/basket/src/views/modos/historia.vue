<template>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

  <!-- Imagen para volver -->
  <RouterLink to="/jugar">
    <img src="@/assets/imagenes/volver.png" alt="Volver" class="imagen_volver">
  </RouterLink>

  <div class="fondo">
    <!-- Contenedor de niveles en zig-zag -->
    <div class="niveles">
      <q-btn round class="nivel" style="grid-row: 1; grid-column: 1;" :label="10"></q-btn>
      <q-btn round class="nivel" style="grid-row: 2; grid-column: 2;" :label="9"></q-btn>
      <q-btn round class="nivel" style="grid-row: 3; grid-column: 3;" :label="8"></q-btn>
      <q-btn round class="nivel" style="grid-row: 4; grid-column: 2;" :label="7"></q-btn>
      <q-btn round class="nivel" style="grid-row: 5; grid-column: 1;" :label="6"></q-btn>
      <q-btn round class="nivel" style="grid-row: 6; grid-column: 2;" :label="5"></q-btn>
      <q-btn round class="nivel" style="grid-row: 7; grid-column: 3;" :label="4"></q-btn>
      <q-btn round class="nivel" style="grid-row: 8; grid-column: 2;" :label="3"></q-btn>
      <q-btn round class="nivel" style="grid-row: 9; grid-column: 1;" :label="2"></q-btn>
      <q-btn round class="nivel" style="grid-row: 10; grid-column: 2;" :label="1"></q-btn>
    </div>
  </div>
</template>

<style scoped>
/* Imagen para volver */
.imagen_volver {
  position: absolute; 
  top: 20px; 
  left: 20px; /* Ajusta la distancia desde la parte izquierda */
  width: 30px; /* Ancho de la imagen */
  height: auto; /* Mantén la proporción de la imagen */
  cursor: pointer; /* Cambia el cursor al pasar por la imagen */
  border: 2px solid white; /* Borde blanco alrededor de la imagen */
  border-radius: 5px; /* Opcional: esquinas redondeadas */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Opcional: sombra para realce */
}

/* Fondo principal */
.fondo {
  background-image: url('@/assets/imagenes/fondo1.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Configuración del contenedor de niveles */
.niveles {
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  gap: 30px;
  justify-items: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 5px;
}

/* Estilo general para los botones de nivel */
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
  border: none; /* Opcional: eliminar el borde */
  color: white; /* Asegúrate de que el texto sea visible */
}

/* Asignar la misma imagen para todos los niveles */
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
  background-image: url('@/assets/imagenes/pelotanaranja.png');
}
</style>
