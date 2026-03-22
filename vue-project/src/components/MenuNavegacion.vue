<script setup>
import { RouterLink } from 'vue-router'

const enlacesMenu = [
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
  <aside class="menu-lateral">
    <h1 class="titulo-aplicacion">Renting Sur</h1>

    <nav class="contenedor-enlaces">
      <RouterLink
        v-for="enlace in enlacesMenu"
        :key="enlace.ruta"
        :to="enlace.ruta"
        class="enlace-menu"
      >
        {{ enlace.texto }}
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.menu-lateral {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  padding: 20px 16px;
  background-color: #243447;
  color: white;
}

.titulo-aplicacion {
  margin: 0 0 24px;
  text-align: center;
  font-size: 28px;
}

.contenedor-enlaces {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.enlace-menu {
  display: block;
  padding: 11px 12px;
  border-radius: 8px;
  color: white;
  text-decoration: none;
}

.enlace-menu:hover {
  background-color: #31485f;
}

.enlace-menu.router-link-exact-active {
  background-color: #17a589;
  font-weight: bold;
}
</style>