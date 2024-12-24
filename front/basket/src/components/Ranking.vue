<script setup>
import { reactive } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
},)


const ranking= reactive({'user':props.data.username,'puntacion':props.data.puntacion})

console.log(props.data)
</script>
<template>

<table class="ranking-table">
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Username</th>
          <th>Puntación</th>
        </tr>
      </thead>
      <transition-group name="rank" tag="tbody">
        <tr v-for="(player, index) in props.data" :key="player.name">
          <td>hola</td>  
          <td  :class="{'animacion_encestar': animaciones.encesta}">{{ player.username }}</td>
          <td>{{ player.puntacion }}</td>
        </tr>
      </transition-group>
    </table>


</template>

<style scoped> 


.ranking-table {

border-collapse: collapse;
}

.ranking-table th,
.ranking-table td {
border: 1px solid #ddd;
padding: 8px;
text-align: center;
}

.ranking-table th {
background-color: #f2f2f2;
}




.rank-enter-active,
.rank-leave-active {
transition: transform 0.5s ease, opacity 0.5s ease;
}

.rank-enter-from,
.rank-leave-to {
opacity: 0;
transform: translateY(20px);
}

.rank-move {
transition: transform 0.5s ease;
}

</style>