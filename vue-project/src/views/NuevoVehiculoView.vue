<script setup>
import { useRoute } from "vue-router";
import NuevoVehiculo from "../components/NuevoVehiculo.vue";

const route = useRoute();

const marcaInicial = route.query.marca ? String(route.query.marca) : "";
const modeloInicial = route.query.modelo ? String(route.query.modelo) : "";
const bloquearSeleccion = Boolean(marcaInicial && modeloInicial);
</script>

<template>
  <section class="pagina">
    <h2>Nuevo Vehículo</h2>

    <NuevoVehiculo
      :marca-inicial="marcaInicial"
      :modelo-inicial="modeloInicial"
      :bloquear-seleccion="bloquearSeleccion"
    />
  </section>
</template>

<style scoped>
.pagina {
  background-color: black;
  padding: 24px;
  border-radius: 8px;
}
</style>
