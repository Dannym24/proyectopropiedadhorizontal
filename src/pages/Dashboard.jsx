import React, { useState } from 'react';
import PropertyTable from '../components/PropertyTable';
import PropertyForm from '../components/PropertyForm';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);

  const addProperty = (newProp) => {
    setProperties([...properties, { ...newProp, id: properties.length + 1 }]);
  };

  return (
    <div>
      <h1>Dashboard de Propiedades</h1>
      <PropertyForm onSubmit={addProperty} />
      <PropertyTable properties={properties} />
    </div>
  );
};

export default Dashboard;
