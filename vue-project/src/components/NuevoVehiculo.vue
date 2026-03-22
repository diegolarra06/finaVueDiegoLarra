<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { obtenerMarcas, obtenerModelos, crearVehiculo } from '../services/api'

const props = defineProps({
  marcaInicial: {
    type: String,
    default: ''
  },
  modeloInicial: {
    type: String,
    default: ''
  },
  bloquearSeleccion: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['vehiculo-creado'])

const marcas = ref([])
const modelos = ref([])
const idMarca = ref(props.marcaInicial)
const idModelo = ref(props.modeloInicial)
const precioDia = ref('')
const puertas = ref('')
const sillaInfantil = ref(false)
const mensaje = ref('')
const error = ref('')

async function cargarDatos() {
  try {
    const [datosMarcas, datosModelos] = await Promise.all([
      obtenerMarcas(),
      obtenerModelos()
    ])

    marcas.value = datosMarcas
    modelos.value = datosModelos
  } catch (e) {
    error.value = 'No se han podido cargar las opciones del formulario.'
  }
}

const modelosDeLaMarca = computed(() => {
  if (!idMarca.value) {
    return []
  }

  return modelos.value.filter(
    (modelo) => String(modelo.idMarca) === String(idMarca.value)
  )
})

watch(idMarca, () => {
  if (!props.bloquearSeleccion) {
    idModelo.value = ''
  }
})

function limpiarFormulario() {
  if (!props.bloquearSeleccion) {
    idMarca.value = ''
    idModelo.value = ''
  }

  precioDia.value = ''
  puertas.value = ''
  sillaInfantil.value = false
}

async function guardarVehiculo() {
  mensaje.value = ''
  error.value = ''

  if (!idMarca.value || !idModelo.value || !precioDia.value || !puertas.value) {
    error.value = 'Completa todos los campos obligatorios.'
    return
  }

  try {
    const vehiculoGuardado = await crearVehiculo({
      idModelo: String(idModelo.value),
      precioDia: Number(precioDia.value),
      puertas: Number(puertas.value),
      sillaInfantil: Boolean(sillaInfantil.value)
    })

    mensaje.value = `Vehículo creado con id ${vehiculoGuardado.id}.`
    limpiarFormulario()
    emit('vehiculo-creado')
  } catch (e) {
    error.value = 'No se ha podido guardar el vehículo.'
  }
}

onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <section class="bloque-formulario">
    <h3>Nuevo Vehículo</h3>

    <label>
      Marca
      <select v-model="idMarca" :disabled="bloquearSeleccion">
        <option value="">Selecciona una marca</option>
        <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
          {{ marca.nombre }}
        </option>
      </select>
    </label>

    <label>
      Modelo
      <select
        v-model="idModelo"
        :disabled="bloquearSeleccion || !idMarca"
      >
        <option value="">Selecciona un modelo</option>
        <option v-for="modelo in modelosDeLaMarca" :key="modelo.id" :value="modelo.id">
          {{ modelo.modelo }}
        </option>
      </select>
    </label>

    <label>
      Precio por día
      <input v-model="precioDia" type="number" min="1" />
    </label>

    <label>
      Puertas
      <input v-model="puertas" type="number" min="2" />
    </label>

    <label>
      <input v-model="sillaInfantil" type="checkbox" />
      Silla infantil
    </label>

    <button type="button" @click="guardarVehiculo">Guardar vehículo</button>

    <p v-if="mensaje">{{ mensaje }}</p>
    <p v-if="error">{{ error }}</p>
  </section>
</template>

<style scoped>
.bloque-formulario {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 420px;
}
</style>