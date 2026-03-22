<script setup>
import { ref } from 'vue'
import { marcasOrdenadasPorNombre, crearModelo } from '../stores/tiendaRenting'

const idMarca = ref('')
const nombreModelo = ref('')
const extraPorModelo = ref('')
const mensajeUsuario = ref('')

function limpiarFormulario() {
  idMarca.value = ''
  nombreModelo.value = ''
  extraPorModelo.value = ''
}

function guardarNuevoModelo() {
  if (!idMarca.value || !nombreModelo.value.trim()) {
    mensajeUsuario.value = 'La marca y el nombre del modelo son obligatorios.'
    return
  }

  const modeloCreado = crearModelo({
    idMarca: idMarca.value,
    modelo: nombreModelo.value,
    extraPorModelo: extraPorModelo.value
  })

  mensajeUsuario.value = `Modelo registrado correctamente: ${modeloCreado.modelo}.`
  limpiarFormulario()
}
</script>

<template>
  <section class="pagina">
    <h2>Nuevo Modelo</h2>

    <form class="formulario" @submit.prevent="guardarNuevoModelo">
      <div class="grupo-campo">
        <label for="marcaModelo">Marca</label>
        <select id="marcaModelo" v-model="idMarca">
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
        <label for="nombreModelo">Nombre del modelo</label>
        <input id="nombreModelo" v-model="nombreModelo" type="text" />
      </div>

      <div class="grupo-campo">
        <label for="extraPorModelo">Precio extra</label>
        <input id="extraPorModelo" v-model="extraPorModelo" type="number" min="0" />
      </div>

      <div class="acciones">
        <button type="submit">Guardar modelo</button>
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

.grupo-campo input,
.grupo-campo select {
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