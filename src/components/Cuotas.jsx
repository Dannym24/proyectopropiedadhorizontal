import React, { useState, useEffect } from "react";

const Cuotas = ({ propietarioId }) => {
  const [cuotas, setCuotas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCuotas = async () => {
      try {
        // Si propietarioId es null => admin => llamamos sin parámetro
        const url = propietarioId
          ? `http://localhost:5000/cuotas/${propietarioId}`
          : `http://localhost:5000/cuotas`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al cargar cuotas");

        const data = await res.json();
        setCuotas(data);
      } catch (err) {
        console.error("Error al cargar cuotas", err);
        setError(err.message);
      }
    };

    fetchCuotas();
  }, [propietarioId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Cuotas</h3>
      <ul>
        {cuotas.map((c) => (
          <li key={c.id}>
            {c.mes}: ${c.valor} - {c.pagado ? "Pagado" : "Pendiente"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cuotas;
