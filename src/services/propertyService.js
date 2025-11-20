// src/services/propertyService.js
const API_URL = "https://jsonplaceholder.typicode.com";  // Usamos la API pública de JSONPlaceholder

// Obtener propiedades
export const getProperties = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);  // Obtiene las propiedades (simuladas como posts)
    const data = await response.json();
    if (response.ok) {
      return data;  // Devuelve los datos obtenidos
    } else {
      throw new Error(data.message || "Error al obtener propiedades");
    }
  } catch (error) {
    throw new Error(error.message || "Error de conexión");
  }
};

// Agregar propiedad (simulada, pero puedes ampliar la lógica)
export const addProperty = async (propertyData) => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(propertyData),
    });
    const data = await response.json();
    if (response.ok) {
      return data;  // Devuelve la propiedad agregada
    } else {
      throw new Error(data.message || "Error al agregar propiedad");
    }
  } catch (error) {
    throw new Error(error.message || "Error de conexión");
  }
};
