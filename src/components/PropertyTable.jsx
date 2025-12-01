// src/components/PropertyTable.jsx
import React from "react";

const PropertyTable = ({ properties }) => {
  if (properties.length === 0) return <p>No hay propiedades registradas.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Ubicación</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((property) => (
          <tr key={property.id}>
            <td>{property.id}</td>
            <td>{property.name}</td>
            <td>{property.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropertyTable;
