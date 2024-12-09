<script setup>

</script>

<template>
  <main>
  <div>
    <SalasPrivadas />
  </div>
 <RouterLink to="/jugar"><q-btn color="red-12" size="25px" class="boton_sala" glossy label="Volver"></q-btn></RouterLink>
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