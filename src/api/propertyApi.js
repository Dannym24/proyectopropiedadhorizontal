// src/api/propertyApi.js

const API_URL = "https://jsonplaceholder.typicode.com"; // URL de la API pública

// Obtener propiedades
export const getProperties = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Error al obtener propiedades");
    }
  } catch (error) {
    throw new Error(error.message || "Error de conexión");
  }
};

// Agregar propiedad
export const addProperty = async (propertyData) => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyData),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Error al agregar propiedad");
    }
  } catch (error) {
    throw new Error(error.message || "Error de conexión");
  }
};
