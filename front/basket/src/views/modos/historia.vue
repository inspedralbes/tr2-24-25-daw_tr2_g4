<script setup>

</script>

<template>
  <main>
 
  
    <h1>Historia</h1>

    <div v-for="n in 10"> <button> {{ n }} </button>  <span v-if="n<10">-></span>   </div>

    <br>


  <RouterLink to="/jugar"> Volver</RouterLink>

 

  </main>
</template>
<style scoped>
main{

  display: inline;
}


div{

  display: inline ;

}  

</style>