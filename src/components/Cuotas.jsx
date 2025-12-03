import React, { useState, useEffect } from "react";

const Cuotas = ({ propietarioId }) => {
  const [cuotas, setCuotas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCuotas = async () => {
      // Define la URL en función de si hay propietarioId
      const url = propietarioId
        ? `http://localhost:5000/cuotas/${propietarioId}`
        : `http://localhost:5000/cuotas`;

      console.log("Haciendo solicitud a:", url); // Muestra la URL de la solicitud

      try {
        const res = await fetch(url);

        console.log("Respuesta obtenida:", res); // Muestra la respuesta

        if (!res.ok) throw new Error("Error al cargar cuotas");

        const data = await res.json();
        console.log("Datos recibidos:", data); // Muestra los datos recibidos

        setCuotas(data);
      } catch (err) {
        console.error("Error al cargar cuotas", err);
        setError(err.message);
      }
    };

    fetchCuotas();
  }, [propietarioId]); // Dependencia en propietarioId para recargar cuando cambie

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
