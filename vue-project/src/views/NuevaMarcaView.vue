<script setup>
import { ref } from 'vue'
import { crearMarca } from '../stores/tiendaRenting'

const nombreMarca = ref('')
const anioFundacion = ref('')
const paisOrigen = ref('')
const mensajeUsuario = ref('')

function limpiarFormulario() {
  nombreMarca.value = ''
  anioFundacion.value = ''
  paisOrigen.value = ''
}

function guardarNuevaMarca() {
  if (!nombreMarca.value.trim() || !anioFundacion.value || !paisOrigen.value.trim()) {
    mensajeUsuario.value = 'Todos los campos son obligatorios.'
    return
  }

  const marcaCreada = crearMarca({
    nombre: nombreMarca.value,
    anioFundacion: anioFundacion.value,
    origen: paisOrigen.value
  })

  mensajeUsuario.value = `Marca registrada correctamente: ${marcaCreada.nombre}.`
  limpiarFormulario()
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

    <p v-if="mensajeUsuario" class="mensaje">
      {{ mensajeUsuario }}
    </p>
  </section>
</template>

<style scoped>
.pagina {
  background-color: white;
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