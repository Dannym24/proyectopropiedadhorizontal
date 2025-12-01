// src/components/PropertyForm.jsx
import React, { useState } from "react";
import { addProperty } from "../api/propertyApi";

const PropertyForm = ({ onAddProperty }) => {
  const [property, setProperty] = useState({ name: "", location: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!property.name || !property.location) {
      setError("Todos los campos son obligatorios");
      return;
    }
    try {
      const added = await addProperty(property);
      onAddProperty(added);
      setProperty({ name: "", location: "" });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al agregar propiedad");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={property.name}
        onChange={(e) => setProperty({ ...property, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Ubicación"
        value={property.location}
        onChange={(e) =>
          setProperty({ ...property, location: e.target.value })
        }
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Agregar propiedad</button>
    </form>
  );
};

export default PropertyForm;
