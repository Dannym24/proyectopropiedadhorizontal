import React from 'react';

const PropertyTable = ({ properties }) => (
  <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Propietario</th>
        <th>Unidad</th>
      </tr>
    </thead>
    <tbody>
      {properties.map((prop) => (
        <tr key={prop.id}>
          <td>{prop.id}</td>
          <td>{prop.name}</td>
          <td>{prop.owner}</td>
          <td>{prop.unit}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PropertyTable;
