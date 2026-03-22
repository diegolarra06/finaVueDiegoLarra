<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  obtenerMarcas,
  obtenerModelos,
  obtenerVehiculos,
  actualizarModelo
} from '../services/api'

const marcas = ref([])
const modelos = ref([])
const vehiculos = ref([])

const idMarcaSeleccionada = ref('')
const extras = ref({})
const mensaje = ref('')
const error = ref('')

function calcularPrecioMedioModelo(idModelo) {
  const lista = vehiculos.value.filter(
    (v) => String(v.idModelo) === String(idModelo)
  )

  if (lista.length === 0) return 0

  const suma = lista.reduce(
    (acc, v) => acc + Number(v.precioDia),
    0
  )

  return suma / lista.length
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
    error.value = 'Error al cargar modelos'
  }
}

const modelosFiltrados = computed(() => {
  if (!idMarcaSeleccionada.value) return []

  return modelos.value
    .filter((m) => String(m.idMarca) === String(idMarcaSeleccionada.value))
    .map((m) => ({
      ...m,
      precioMedio: calcularPrecioMedioModelo(m.id)
    }))
})
async function guardarExtra(modelo) {
  mensaje.value = ''
  error.value = ''

  const nuevoExtra = extras.value[modelo.id]

  if (nuevoExtra === '' || nuevoExtra < 0) {
    error.value = 'Extra inválido'
    return
  }

  try {
    await actualizarModelo(modelo.id, {
      extraPorModelo: Number(nuevoExtra)
    })

    mensaje.value = 'Extra actualizado'
    await cargarDatos()
  } catch {
    error.value = 'Error al actualizar'
  }
}

onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <section class="pagina">
    <h2>Modelos</h2>

    <select v-model="idMarcaSeleccionada">
      <option value="">Selecciona marca</option>
      <option v-for="m in marcas" :key="m.id" :value="m.id">
        {{ m.nombre }}
      </option>
    </select>

    <ul v-if="modelosFiltrados.length">
      <li v-for="m in modelosFiltrados" :key="m.id">

        <template v-if="m.extraPorModelo > 0">
          {{ m.modelo }} - {{ m.precioMedio.toFixed(2) }} €/día - {{ m.extraPorModelo }} €
        </template>

        <template v-else>
          {{ m.modelo }} - {{ m.precioMedio.toFixed(2) }} €/día

          <input v-model="extras[m.id]" type="number" placeholder="Extra" />

          <button @click="guardarExtra(m)">
            Guardar
          </button>
        </template>

      </li>
    </ul>

    <p v-else>Selecciona una marca</p>

    <p v-if="mensaje">{{ mensaje }}</p>
    <p v-if="error">{{ error }}</p>
  </section>
</template>

<style scoped>
.pagina {
  background: black;
  padding: 20px;
}
</style>