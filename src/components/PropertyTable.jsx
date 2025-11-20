import React from 'react';

const PropertyTable = ({ properties }) => {
  return (
    <div className="property-table">
      <h3>Properties</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={index}>
              <td>{property.name}</td>
              <td>{property.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;
