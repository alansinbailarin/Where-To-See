<template>
  <RouterLink :to="{ name: 'movie-detail', params: { id: movie.id } }">
    <img
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      :alt="movie.title"
      class="rounded-lg shadow-lg object-cover"
    />
    <h1 class="text-gray-200 font-semibold text-xs mt-2">{{ movie.title }}</h1>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";

defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
</script>
