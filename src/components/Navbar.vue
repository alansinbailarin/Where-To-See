<template>
  <nav class="fixed top-0 w-full z-20 mx-7 md:mx-20 my-5">
    <RouterLink :to="{ name: 'home' }" class="text-white">Logo</RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
