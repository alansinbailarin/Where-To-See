import axios from "axios";

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWI4NGE0ZmNjMDI3MTc0ZTM5YmY3YTcxNDZmM2E4NCIsInN1YiI6IjY0Yjg1ZDNlMTY4NWRhMDExYjZkODkyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.95dNowWOkKE0KKOnQuSpVgHa5fIEaLb1CDwoxD89sJY";

const lang = "es";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

export default {
  getTopRatedMovies(page) {
    return apiClient.get(`/movie/top_rated?language=${lang}&page=${page}`);
  },

  getSpecificMovie(id) {
    return apiClient.get(`/movie/${id}?language=${lang}`);
  },

  getTrendingMovies() {
    return apiClient.get(`/trending/movie/day?language=${lang}`);
  },
};
