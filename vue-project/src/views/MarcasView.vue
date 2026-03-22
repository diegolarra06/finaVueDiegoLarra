<script setup>
import { computed } from 'vue'
import { marcasOrdenadasPorNombre } from '../stores/tiendaRenting'

const listaMarcas = computed(() => marcasOrdenadasPorNombre.value)
</script>

<template>
  <section class="pagina">
    <h2>Marcas</h2>
    <p>Vista preparada para mostrar el listado de marcas.</p>

    <ul class="lista">
      <li v-for="marca in listaMarcas" :key="marca.id">
        {{ marca.nombre }} - {{ marca.origen }} - {{ marca.anioFundacion }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.pagina {
  background-color: black;
  padding: 24px;
  border-radius: 8px;
}

.lista {
  padding-left: 18px;
}
</style>