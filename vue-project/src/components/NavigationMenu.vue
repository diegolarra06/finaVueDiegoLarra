<script setup>

import { RouterLink } from "vue-router"

</script>

<template>

<aside class="sidebar">

<h2 class="title">
RentingApp
</h2>

<nav class="menu">

<RouterLink to="/" class="menu-item">
Inicio
</RouterLink>

<RouterLink to="/marcas" class="menu-item">
Marcas
</RouterLink>

<RouterLink to="/nueva-marca" class="menu-item">
Nueva Marca
</RouterLink>

<RouterLink to="/modelos" class="menu-item">
Modelos
</RouterLink>

<RouterLink to="/nuevo-modelo" class="menu-item">
Nuevo Modelo
</RouterLink>

<RouterLink to="/vehiculos" class="menu-item">
Vehículos
</RouterLink>

<RouterLink to="/nuevo-vehiculo" class="menu-item">
Nuevo Vehículo
</RouterLink>

<RouterLink to="/clientes" class="menu-item">
Clientes
</RouterLink>

<RouterLink to="/alquiler" class="menu-item">
Alquiler
</RouterLink>

</nav>

</aside>

</template>

<style scoped>

.sidebar{
width:220px;
background:#2c3e50;
color:white;
min-height:100vh;
padding:20px;
}

.title{
text-align:center;
margin-bottom:30px;
}

.menu{
display:flex;
flex-direction:column;
gap:12px;
}

.menu-item{
color:white;
text-decoration:none;
padding:10px;
border-radius:6px;
transition:0.2s;
}

.menu-item:hover{
background:#34495e;
}

.router-link-exact-active{
background:#1abc9c;
}

</style>