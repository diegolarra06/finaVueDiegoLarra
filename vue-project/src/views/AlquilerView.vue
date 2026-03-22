<script setup>
import { computed, onMounted, ref } from "vue";
import {
  actualizarCliente,
  obtenerClientes,
  obtenerMarcas,
  obtenerModelos,
  obtenerVehiculos,
} from "../services/api";

const marcas = ref([]);
const modelos = ref([]);
const vehiculos = ref([]);
const clientes = ref([]);

const idMarcaSeleccionada = ref("");
const idModeloSeleccionado = ref("");
const mostrarFormulario = ref(false);

const idVehiculo = ref("");
const idCliente = ref("");
const dias = ref("");
const fecha = ref("");

const mensaje = ref("");
const error = ref("");
const resumen = ref(null);

async function cargarDatos() {
  try {
    const [m, mo, v, c] = await Promise.all([
      obtenerMarcas(),
      obtenerModelos(),
      obtenerVehiculos(),
      obtenerClientes(),
    ]);

    marcas.value = m;
    modelos.value = mo;
    vehiculos.value = v;
    clientes.value = c;
  } catch {
    error.value = "Error al cargar datos";
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

const modelosDisponibles = computed(() => {
  if (!idMarcaSeleccionada.value) return [];

  return modelos.value.filter(
    (m) => String(m.idMarca) === String(idMarcaSeleccionada.value),
  );
});

const vehiculosDisponibles = computed(() => {
  if (!idModeloSeleccionado.value) return [];

  return vehiculos.value.filter(
    (v) => String(v.idModelo) === String(idModeloSeleccionado.value),
  );
});

const botonDeshabilitado = computed(() => {
  return !idMarcaSeleccionada.value || !idModeloSeleccionado.value;
});

function mostrarZona() {
  mostrarFormulario.value = true;
  mensaje.value = "";
  error.value = "";
  resumen.value = null;
}

async function alquilar() {
  mensaje.value = "";
  error.value = "";
  resumen.value = null;

  if (!idVehiculo.value || !idCliente.value || !dias.value || !fecha.value) {
    error.value = "Todos los campos son obligatorios";
    return;
  }

  const vehiculo = vehiculos.value.find(
    (v) => String(v.id) === String(idVehiculo.value),
  );

  const cliente = clientes.value.find(
    (c) => String(c.id) === String(idCliente.value),
  );

  const modelo = modelos.value.find(
    (m) => String(m.id) === String(idModeloSeleccionado.value),
  );

  if (!vehiculo || !cliente || !modelo) {
    error.value = "Datos incorrectos";
    return;
  }

  const nuevosAlquileres = [
    ...(cliente.alquileres || []),
    {
      idVehiculo: String(idVehiculo.value),
      numDias: Number(dias.value),
      fechaInic: fecha.value,
    },
  ];

  try {
    await actualizarCliente(cliente.id, {
      ...cliente,
      alquileres: nuevosAlquileres,
    });

    const total = calcularPrecioTotal(vehiculo, modelo, dias.value);

    resumen.value = {
      marca: obtenerNombreMarca(idMarcaSeleccionada.value),
      modelo: obtenerNombreModelo(idModeloSeleccionado.value),
      cliente: cliente.nombre,
      dni: cliente.dni,
      total,
    };

    mensaje.value = "Alquiler realizado correctamente";

    await cargarDatos();

    idVehiculo.value = "";
    idCliente.value = "";
    dias.value = "";
    fecha.value = "";
  } catch {
    error.value = "Error al guardar alquiler";
  }
}

onMounted(() => {
  cargarDatos();
});
</script>

<template>
  <section class="pagina">
    <h2>Alquiler</h2>

    <!-- FILTROS -->
    <div class="filtros">
      <select v-model="idMarcaSeleccionada">
        <option value="">Marca</option>
        <option v-for="m in marcas" :key="m.id" :value="m.id">
          {{ m.nombre }}
        </option>
      </select>

      <select v-model="idModeloSeleccionado" :disabled="!idMarcaSeleccionada">
        <option value="">Modelo</option>
        <option v-for="m in modelosDisponibles" :key="m.id" :value="m.id">
          {{ m.modelo }}
        </option>
      </select>

      <button :disabled="botonDeshabilitado" @click="mostrarZona">
        Mostrar
      </button>
    </div>

    <!-- FORM -->
    <div v-if="mostrarFormulario" class="form">
      <select v-model="idVehiculo">
        <option value="">Vehículo</option>
        <option v-for="v in vehiculosDisponibles" :key="v.id" :value="v.id">
          {{ v.id }} - {{ v.precioDia }}€/día
        </option>
      </select>

      <select v-model="idCliente">
        <option value="">Cliente</option>
        <option v-for="c in clientes" :key="c.id" :value="c.id">
          {{ c.nombre }}
        </option>
      </select>

      <input v-model="dias" type="number" placeholder="Días" />
      <input v-model="fecha" type="date" />

      <button @click="alquilar">Alquilar</button>
    </div>

    <p v-if="mensaje">{{ mensaje }}</p>
    <p v-if="error">{{ error }}</p>
    <div v-if="resumen">
      <h3>Resumen</h3>
      <p>{{ resumen.marca }} - {{ resumen.modelo }}</p>
      <p>{{ resumen.cliente }} - {{ resumen.dni }}</p>
      <p>Total: {{ resumen.total }} €</p>
    </div>
  </section>
</template>

<style scoped>
.pagina {
  background: white;
  padding: 20px;
}

.filtros,
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}
</style>
