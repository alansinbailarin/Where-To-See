import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MovieDetailView from "../views/MovieDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/movie/:id",
      name: "movie-detail",
      props: true,
      component: MovieDetailView,
    },
  ],
});

export default router;
