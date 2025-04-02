const BASE_API = "https://api-colombia.com/api/v1";

export async function obtenerInfoColombia() {
  const respuesta = await fetch(`${BASE_API}/Country/Colombia`);
  return await respuesta.json();
}

export async function obtenerDepartamentos() {
  const respuesta = await fetch(`${BASE_API}/Department`);
  return await respuesta.json();
}

// 🔧 Esta es la función que falta. ¡AGREGA ESTO!
export async function obtenerDepartamentoPorId(id) {
  const respuesta = await fetch(`${BASE_API}/Department/${id}`);
  return await respuesta.json();
}
