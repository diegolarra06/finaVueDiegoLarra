<template>

<section class="form-container">

<h2>Registrar una nueva marca</h2>

<form @submit.prevent="createBrand">

<input
v-model="brandName"
placeholder="Nombre de la marca"
required
/>

<input
v-model="foundationYear"
type="number"
placeholder="Año de fundación"
required
/>

<input
v-model="originCountry"
placeholder="País de origen"
required
/>

<button type="submit">
Guardar Marca
</button>

</form>

</section>

</template>

<script setup>

import { ref } from "vue"

const brandName = ref("")
const foundationYear = ref("")
const originCountry = ref("")

const createBrand = () => {

const newBrand = {

nombre: brandName.value,
anioFundacion: foundationYear.value,
origen: originCountry.value

}

console.log("Nueva marca:", newBrand)

resetForm()

}

const resetForm = () => {

brandName.value = ""
foundationYear.value = ""
originCountry.value = ""

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