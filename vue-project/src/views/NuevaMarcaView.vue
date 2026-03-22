<script setup>
import { ref } from 'vue'
import { crearMarca } from '../services/api'

const nombreMarca = ref('')
const anioFundacion = ref('')
const paisOrigen = ref('')
const mensaje = ref('')
const error = ref('')

function limpiarFormulario() {
  nombreMarca.value = ''
  anioFundacion.value = ''
  paisOrigen.value = ''
}

async function guardarNuevaMarca() {
  mensaje.value = ''
  error.value = ''

  if (!nombreMarca.value.trim() || !anioFundacion.value || !paisOrigen.value.trim()) {
    error.value = 'Todos los campos son obligatorios.'
    return
  }

  try {
    const marcaGuardada = await crearMarca({
      nombre: nombreMarca.value.trim(),
      anioFundacion: Number(anioFundacion.value),
      origen: paisOrigen.value.trim()
    })

    mensaje.value = `Marca creada: ${marcaGuardada.nombre}.`
    limpiarFormulario()
  } catch (e) {
    error.value = 'No se ha podido guardar la marca.'
  }
}
</script>

<template>
  <section class="pagina">
    <h2>Nueva Marca</h2>

    <form class="formulario" @submit.prevent="guardarNuevaMarca">
      <label>
        Nombre
        <input v-model="nombreMarca" type="text" />
      </label>

      <label>
        Año de fundación
        <input v-model="anioFundacion" type="number" min="1800" />
      </label>

      <label>
        País de origen
        <input v-model="paisOrigen" type="text" />
      </label>

      <div class="acciones">
        <button type="submit">Guardar marca</button>
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