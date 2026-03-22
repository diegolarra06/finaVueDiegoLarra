<script setup>
import { computed, onMounted, ref } from 'vue'
import { obtenerMarcas, obtenerModelos, obtenerVehiculos } from '../services/api'

const marcas = ref([])
const modelos = ref([])
const vehiculos = ref([])
const idMarcaActiva = ref('')
const cargando = ref(true)
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

function calcularPrecioMedioMarca(idMarca) {
  const modelosDeLaMarca = modelos.value.filter(
    (modelo) => modelo.idMarca === idMarca
  )

  if (modelosDeLaMarca.length === 0) {
    return 0
  }

  const sumaMedias = modelosDeLaMarca.reduce(
    (acumulado, modelo) => acumulado + calcularPrecioMedioModelo(modelo.id),
    0
  )

  return sumaMedias / modelosDeLaMarca.length
}

const marcasOrdenadas = computed(() => {
  return [...marcas.value].sort(
    (marcaA, marcaB) =>
      calcularPrecioMedioMarca(marcaB.id) - calcularPrecioMedioMarca(marcaA.id)
  )
})

const modelosEnStockDeMarca = computed(() => {
  if (!idMarcaActiva.value) {
    return []
  }

  const modelosDeLaMarca = modelos.value.filter(
    (modelo) => modelo.idMarca === idMarcaActiva.value
  )

  return modelosDeLaMarca.filter((modelo) =>
    vehiculos.value.some((vehiculo) => vehiculo.idModelo === modelo.id)
  )
})

function seleccionarMarca(idMarca) {
  idMarcaActiva.value = idMarca
}

async function cargarDatos() {
  try {
    cargando.value = true
    error.value = ''

    const [datosMarcas, datosModelos, datosVehiculos] = await Promise.all([
      obtenerMarcas(),
      obtenerModelos(),
      obtenerVehiculos()
    ])

    marcas.value = datosMarcas
    modelos.value = datosModelos
    vehiculos.value = datosVehiculos
  } catch {
    error.value = 'No se han podido cargar las marcas.'
  } finally {
    cargando.value = false
  }
}

onMounted(cargarDatos)
</script>

<template>
  <section class="pagina">
    <h2>Marcas</h2>

    <p v-if="cargando">Cargando datos...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else class="contenedor-marcas">
      <div class="columna">
        <h3>Listado de marcas</h3>
        <ul class="lista">
          <li
            v-for="marca in marcasOrdenadas"
            :key="marca.id"
            class="elemento-lista"
          >
            <button type="button" @click="seleccionarMarca(marca.id)">
              {{ marca.nombre }} -
              {{ calcularPrecioMedioMarca(marca.id).toFixed(2) }} €/día
            </button>
          </li>
        </ul>
      </div>

      <div class="columna">
        <h3>Modelos en stock</h3>
        <p v-if="!idMarcaActiva">Selecciona una marca.</p>

        <ul v-else class="lista">
          <li v-for="modelo in modelosEnStockDeMarca" :key="modelo.id">
            {{ modelo.modelo }} -
            {{ calcularPrecioMedioModelo(modelo.id).toFixed(2) }} €/día
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pagina {
  background-color: white;
  padding: 24px;
  border-radius: 8px;
}

.contenedor-marcas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.columna {
  min-height: 250px;
}

.lista {
  padding-left: 18px;
}

.elemento-lista button {
  cursor: pointer;
}
</style>