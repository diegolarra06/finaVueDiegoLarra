<script setup>
import { computed, ref } from 'vue'
import { marcasOrdenadasPorNombre, obtenerModelosDeMarca, vehiculos, modelos } from '../stores/tiendaRenting'
import NuevoVehiculo from '../components/NuevoVehiculo.vue'

const idMarcaSeleccionada = ref('')
const idModeloSeleccionado = ref('')
const mostrarFormulario = ref(false)

const modelosFiltrados = computed(() => {
  if (!idMarcaSeleccionada.value) {
    return []
  }

  return obtenerModelosDeMarca(idMarcaSeleccionada.value)
})

const vehiculosFiltrados = computed(() => {
  if (!idMarcaSeleccionada.value) {
    return vehiculos.value
  }

  const idsModelosDeMarca = modelosFiltrados.value.map((modeloActual) => modeloActual.id)

  if (!idModeloSeleccionado.value) {
    return vehiculos.value.filter((vehiculoActual) =>
      idsModelosDeMarca.includes(vehiculoActual.idModelo)
    )
  }

  return vehiculos.value.filter(
    (vehiculoActual) => vehiculoActual.idModelo === idModeloSeleccionado.value
  )
})

function obtenerNombreModelo(idModelo) {
  const modeloEncontrado = modelos.value.find((modeloActual) => modeloActual.id === idModelo)
  return modeloEncontrado ? modeloEncontrado.modelo : 'Modelo no encontrado'
}
</script>

<template>
  <section class="pagina">
    <h2>Vehículos</h2>

    <div class="filtros">
      <select v-model="idMarcaSeleccionada">
        <option value="">Selecciona una marca</option>
        <option
          v-for="marca in marcasOrdenadasPorNombre"
          :key="marca.id"
          :value="marca.id"
        >
          {{ marca.nombre }}
        </option>
      </select>

      <select
        v-model="idModeloSeleccionado"
        :disabled="!idMarcaSeleccionada"
      >
        <option value="">Selecciona un modelo</option>
        <option
          v-for="modelo in modelosFiltrados"
          :key="modelo.id"
          :value="modelo.id"
        >
          {{ modelo.modelo }}
        </option>
      </select>
    </div>

    <ul class="lista">
      <li v-for="vehiculo in vehiculosFiltrados" :key="vehiculo.id">
        {{ obtenerNombreModelo(vehiculo.idModelo) }} - {{ vehiculo.precioDia }} €/día
      </li>
    </ul>

    <button type="button" @click="mostrarFormulario = !mostrarFormulario">
      {{ mostrarFormulario ? 'Ocultar Nuevo Vehículo' : 'Mostrar Nuevo Vehículo' }}
    </button>

    <div v-if="mostrarFormulario" class="zona-formulario">
      <NuevoVehiculo
        :marca-preseleccionada="idMarcaSeleccionada"
        :modelo-preseleccionado="idModeloSeleccionado"
        :bloquear-seleccion="Boolean(idMarcaSeleccionada && idModeloSeleccionado)"
      />
    </div>
  </section>
</template>

<style scoped>
.pagina {
  background-color: black;
  padding: 24px;
  border-radius: 8px;
}

.filtros {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.filtros select {
  padding: 8px;
}

.lista {
  padding-left: 18px;
  margin-bottom: 20px;
}

button {
  padding: 10px 14px;
  border: none;
  background-color: #243447;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.zona-formulario {
  margin-top: 18px;
}
</style>