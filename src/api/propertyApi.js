// src/api/propertyApi.js

const API_URL = "http://localhost:5000";

// Obtener propiedades
export const getProperties = async () => {
  try {
    const response = await fetch(`${API_URL}/properties`);
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
    const response = await fetch(`${API_URL}/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

// Registrar usuario
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (response.ok) return data;
    else throw new Error(data.message || "Error al registrar usuario");
  } catch (error) {
    throw new Error(error.message || "Error de conexión");
  }
};

// Login de usuario
export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log("Login Response from Backend:", data);
    if (response.ok) return data;
    else throw new Error(data.message || "Usuario o contraseña incorrectos");
  } catch (error) {
    throw new Error(error.message || "Error de conexión");
  }
};
