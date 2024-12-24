<script setup>
import { reactive } from 'vue';
import { useCounterStore } from '@/stores/counter';
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
},)
const store=useCounterStore();

const ranking= reactive({'user':props.data.username,'puntacion':props.data.puntacion})

</script>


<template>



</template>

<style scoped> 



</style>