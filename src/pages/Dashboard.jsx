import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import PropertyForm from "../components/PropertyForm";
import PropertyTable from "../components/PropertyTable";
import SolicitudesForm from "../components/SolicitudesForm";
import SolicitudesList from "../components/SolicitudesList";
import Cuotas from "../components/Cuotas";
import { getProperties } from "../api/propertyApi";

const Dashboard = () => {
  const role = sessionStorage.getItem("userRole");
  let propietarioId = sessionStorage.getItem("propietarioId");

  // Verificaciones iniciales
  if (!role || (role !== "admin" && !propietarioId)) {
    return <div>Datos de usuario no disponibles. Por favor, inicie sesión nuevamente.</div>;
}


  console.log("Rol actual del usuario:", role);
  console.log("PropietarioId actual:", propietarioId);

  // Si es admin, no pasamos el propietarioId
  if (role === "admin") {
    propietarioId = null;  // Ignorar el propietarioId para admin
  }

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (role === "admin") {
      const fetchProperties = async () => {
        try {
          const data = await getProperties();
          setProperties(data);
        } catch (err) {
          console.error("Error al cargar propiedades", err);
        }
      };
      fetchProperties();
    }
  }, [role]);

  return (
    <div className="dashboard-container" style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <Accordion defaultActiveKey="0">
        {/* Gestión de Propiedades solo admin */}
        {role === "admin" && (
          <Accordion.Item eventKey="0">
            <Accordion.Header>Gestión de Propiedades</Accordion.Header>
            <Accordion.Body>
              <PropertyForm
                onAddProperty={(prop) => setProperties([...properties, prop])}
              />
              <PropertyTable properties={properties || []} />
            </Accordion.Body>
          </Accordion.Item>
        )}

        {/* Solicitudes */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Solicitudes (PQRS)</Accordion.Header>
          <Accordion.Body>
            {/* Enviar null si es admin */}
            <SolicitudesForm propietarioId={propietarioId} />
            <SolicitudesList propietarioId={propietarioId} />
          </Accordion.Body>
        </Accordion.Item>

        {/* Cuotas */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Cuotas de Administración</Accordion.Header>
          <Accordion.Body>
            {/* Enviar null si es admin */}
            <Cuotas propietarioId={propietarioId} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Dashboard;
