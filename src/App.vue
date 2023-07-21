<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div>
    <header>
      <Navbar />
    </header>
    <RouterView />
  </div>
</template>
