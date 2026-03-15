<script setup>

import NavigationMenu from "./components/NavigationMenu.vue"

</script>

<template>

<div class="layout">

<NavigationMenu />

<main class="content">

<RouterView />

</main>

</div>

</template>

<style>

body{
margin:0;
font-family:Arial, Helvetica, sans-serif;
}

.layout{
display:flex;
min-height:100vh;
}

.content{
flex:1;
padding:40px;
background:#000000;
}

</style>