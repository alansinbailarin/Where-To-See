<template>
  <swiper
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
          alt=""
          class="w-full h-56 md:h-[35rem] object-cover"
        />
        <div
          class="absolute z-20 inset-0 grid md:grid-cols-3 items-center mx-7 md:mx-20 text-white"
        >
          <div class="col-span-2">
            <RouterLink
              class="hover:text-gray-300"
              :to="{ name: 'movie-detail', params: { id: movie.id } }"
              ><p class="uppercase text-sm md:text-4xl font-bold text-gray-100">
                {{ movie.title }}
              </p>
              <p class="hidden md:block mt-2 text-xs md:text-lg text-gray-300">
                {{ movie.overview }}
              </p>
            </RouterLink>
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
import { onMounted, watch, ref } from "vue";

const trendingMovies = ref(null);
const skeleton = ref(true);
const totalMovies = ref(0);
const totalPages = ref(0);

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
