const URL_BASE = 'http://localhost:3000'

async function peticion(url, opciones = {}) {
  const respuesta = await fetch(url, opciones)

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`)
  }

  return await respuesta.json()
}


export async function obtenerMarcas() {
  return await peticion(`${URL_BASE}/marcas`)
}

export async function obtenerModelos() {
  return await peticion(`${URL_BASE}/modelos`)
}

export async function obtenerVehiculos() {
  return await peticion(`${URL_BASE}/vehiculos`)
}

export async function obtenerClientes() {
  return await peticion(`${URL_BASE}/clientes`)
}


export async function crearMarca(marca) {
  return await peticion(`${URL_BASE}/marcas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(marca)
  })
}

export async function crearModelo(modelo) {
  return await peticion(`${URL_BASE}/modelos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(modelo)
  })
}

export async function crearVehiculo(vehiculo) {
  return await peticion(`${URL_BASE}/vehiculos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehiculo)
  })
}

export async function crearCliente(cliente) {
  return await peticion(`${URL_BASE}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente)
  })
}


export async function actualizarModelo(idModelo, datosModelo) {
  return await peticion(`${URL_BASE}/modelos/${idModelo}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosModelo)
  })
}

export async function actualizarCliente(idCliente, datosCliente) {
  return await peticion(`${URL_BASE}/clientes/${idCliente}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosCliente)
  })
}


export async function eliminarCliente(idCliente) {
  return await peticion(`${URL_BASE}/clientes/${idCliente}`, {
    method: 'DELETE'
  })
}