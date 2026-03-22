<script setup>
import { computed, ref, watch } from 'vue'
import {
  marcasOrdenadasPorNombre,
  modelos,
  crearVehiculo
} from '../stores/tiendaRenting'

const props = defineProps({
  marcaPreseleccionada: {
    type: String,
    default: ''
  },
  modeloPreseleccionado: {
    type: String,
    default: ''
  },
  bloquearSeleccion: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['vehiculo-creado'])

const idMarcaSeleccionada = ref(props.marcaPreseleccionada)
const idModeloSeleccionado = ref(props.modeloPreseleccionado)
const precioDia = ref('')
const puertas = ref(5)
const sillaInfantil = ref(false)
const mensajeConfirmacion = ref('')

const modelosDisponibles = computed(() => {
  if (!idMarcaSeleccionada.value) {
    return []
  }

  return modelos.value.filter(
    (modeloActual) => modeloActual.idMarca === idMarcaSeleccionada.value
  )
})

watch(idMarcaSeleccionada, () => {
  if (!props.bloquearSeleccion) {
    idModeloSeleccionado.value = ''
  }
})

function guardarVehiculo() {
  if (!idMarcaSeleccionada.value || !idModeloSeleccionado.value || !precioDia.value || !puertas.value) {
    mensajeConfirmacion.value = 'Completa todos los campos obligatorios.'
    return
  }

  const vehiculoCreado = crearVehiculo({
    idModelo: idModeloSeleccionado.value,
    precioDia: precioDia.value,
    puertas: puertas.value,
    sillaInfantil: sillaInfantil.value
  })

  mensajeConfirmacion.value = `Vehículo creado con id ${vehiculoCreado.id}.`
  emit('vehiculo-creado', vehiculoCreado)

  if (!props.bloquearSeleccion) {
    idMarcaSeleccionada.value = ''
    idModeloSeleccionado.value = ''
  }

  precioDia.value = ''
  puertas.value = 5
  sillaInfantil.value = false
}
</script>

<template>
  <section class="bloque-formulario">
    <h3>Nuevo Vehículo</h3>

    <div class="grupo-campo">
      <label for="marca">Marca</label>
      <select
        id="marca"
        v-model="idMarcaSeleccionada"
        :disabled="bloquearSeleccion"
      >
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

    <div class="grupo-campo">
      <label for="modelo">Modelo</label>
      <select
        id="modelo"
        v-model="idModeloSeleccionado"
        :disabled="bloquearSeleccion || !idMarcaSeleccionada"
      >
        <option value="">Selecciona un modelo</option>
        <option
          v-for="modelo in modelosDisponibles"
          :key="modelo.id"
          :value="modelo.id"
        >
          {{ modelo.modelo }}
        </option>
      </select>
    </div>

    <div class="grupo-campo">
      <label for="precioDia">Precio por día</label>
      <input
        id="precioDia"
        v-model="precioDia"
        type="number"
        min="1"
      />
    </div>

    <div class="grupo-campo">
      <label for="puertas">Puertas</label>
      <input
        id="puertas"
        v-model="puertas"
        type="number"
        min="2"
      />
    </div>

    <div class="grupo-checkbox">
      <input
        id="sillaInfantil"
        v-model="sillaInfantil"
        type="checkbox"
      />
      <label for="sillaInfantil">Incluye silla infantil</label>
    </div>

    <button type="button" @click="guardarVehiculo">
      Guardar vehículo
    </button>

    <p v-if="mensajeConfirmacion" class="mensaje">
      {{ mensajeConfirmacion }}
    </p>
  </section>
</template>

<style scoped>
.bloque-formulario {
  max-width: 420px;
  padding: 18px;
  background-color: white;
  border-radius: 8px;
}

.grupo-campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.grupo-campo input,
.grupo-campo select {
  padding: 8px;
}

.grupo-checkbox {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 14px;
}

button {
  padding: 10px 14px;
  border: none;
  background-color: #243447;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.mensaje {
  margin-top: 12px;
  color: #1f6f4a;
}
</style>