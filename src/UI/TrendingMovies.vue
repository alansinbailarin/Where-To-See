<template>
  <div v-if="skeleton">
    <div class="flex justify-center items-center w-full h-screen">
      <div class="text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
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
          class="w-full h-[38rem] md:h-[50rem] object-cover shadow-2xl"
        />

        <div
          class="absolute z-30 inset-0 md:hidden grid grid-cols-2 items-center"
        >
          <div>
            <img
              :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
              :alt="`${movie.title}`"
              class="w-36 mx-auto rounded-lg shadow-2xl object-cover md:hidden"
            />
          </div>
          <div>
            <RouterLink
              class="hover:text-gray-300"
              :to="{ name: 'movie-detail', params: { id: movie.id } }"
              ><h1 class="uppercase md:text-4xl font-bold text-gray-100">
                {{ movie.title }}
              </h1>
            </RouterLink>
            <TrendingGenre class="" :id="movie.id" />
          </div>
        </div>

        <div
          class="absolute z-20 inset-0 grid md:grid-cols-2 items-center 3 md:mx-20 text-white"
        >
          <div>
            <RouterLink
              class="hover:text-gray-300 hidden md:block"
              :to="{ name: 'movie-detail', params: { id: movie.id } }"
              ><h1
                class="uppercase hidden md:block text-sm md:text-4xl font-bold text-gray-100"
              >
                {{ movie.title }}
              </h1>
            </RouterLink>
            <TrendingGenre class="my-4 hidden md:block" :id="movie.id" />
            <p class="text-gray-200 text-sm hidden md:block">
              {{ movie.overview }}
            </p>
          </div>
          <div>
            <img
              :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
              :alt="`${movie.title}`"
              class="w-80 mx-auto rounded-lg shadow-2xl object-cover hidden md:block"
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
