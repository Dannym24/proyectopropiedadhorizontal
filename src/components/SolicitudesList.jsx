import React, { useState, useEffect } from "react";

const SolicitudesList = ({ propietarioId }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        // Si propietarioId es null => admin => llamamos sin parámetro
        const url = propietarioId
          ? `http://localhost:5000/solicitudes/${propietarioId}`
          : `http://localhost:5000/solicitudes`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al cargar solicitudes");

        const data = await res.json();
        console.log("Solicitudes recibidas:", data);
        setSolicitudes(data);
      } catch (err) {
        console.error("Error al cargar solicitudes", err);
        setError(err.message);
      }
    };

    fetchSolicitudes();
  }, [propietarioId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Solicitudes</h3>
      <ul>
        {solicitudes.map((s) => (
          <li key={s.id}>
            {s.tipo} - {s.mensaje} ({s.estado})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolicitudesList;
