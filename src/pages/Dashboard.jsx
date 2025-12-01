// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import PropertyForm from "../components/PropertyForm";
import PropertyTable from "../components/PropertyTable";
import { getProperties, addProperty } from "../api/propertyApi";

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar propiedades");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleAddProperty = async (newProperty) => {
    try {
      const added = await addProperty(newProperty);
      setProperties((prev) => [...prev, added]);
    } catch (err) {
      console.error(err);
      setError("Error al agregar propiedad");
    }
  };

  if (loading) return <p>Cargando propiedades...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <PropertyForm onAddProperty={handleAddProperty} />
      <PropertyTable properties={properties} />
    </div>
  );
};


export default Dashboard;
