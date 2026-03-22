<script setup>
import { computed, ref } from 'vue'
import { marcasOrdenadasPorNombre, obtenerModelosDeMarca } from '../stores/tiendaRenting'

const idMarcaSeleccionada = ref('')

const modelosFiltrados = computed(() => {
  if (!idMarcaSeleccionada.value) {
    return []
  }

  return obtenerModelosDeMarca(idMarcaSeleccionada.value)
})
</script>

<template>
  <section class="pagina">
    <h2>Modelos</h2>

    <div class="grupo-campo centrado">
      <label for="marca">Selecciona una marca</label>
      <select id="marca" v-model="idMarcaSeleccionada">
        <option value="">Selecciona una marca</option>
        <option
          v-for="marca in marcasOrdenadasPorNombre"
          :key="marca.id"
          :value="marca.id"
        >
          {{ marca.nombre }}
        </option>
      </select>
    </div>

    <ul v-if="modelosFiltrados.length" class="lista">
      <li v-for="modelo in modelosFiltrados" :key="modelo.id">
        {{ modelo.modelo }} - Extra: {{ modelo.extraPorModelo }} €
      </li>
    </ul>

    <p v-else class="texto-ayuda">
      Selecciona una marca para ver sus modelos.
    </p>
  </section>
</template>

<style scoped>
.pagina {
  background-color: black;
  padding: 24px;
  border-radius: 8px;
}

.centrado {
  max-width: 350px;
  margin: 0 auto 20px;
}

.grupo-campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

select {
  padding: 8px;
}

.lista {
  padding-left: 18px;
}

.texto-ayuda {
  text-align: center;
}
</style>