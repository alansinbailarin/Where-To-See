<template>
  <div v-if="skeleton" class="text-white">Cargando...</div>
  <div v-else>
    <div v-if="movie.tagline">
      <h1 class="text-gray-300 mb-2 mt-2 text-xs font-thin md:hidden">
        {{ movie.tagline }}
      </h1>
    </div>
    <div
      class="text-gray-300 items-center text-xs md:text-sm md:mb-5 flex gap-1 my-2 flex-wrap"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        fill="currentColor"
        class="bi bi-star-fill mb-0.5 text-yellow-400"
        viewBox="0 0 16 16"
      >
        <path
          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
        />
      </svg>
      <p class="font-thin">({{ roundedCalification }}/10)</p>
      <p>
        por
        {{ voteCount }} personas
      </p>
      <p>{{ formattedDate }}</p>
    </div>
    <div v-if="movie" class="flex items-center md:gap-4 text-sm flex-wrap">
      <div v-for="(genre, index) in movie.genres" :key="index">
        <span
          class="hidden md:block bg-gray-500 px-4 py-2 opacity-70 text-white rounded-md"
          >{{ genre.name }}</span
        >
        <p class="md:hidden text-gray-300">
          {{ genre.name }}
          <span v-if="index < movie.genres.length - 1"> / </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import MovieService from "../../services/MovieService";
import dayjs from "dayjs";

const movie = ref(null);
const skeleton = ref(true);

const roundedCalification = computed(() => {
  return Math.round(movie.value.vote_average);
});

const voteCount = computed(() => {
  const formatter = new Intl.NumberFormat(); // Especifica el idioma ('es' para español) u otro según necesites
  const voted = formatter.format(movie.value.vote_count);
  return voted;
});

const formattedDate = dayjs(movie.released_date).format("MMMM D, YYYY");

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
