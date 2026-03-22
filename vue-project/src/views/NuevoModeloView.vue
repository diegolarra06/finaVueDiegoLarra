<script setup>
import { onMounted, ref } from 'vue'
import { crearModelo, obtenerMarcas } from '../services/api'

const marcas = ref([])
const idMarca = ref('')
const nombreModelo = ref('')
const extraPorModelo = ref('')
const mensaje = ref('')
const error = ref('')

async function cargarMarcas() {
  try {
    marcas.value = await obtenerMarcas()
  } catch (e) {
    error.value = 'No se han podido cargar las marcas.'
  }
}

function limpiarFormulario() {
  idMarca.value = ''
  nombreModelo.value = ''
  extraPorModelo.value = ''
}

async function guardarNuevoModelo() {
  mensaje.value = ''
  error.value = ''

  if (!idMarca.value || !nombreModelo.value.trim()) {
    error.value = 'La marca y el nombre del modelo son obligatorios.'
    return
  }

  try {
    const modeloGuardado = await crearModelo({
      idMarca: String(idMarca.value),
      modelo: nombreModelo.value.trim(),
      extraPorModelo: extraPorModelo.value === '' ? 0 : Number(extraPorModelo.value)
    })

    mensaje.value = `Modelo creado: ${modeloGuardado.modelo}.`
    limpiarFormulario()
  } catch (e) {
    error.value = 'No se ha podido guardar el modelo.'
  }
}

onMounted(() => {
  cargarMarcas()
})
</script>
<template>
  <section class="pagina">
    <h2>Nuevo Modelo</h2>

    <form class="formulario" @submit.prevent="guardarNuevoModelo">
      <label>
        Marca
        <select v-model="idMarca">
          <option value="">Selecciona una marca</option>
          <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
            {{ marca.nombre }}
          </option>
        </select>
      </label>

      <label>
        Nombre del modelo
        <input v-model="nombreModelo" type="text" />
      </label>

      <label>
        Extra por modelo
        <input v-model="extraPorModelo" type="number" min="0" />
      </label>

      <div class="acciones">
        <button type="submit">Guardar modelo</button>
        <button type="button" @click="limpiarFormulario">Limpiar</button>
      </div>
    </form>

    <p v-if="mensaje">{{ mensaje }}</p>
    <p v-if="error">{{ error }}</p>
  </section>
</template>

<style scoped>
.pagina {
  background-color: black;
  padding: 24px;
  border-radius: 8px;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 420px;
}
</style>