import { ref, computed } from 'vue'

const marcas = ref([
  {
    id: '1',
    nombre: 'Alfa Romeo',
    origen: 'Italia',
    anioFundacion: 1910
  }
])

const modelos = ref([
  {
    id: '1',
    idMarca: '1',
    modelo: 'Giulia',
    extraPorModelo: 12
  }
])

const vehiculos = ref([
  {
    id: '1',
    idModelo: '1',
    precioDia: 98,
    puertas: 4,
    sillaInfantil: false
  }
])

const clientes = ref([
  {
    id: '1',
    nombre: 'Diego Velázquez',
    dni: '76523137I',
    alquileres: [
      {
        idVehiculo: '1',
        numDias: 4,
        fechaInic: '12/11/2025'
      }
    ]
  }
])

function generarNuevoId(lista) {
  if (lista.length === 0) {
    return '1'
  }

  const ultimoId = Math.max(...lista.map((elemento) => Number(elemento.id)))
  return String(ultimoId + 1)
}

function crearMarca(datosMarca) {
  const nuevaMarca = {
    id: generarNuevoId(marcas.value),
    nombre: datosMarca.nombre.trim(),
    origen: datosMarca.origen.trim(),
    anioFundacion: Number(datosMarca.anioFundacion)
  }

  marcas.value.push(nuevaMarca)
  return nuevaMarca
}

function crearModelo(datosModelo) {
  const nuevoModelo = {
    id: generarNuevoId(modelos.value),
    idMarca: datosModelo.idMarca,
    modelo: datosModelo.modelo.trim(),
    extraPorModelo: datosModelo.extraPorModelo === '' ? 0 : Number(datosModelo.extraPorModelo)
  }

  modelos.value.push(nuevoModelo)
  return nuevoModelo
}

function crearVehiculo(datosVehiculo) {
  const nuevoVehiculo = {
    id: generarNuevoId(vehiculos.value),
    idModelo: datosVehiculo.idModelo,
    precioDia: Number(datosVehiculo.precioDia),
    puertas: Number(datosVehiculo.puertas),
    sillaInfantil: datosVehiculo.sillaInfantil
  }

  vehiculos.value.push(nuevoVehiculo)
  return nuevoVehiculo
}

const marcasOrdenadasPorNombre = computed(() => {
  return [...marcas.value].sort((marcaA, marcaB) =>
    marcaA.nombre.localeCompare(marcaB.nombre)
  )
})

function obtenerModelosDeMarca(idMarca) {
  return modelos.value.filter((modelo) => modelo.idMarca === idMarca)
}

export {
  marcas,
  modelos,
  vehiculos,
  clientes,
  crearMarca,
  crearModelo,
  crearVehiculo,
  marcasOrdenadasPorNombre,
  obtenerModelosDeMarca
}