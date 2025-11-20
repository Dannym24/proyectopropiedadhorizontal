import React, { useState } from 'react';
import PropertyForm from '../components/PropertyForm';
import PropertyTable from '../components/PropertyTable';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);

  const addProperty = (property) => {
    setProperties([...properties, property]);
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <PropertyForm onAddProperty={addProperty} />
      <PropertyTable properties={properties} />
    </div>
  );
};

export default Dashboard;
