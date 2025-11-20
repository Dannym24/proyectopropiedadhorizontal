import React, { useState } from 'react';

const PropertyForm = ({ onAddProperty }) => {
  const [propertyName, setPropertyName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (propertyName && propertyAddress) {
      onAddProperty({ name: propertyName, address: propertyAddress });
      setPropertyName('');
      setPropertyAddress('');
    }
  };

  return (
    <div className="property-form">
      <h3>Add Property</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Property Name:</label>
          <input
            type="text"
            id="name"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Property Address:</label>
          <input
            type="text"
            id="address"
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
          />
        </div>
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default PropertyForm;
