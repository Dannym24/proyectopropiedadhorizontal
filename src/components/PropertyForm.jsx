import React, { useState } from 'react';

const PropertyForm = ({ onSubmit }) => {
  const [property, setProperty] = useState({ name: '', owner: '', unit: '' });

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(property);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre propiedad"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="owner"
        placeholder="Propietario"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="unit"
        placeholder="Unidad"
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar propiedad</button>
    </form>
  );
};

export default PropertyForm;
