<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  obtenerMarcas,
  obtenerModelos,
  obtenerVehiculos
} from '../services/api'

const marcas = ref([])
const modelos = ref([])
const vehiculos = ref([])

const idMarcaSeleccionada = ref('')
const error = ref('')

function calcularPrecioMedioModelo(idModelo) {
  const lista = vehiculos.value.filter(
    (v) => String(v.idModelo) === String(idModelo)
  )

  if (lista.length === 0) return 0

  const suma = lista.reduce((acc, v) => acc + Number(v.precioDia), 0)

  return suma / lista.length
}

function calcularPrecioMedioMarca(idMarca) {
  const modelosMarca = modelos.value.filter(
    (m) => String(m.idMarca) === String(idMarca)
  )

  if (modelosMarca.length === 0) return 0

  const total = modelosMarca.reduce((acc, modelo) => {
    return acc + calcularPrecioMedioModelo(modelo.id)
  }, 0)

  return total / modelosMarca.length
}

function obtenerNombreModelo(idModelo) {
  const modelo = modelos.value.find(
    (m) => String(m.id) === String(idModelo)
  )
  return modelo ? modelo.modelo : ''
}

async function cargarDatos() {
  try {
    const [m, mo, v] = await Promise.all([
      obtenerMarcas(),
      obtenerModelos(),
      obtenerVehiculos()
    ])

    marcas.value = m
    modelos.value = mo
    vehiculos.value = v
  } catch {
    error.value = 'Error al cargar marcas'
  }
}

const marcasOrdenadas = computed(() => {
  return [...marcas.value]
    .map((marca) => ({
      ...marca,
      precioMedio: calcularPrecioMedioMarca(marca.id)
    }))
    .sort((a, b) => b.precioMedio - a.precioMedio)
})

const vehiculosMarca = computed(() => {
  if (!idMarcaSeleccionada.value) return []

  const modelosMarca = modelos.value
    .filter((m) => String(m.idMarca) === String(idMarcaSeleccionada.value))
    .map((m) => String(m.id))

  return vehiculos.value.filter((v) =>
    modelosMarca.includes(String(v.idModelo))
  )
})
function seleccionarMarca(id) {
  idMarcaSeleccionada.value = id
}

onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <section class="pagina">
    <h2>Marcas</h2>

    <p v-if="error">{{ error }}</p>

    <div class="layout">

      <ul>
        <li
          v-for="m in marcasOrdenadas"
          :key="m.id"
          @click="seleccionarMarca(m.id)"
        >
          {{ m.nombre }} - {{ m.precioMedio.toFixed(2) }} €/día
        </li>
      </ul>

      <div>
        <h3>Vehículos</h3>

        <ul>
          <li v-for="v in vehiculosMarca" :key="v.id">
            {{ obtenerNombreModelo(v.idModelo) }} - {{ v.precioDia }} €/día
          </li>
        </ul>

      </div>

    </div>
  </section>
</template>

<style scoped>
.pagina {
  background: black;
  padding: 20px;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>