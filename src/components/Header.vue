<template>
  <header class="bg-teal-500 p-8">
    <h1 class="text-3xl capitalize text-center text-slate-200 font-bold">{{ title }} &#x1F416;</h1>
  </header>
</template>

<script>
import { title } from "../constants";

export default {
  name: "Header",
  data: function () {
    return {
      title,
    };
  },
}
</script>

<style>
img {
  width: 80px;
}
</style>