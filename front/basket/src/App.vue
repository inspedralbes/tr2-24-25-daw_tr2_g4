<script setup>
import { RouterLink, RouterView } from 'vue-router'
import musica from './components/musica.vue';
</script>

<template>
  <musica class="a021"></musica>
 <RouterView />
  
</template>

<style scoped>

.a021{
position: absolute;
right: 0; 
margin-right: 20px;
}

</style>
