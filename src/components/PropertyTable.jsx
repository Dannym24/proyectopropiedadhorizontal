import React from "react";

const PropertyTable = ({ properties = [] }) => {
  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {properties.length === 0 ? (
          <tr>
            <td colSpan="2">No hay propiedades</td>
          </tr>
        ) : (
          properties.map((prop) => (
            <tr key={prop.id}>
              <td>{prop.id}</td>
              <td>{prop.name}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default PropertyTable;
