<script setup>
import { computed, onMounted, ref, watch } from "vue";
import {
  actualizarCliente,
  crearCliente,
  eliminarCliente,
  obtenerClientes,
  obtenerMarcas,
  obtenerModelos,
  obtenerVehiculos,
} from "../services/api";

const clientes = ref([]);
const marcas = ref([]);
const modelos = ref([]);
const vehiculos = ref([]);

const idClienteSeleccionado = ref("");
const nombreCliente = ref("");
const dniCliente = ref("");
const mensaje = ref("");
const error = ref("");

async function cargarDatos() {
  try {
    error.value = "";

    const [datosClientes, datosMarcas, datosModelos, datosVehiculos] =
      await Promise.all([
        obtenerClientes(),
        obtenerMarcas(),
        obtenerModelos(),
        obtenerVehiculos(),
      ]);

    clientes.value = datosClientes;
    marcas.value = datosMarcas;
    modelos.value = datosModelos;
    vehiculos.value = datosVehiculos;
  } catch (e) {
    error.value = "No se han podido cargar los clientes.";
  }
}

function obtenerNombreMarca(idMarca) {
  const marca = marcas.value.find((m) => String(m.id) === String(idMarca));
  return marca ? marca.nombre : "";
}

function obtenerNombreModelo(idModelo) {
  const modelo = modelos.value.find((m) => String(m.id) === String(idModelo));
  return modelo ? modelo.modelo : "";
}

function calcularPrecioTotal(vehiculo, modelo, dias) {
  const extra = Number(modelo.extraPorModelo || 0);
  return Number(vehiculo.precioDia) * Number(dias) + extra;
}

const clienteSeleccionado = computed(() => {
  return (
    clientes.value.find(
      (cliente) => String(cliente.id) === String(idClienteSeleccionado.value),
    ) || null
  );
});

const historialCliente = computed(() => {
  if (!clienteSeleccionado.value) return [];

  return (clienteSeleccionado.value.alquileres || [])
    .map((alquiler, index) => {
      const vehiculo = vehiculos.value.find(
        (v) => String(v.id) === String(alquiler.idVehiculo),
      );

      if (!vehiculo) return null;

      const modelo = modelos.value.find(
        (m) => String(m.id) === String(vehiculo.idModelo),
      );

      if (!modelo) return null;

      return {
        id: index,
        marca: obtenerNombreMarca(modelo.idMarca),
        modelo: obtenerNombreModelo(modelo.id),
        total: calcularPrecioTotal(vehiculo, modelo, alquiler.numDias),
      };
    })
    .filter(Boolean);
});

watch(clienteSeleccionado, (nuevo) => {
  if (nuevo) {
    nombreCliente.value = nuevo.nombre;
    dniCliente.value = nuevo.dni;
  } else {
    nombreCliente.value = "";
    dniCliente.value = "";
  }
});

function limpiarFormulario() {
  idClienteSeleccionado.value = "";
  nombreCliente.value = "";
  dniCliente.value = "";
}
async function altaCliente() {
  mensaje.value = "";
  error.value = "";

  if (!nombreCliente.value.trim() || !dniCliente.value.trim()) {
    error.value = "Nombre y DNI obligatorios";
    return;
  }

  try {
    await crearCliente({
      nombre: nombreCliente.value,
      dni: dniCliente.value,
      alquileres: [],
    });

    mensaje.value = "Cliente creado";
    limpiarFormulario();
    await cargarDatos();
  } catch {
    error.value = "Error al crear cliente";
  }
}

async function modificarCliente() {
  if (!clienteSeleccionado.value) return;

  try {
    await actualizarCliente(clienteSeleccionado.value.id, {
      ...clienteSeleccionado.value,
      nombre: nombreCliente.value,
      dni: dniCliente.value,
    });

    mensaje.value = "Cliente actualizado";
    limpiarFormulario();
    await cargarDatos();
  } catch {
    error.value = "Error al modificar";
  }
}

async function borrarCliente() {
  if (!clienteSeleccionado.value) return;

  try {
    await eliminarCliente(clienteSeleccionado.value.id);

    mensaje.value = "Cliente eliminado";
    limpiarFormulario();
    await cargarDatos();
  } catch {
    error.value = "Error al eliminar";
  }
}

onMounted(() => {
  cargarDatos();
});
</script>

<template>
  <section class="pagina">
    <h2>Clientes</h2>
    <div class="layout">
      <ul>
        <li
          v-for="c in clientes"
          :key="c.id"
          @click="idClienteSeleccionado = c.id"
        >
          {{ c.nombre }} - {{ c.dni }}
        </li>
      </ul>
      <div>
        <h3>Historial</h3>
        <ul>
          <li v-for="h in historialCliente" :key="h.id">
            {{ h.marca }} - {{ h.modelo }} - {{ h.total }} €
          </li>
        </ul>
        <div class="form">
          <input v-model="nombreCliente" placeholder="Nombre" />
          <input v-model="dniCliente" placeholder="DNI" />
          <button @click="altaCliente" :disabled="idClienteSeleccionado">
            Alta
          </button>
          <button @click="modificarCliente" :disabled="!idClienteSeleccionado">
            Modificar
          </button>
          <button @click="borrarCliente" :disabled="!idClienteSeleccionado">
            Eliminar
          </button>
        </div>
      </div>
    </div>
    <p v-if="mensaje">{{ mensaje }}</p>
    <p v-if="error">{{ error }}</p>
  </section>
</template>

<style scoped>
.pagina {
  background: black;
  padding: 20px;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
