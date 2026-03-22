<script setup>
import { RouterView } from 'vue-router'
import MenuNavegacion from './components/MenuNavegacion.vue'
</script>

<template>
  <div class="aplicacion">
    <MenuNavegacion />

    <main class="contenido-principal">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  min-height: 100%;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  background-color: #00182c;
}

.contenido-principal {
  margin-left: 240px;
  min-height: 100vh;
  padding: 24px;
  background-color: #1b75cf;
}
</style>