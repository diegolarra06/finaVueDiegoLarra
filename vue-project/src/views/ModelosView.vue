<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  actualizarModeloAPI,
  obtenerMarcas,
  obtenerModelos,
  obtenerVehiculos
} from '../services/api'

const marcas = ref([])
const modelos = ref([])
const vehiculos = ref([])
const idMarcaSeleccionada = ref('')
const extrasTemporales = ref({})
const mensaje = ref('')
const error = ref('')

function calcularPrecioMedioModelo(idModelo) {
  const vehiculosDelModelo = vehiculos.value.filter(
    (vehiculo) => vehiculo.idModelo === idModelo
  )

  if (vehiculosDelModelo.length === 0) {
    return 0
  }

  const sumaPrecios = vehiculosDelModelo.reduce(
    (acumulado, vehiculo) => acumulado + Number(vehiculo.precioDia),
    0
  )

  return sumaPrecios / vehiculosDelModelo.length
}

const modelosDeMarca = computed(() => {
  if (!idMarcaSeleccionada.value) {
    return []
  }

  return modelos.value.filter(
    (modelo) => modelo.idMarca === idMarcaSeleccionada.value
  )
})

async function guardarExtra(idModelo) {
  error.value = ''
  mensaje.value = ''

  const nuevoExtra = extrasTemporales.value[idModelo]

  if (nuevoExtra === '' || nuevoExtra === undefined) {
    error.value = 'Introduce un precio extra.'
    return
  }

  try {
    await actualizarModeloAPI(idModelo, {
      extraPorModelo: Number(nuevoExtra)
    })

    await cargarDatos()
    mensaje.value = 'Extra actualizado correctamente.'
  } catch {
    error.value = 'No se pudo actualizar el extra.'
  }
}

async function cargarDatos() {
  const [datosMarcas, datosModelos, datosVehiculos] = await Promise.all([
    obtenerMarcas(),
    obtenerModelos(),
    obtenerVehiculos()
  ])

  marcas.value = datosMarcas
  modelos.value = datosModelos
  vehiculos.value = datosVehiculos
}

onMounted(cargarDatos)
</script>

<template>
  <section class="pagina">
    <h2>Modelos</h2>

    <div class="selector-centro">
      <select v-model="idMarcaSeleccionada">
        <option value="">Selecciona una marca</option>
        <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
          {{ marca.nombre }}
        </option>
      </select>
    </div>

    <p v-if="error">{{ error }}</p>
    <p v-if="mensaje">{{ mensaje }}</p>

    <ul v-if="modelosDeMarca.length" class="lista">
      <li v-for="modelo in modelosDeMarca" :key="modelo.id">
        <strong>{{ modelo.modelo }}</strong>
        -
        {{ calcularPrecioMedioModelo(modelo.id).toFixed(2) }} €/día
        -
        <template v-if="Number(modelo.extraPorModelo) > 0">
          {{ modelo.extraPorModelo }} €
        </template>
        <template v-else>
          <input
            v-model="extrasTemporales[modelo.id]"
            type="number"
            min="0"
            placeholder="Extra"
          />
          <button type="button" @click="guardarExtra(modelo.id)">
            Guardar extra
          </button>
        </template>
      </li>
    </ul>

    <p v-else>Selecciona una marca para ver sus modelos.</p>
  </section>
</template>

<style scoped>
.pagina {
  background-color: white;
  padding: 24px;
  border-radius: 8px;
}

.selector-centro {
  text-align: center;
  margin-bottom: 20px;
}

.lista {
  padding-left: 18px;
}
</style>