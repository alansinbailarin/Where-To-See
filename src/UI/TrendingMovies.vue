<template>
  <div v-if="skeleton">Cargando...</div>
  <swiper
    v-else
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 10000,
      disableOnInteraction: false,
    }"
    :pagination="{
      dynamicBullets: true,
    }"
    :navigation="false"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="movie in trendingMovies" :key="movie.id">
      <div class="relative">
        <img
          :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
          :alt="`${movie.title}`"
          class="w-full h-56 md:h-[40rem] object-cover"
        />
        <div
          class="absolute z-20 inset-0 grid md:grid-cols-2 items-center mx-7 md:mx-20 text-white"
        >
          <div>
            <RouterLink
              class="hover:text-gray-300"
              :to="{ name: 'movie-detail', params: { id: movie.id } }"
              ><p class="uppercase text-sm md:text-4xl font-bold text-gray-100">
                {{ movie.title }}
              </p>
            </RouterLink>
            <TrendingGenre class="my-4" :id="movie.id" />
            <p class="text-gray-300 text-sm">{{ movie.overview }}</p>
          </div>
          <div>
            <img
              :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
              :alt="`${movie.title}`"
              class="w-80 mx-auto rounded-lg shadow-2xl object-cover"
            />
          </div>
        </div>
        <div
          class="absolute bottom-0 z-10 left-0 w-full h-full bg-gradient-to-t from-black to-transparent"
        ></div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import MovieService from "../services/MovieService";
import TrendingGenre from "../components/trending/TrendingGenre.vue";
import { onMounted, watch, ref } from "vue";

const trendingMovies = ref(null);
const skeleton = ref(true);
const totalMovies = ref(0);
const totalPages = ref(0);

defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  watch(() => {
    skeleton.value = true;
    trendingMovies.value = null;
    MovieService.getTrendingMovies()
      .then((res) => {
        trendingMovies.value = res.data.results;
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

const modules = [Autoplay, Pagination, Navigation];
</script>
