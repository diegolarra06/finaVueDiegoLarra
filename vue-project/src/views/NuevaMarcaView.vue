<script setup>
import { ref } from 'vue'
import { crearMarca } from '../stores/tiendaRenting'

const nombreMarca = ref('')
const anioFundacion = ref('')
const paisOrigen = ref('')
const mensaje = ref('')
const error = ref('')

function guardarMarca() {

  error.value = ''
  mensaje.value = ''

  if (!nombreMarca.value.trim()) {
    error.value = 'El nombre es obligatorio'
    return
  }

  if (!anioFundacion.value) {
    error.value = 'El año es obligatorio'
    return
  }

  if (!paisOrigen.value.trim()) {
    error.value = 'El país es obligatorio'
    return
  }

  const marcaCreada = crearMarca({
    nombre: nombreMarca.value,
    anioFundacion: anioFundacion.value,
    origen: paisOrigen.value
  })

  mensaje.value = `Marca "${marcaCreada.nombre}" creada correctamente`

  limpiarFormulario()
}

function limpiarFormulario() {
  nombreMarca.value = ''
  anioFundacion.value = ''
  paisOrigen.value = ''
}
</script>

<template>
  <section class="pagina">
    <h2>Nueva Marca</h2>

    <form class="formulario" @submit.prevent="guardarNuevaMarca">
      <div class="grupo-campo">
        <label for="nombreMarca">Nombre</label>
        <input id="nombreMarca" v-model="nombreMarca" type="text" />
      </div>

      <div class="grupo-campo">
        <label for="anioFundacion">Año de fundación</label>
        <input id="anioFundacion" v-model="anioFundacion" type="number" min="1800" />
      </div>

      <div class="grupo-campo">
        <label for="paisOrigen">País de origen</label>
        <input id="paisOrigen" v-model="paisOrigen" type="text" />
      </div>

      <div class="acciones">
        <button type="submit">Guardar marca</button>
        <button type="button" class="secundario" @click="limpiarFormulario">
          Limpiar
        </button>
      </div>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>
    <p v-if="mensaje" style="color:green">{{ mensaje }}</p>
  </section>
</template>

<style scoped>
.pagina {
  background-color: black;
  padding: 24px;
  border-radius: 8px;
}

.formulario {
  max-width: 420px;
}

.grupo-campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.grupo-campo input {
  padding: 8px;
}

.acciones {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  background-color: #243447;
  color: white;
  cursor: pointer;
}

.secundario {
  background-color: #7f8c8d;
}

.mensaje {
  margin-top: 14px;
  color: #1f6f4a;
}
</style>