<script setup>

</script>

<template>
  <main class="main-multijugador">
    <div class="body_multijugador">
      <SalasPrivadas />
    </div>
  </main>
</template>

<script>
import SalasPrivadas from '@/components/SalasPrivadas.vue';

export default {
  components: {
    SalasPrivadas,
  },
};
</script>

<style scoped>
#main-multijugador{
  display: grid;
  grid-template-columns:1fr 1fr 1fr;
 
   
}
.body_multijugador{
  grid-column: 2;

}


</style>