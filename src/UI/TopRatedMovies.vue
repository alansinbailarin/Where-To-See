<template>
  <div v-if="skeleton">
    <SkeletonCard />
  </div>
  <div v-else>
    <div v-if="topRatedMovies" class="grid grid-cols-1 gap-4">
      <MovieCard
        v-for="movie in topRatedMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <div v-else>No hay nada para mostrar</div>
  </div>
</template>

<script setup>
import MovieService from "../services/MovieService";
import MovieCard from "../components/MovieCard.vue";
import SkeletonCard from "../components/SkeletonCard.vue";
import { ref, watch, onMounted } from "vue";

const topRatedMovies = ref(null);
const skeleton = ref(true);
const totalMovies = ref(0);
const totalPages = ref(0);

const props = defineProps({
  page: {
    type: Number,
    required: true,
    default: 1,
  },
});

onMounted(() => {
  watch(() => {
    skeleton.value = true;
    topRatedMovies.value = null;
    MovieService.getTopRatedMovies(props.page)
      .then((res) => {
        topRatedMovies.value = res.data.results;
        totalMovies.value = res.data.total_results;
        totalPages.value = res.data.total_pages;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        skeleton.value = false;
      });
  });
});
</script>
