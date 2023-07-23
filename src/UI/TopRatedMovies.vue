<template>
  <div v-if="skeleton">
    <SkeletonCard />
  </div>
  <div v-else class="mx-5">
    <h1 class="font-bold text-white text-xl uppercase mb-4">Peliculas top</h1>
    <article v-if="topRatedMovies" class="gap-4">
      <swiper
        :slidesPerView="8"
        :spaceBetween="30"
        :centeredSlides="false"
        :bullets="false"
        :pagination="false"
        :modules="modules"
        class="mySwiper hidden md:block"
      >
        <swiper-slide v-for="movie in topRatedMovies" :key="movie.id">
          <MovieCard :movie="movie" />
        </swiper-slide>
      </swiper>
      <swiper
        :slidesPerView="2.3"
        :spaceBetween="30"
        :centeredSlides="false"
        :bullets="false"
        :pagination="false"
        :modules="modules"
        class="mySwiper block md:hidden"
      >
        <swiper-slide v-for="movie in topRatedMovies" :key="movie.id">
          <MovieCard :movie="movie" />
        </swiper-slide>
      </swiper>
    </article>
    <div v-else>No hay nada para mostrar</div>
  </div>
</template>

<script setup>
import MovieService from "../services/MovieService";
import MovieCard from "../components/MovieCard.vue";
import SkeletonCard from "../components/SkeletonCard.vue";
import { ref, watch, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const topRatedMovies = ref(null);
const skeleton = ref(true);
const totalMovies = ref(0);
const totalPages = ref(0);
const modules = [Pagination];

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

<style scoped>
.swiper-pagination-bullets {
  display: none;
}
</style>
