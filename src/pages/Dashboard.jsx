// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { getProperties, addProperty } from '../services/propertyService';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({ title: '', body: '' });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      const addedProperty = await addProperty(newProperty);
      setProperties([...properties, addedProperty]);  // Agrega la nueva propiedad a la lista
      setNewProperty({ title: '', body: '' });  // Resetea el formulario
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleAddProperty}>
        <input
          type="text"
          placeholder="Title"
          value={newProperty.title}
          onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
        />
        <textarea
          placeholder="Body"
          value={newProperty.body}
          onChange={(e) => setNewProperty({ ...newProperty, body: e.target.value })}
        />
        <button type="submit">Add Property</button>
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
