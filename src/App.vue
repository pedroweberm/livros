<template>
  <div id="app">
    <controller/>
  </div>
</template>

<script>
import Controller from "./components/Controller.vue";

export default {
  name: "app",
  components: {
    Controller
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0b0c0f;
  margin-top: 60px;
  background-color: #a8a8a8;
  background-image: url("https://www.transparenttextures.com/patterns/arches.png");
}
</style>
