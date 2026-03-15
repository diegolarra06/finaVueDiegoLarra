<template>

<section class="form-container">

<h2>Registrar nuevo modelo</h2>

<form @submit.prevent="createModel">

<input
v-model="modelName"
placeholder="Nombre del modelo"
required
/>

<input
v-model="extraPrice"
type="number"
placeholder="Precio extra (opcional)"
/>

<button type="submit">
Guardar Modelo
</button>

</form>

</section>

</template>

<script setup>

import { ref } from "vue"

const modelName = ref("")
const extraPrice = ref("")

const createModel = () => {

const newModel = {

modelo: modelName.value,
extraPorModelo: extraPrice.value || 0

}

console.log("Nuevo modelo:", newModel)

resetForm()

}

const resetForm = () => {

modelName.value = ""
extraPrice.value = ""

}

</script>

<style scoped>

.form-container{
padding:20px;
}

form{
display:flex;
flex-direction:column;
gap:10px;
width:300px;
}

input{
padding:8px;
}

button{
padding:8px;
background:#2c3e50;
color:white;
border:none;
cursor:pointer;
}

</style>