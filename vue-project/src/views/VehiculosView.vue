<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  obtenerClientes,
  obtenerMarcas,
  obtenerModelos,
  obtenerVehiculos
} from '../services/api'
import NuevoVehiculo from '../components/NuevoVehiculo.vue'

const marcas = ref([])
const modelos = ref([])
const vehiculos = ref([])
const clientes = ref([])

const idMarcaSeleccionada = ref('')
const idModeloSeleccionado = ref('')
const mostrarFormulario = ref(false)

const error = ref('')
async function cargarDatos() {
  try {
    const [m, mo, v, c] = await Promise.all([
      obtenerMarcas(),
      obtenerModelos(),
      obtenerVehiculos(),
      obtenerClientes()
    ])

    marcas.value = m
    modelos.value = mo
    vehiculos.value = v
    clientes.value = c
  } catch {
    error.value = 'Error al cargar vehículos'
  }
}
function obtenerNombreModelo(idModelo) {
  const modelo = modelos.value.find(
    (m) => String(m.id) === String(idModelo)
  )
  return modelo ? modelo.modelo : ''
}

function clientesDeVehiculo(idVehiculo) {
  return clientes.value.filter((cliente) =>
    (cliente.alquileres || []).some(
      (a) => String(a.idVehiculo) === String(idVehiculo)
    )
  )
}
const modelosDisponibles = computed(() => {
  if (!idMarcaSeleccionada.value) return []

  return modelos.value.filter(
    (m) => String(m.idMarca) === String(idMarcaSeleccionada.value)
  )
})

const vehiculosFiltrados = computed(() => {

  if (!idMarcaSeleccionada.value) {
    return vehiculos.value
  }

  const idsModelos = modelosDisponibles.value.map(m => String(m.id))

  if (!idModeloSeleccionado.value) {
    return vehiculos.value.filter(v =>
      idsModelos.includes(String(v.idModelo))
    )
  }

  return vehiculos.value.filter(
    (v) => String(v.idModelo) === String(idModeloSeleccionado.value)
  )
})
function recargar() {
  cargarDatos()
}

onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <section class="pagina">
    <h2>Vehículos</h2>

    <p v-if="error">{{ error }}</p>
    <div class="filtros">
      <select v-model="idMarcaSeleccionada">
        <option value="">Marca</option>
        <option v-for="m in marcas" :key="m.id" :value="m.id">
          {{ m.nombre }}
        </option>
      </select>

      <select v-model="idModeloSeleccionado" :disabled="!idMarcaSeleccionada">
        <option value="">Modelo</option>
        <option v-for="m in modelosDisponibles" :key="m.id" :value="m.id">
          {{ m.modelo }}
        </option>
      </select>
    </div>
    <ul>
      <li v-for="v in vehiculosFiltrados" :key="v.id">

        <strong>{{ obtenerNombreModelo(v.idModelo) }}</strong>
        - {{ v.precioDia }} €/día

        <ul>
          <li v-for="c in clientesDeVehiculo(v.id)" :key="c.id">
            {{ c.nombre }} - {{ c.dni }}
          </li>
        </ul>

      </li>
    </ul>
    <button @click="mostrarFormulario = !mostrarFormulario">
      {{ mostrarFormulario ? 'Ocultar' : 'Nuevo Vehículo' }}
    </button>

    <RouterLink
      :to="{
        path: '/nuevo-vehiculo',
        query: {
          marca: idMarcaSeleccionada,
          modelo: idModeloSeleccionado
        }
      }"
    >
    Ir a un nuevo vehículo
    </RouterLink>
    <div v-if="mostrarFormulario">
      <NuevoVehiculo
        :marca-inicial="idMarcaSeleccionada"
        :modelo-inicial="idModeloSeleccionado"
        :bloquear-seleccion="Boolean(idMarcaSeleccionada && idModeloSeleccionado)"
        @vehiculo-creado="recargar"
      />
    </div>

  </section>
</template>

<style scoped>
.pagina {
  background: black;
  padding: 20px;
}

.filtros {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>