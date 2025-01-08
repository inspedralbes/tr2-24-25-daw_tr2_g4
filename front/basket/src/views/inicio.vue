<script setup>

</script>

<template>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

  <main id="main_inicio">
 <div id="div_inicio">
    <h2> BasketBall</h2>
   <RouterLink to="/jugar"> <q-btn color="deep-orange" size="40px"> <q-icon name="eva-arrow-right-outline" size="400%"/></q-btn></RouterLink>
 </div>
   
  </main>

  
</template>


<style scoped>

#main_inicio{
  text-align: center;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100vh;
  font-family: 'Press Start 2P', cursive;

}
#div_inicio{

  grid-row:2 ;
  

}



 
</style>
