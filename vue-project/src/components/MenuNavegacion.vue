<script setup>
import { RouterLink } from 'vue-router'

const opcionesMenu = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/marcas', texto: 'Marcas' },
  { ruta: '/nueva-marca', texto: 'Nueva Marca' },
  { ruta: '/modelos', texto: 'Modelos' },
  { ruta: '/nuevo-modelo', texto: 'Nuevo Modelo' },
  { ruta: '/vehiculos', texto: 'Vehículos' },
  { ruta: '/nuevo-vehiculo', texto: 'Nuevo Vehículo' },
  { ruta: '/alquiler', texto: 'Alquiler' },
  { ruta: '/clientes', texto: 'Clientes' }
]
</script>
<template>
  <aside class="menu">
    <h2>Renting</h2>
    <nav>
      <RouterLink
        v-for="opcion in opcionesMenu"
        :key="opcion.ruta"
        :to="opcion.ruta"
        class="link"
      >
        {{ opcion.texto }}
      </RouterLink>
    </nav>
  </aside>
</template>
<style scoped>
.menu {
  position: fixed;
  width: 240px;
  height: 100vh;
  background-color: #243447;
  color: white;
  padding: 20px;
}
.link {
  display: block;
  margin: 10px 0;
  color: white;
  text-decoration: none;
}
.link.router-link-exact-active {
  font-weight: bold;
  color: #1abc9c;
}
</style>