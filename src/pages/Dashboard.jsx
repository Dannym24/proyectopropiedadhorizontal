// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { getProperties, addProperty } from "../api/propertyApi"; // Importamos los métodos de la API

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({ title: "", body: "" });

  useEffect(() => {
    // Obtener las propiedades al cargar el componente
    const fetchProperties = async () => {
      const propertiesData = await getProperties();
      setProperties(propertiesData);
    };
    fetchProperties();
  }, []);

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      const addedProperty = await addProperty(newProperty);
      setProperties([...properties, addedProperty]); // Agregar la nueva propiedad a la lista
      setNewProperty({ title: "", body: "" }); // Limpiar el formulario
    } catch (error) {
      console.error("Error al agregar propiedad:", error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleAddProperty}>
        <input
          type="text"
          value={newProperty.title}
          onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          value={newProperty.body}
          onChange={(e) => setNewProperty({ ...newProperty, body: e.target.value })}
          placeholder="Body"
        />
        <button type="submit">Agregar propiedad</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.id}</td>
              <td>{property.title}</td>
              <td>{property.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
