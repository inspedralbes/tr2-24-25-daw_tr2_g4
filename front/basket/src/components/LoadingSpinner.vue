<template>
    <q-dialog v-model="isLoading" backdrop-filter="blur(4px)">
      <q-card>
        <q-card-section>
          <q-spinner-facebook color="white" size="140px" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-h6">{{ message }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const isLoading = ref(false);
  const message = ref('Cargando...');
  
  const showLoading = (msg = 'Cargando...') => {
    message.value = msg;
    isLoading.value = true;
  };
  
  const hideLoading = () => {
    isLoading.value = false;
  };
  
  defineExpose({
    showLoading,
    hideLoading
  });
  
  watch(isLoading, (newValue) => {
    if (!newValue) {
      // Puedes realizar alguna acción después de que el loading se oculta
    }
  });
  </script>
  
  <style scoped>
  .q-card {
    width: 250px;
    height: 250px;
  }
  </style>
  