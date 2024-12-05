<script setup>

</script>

<template>
  <main>
  <div>
    <SalasPrivadas />
  </div>
 <RouterLink to="/jugar"> Volver</RouterLink>
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