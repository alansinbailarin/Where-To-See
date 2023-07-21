<template>
  <div v-if="skeleton">Cargando...</div>
  <div v-else>
    <div v-if="movie">
      {{ movie.title }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MovieService from "../services/MovieService";

const movie = ref(null);
const skeleton = ref(true);

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

onMounted(() => {
  skeleton.value = true;
  MovieService.getSpecificMovie(props.id)
    .then((res) => {
      movie.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      skeleton.value = false;
    });
});
</script>
