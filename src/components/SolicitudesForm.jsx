import { useState } from "react";

export default function SolicitudesForm() {
  const [form, setForm] = useState({
    propietarioId: "",  // Cambié de "propietario" a "propietarioId"
    tipo: "",
    mensaje: ""
  });

  const [respuesta, setRespuesta] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Asegúrate de que el propietarioId esté asignado correctamente desde el sessionStorage
    const propietarioId = sessionStorage.getItem("propietarioId");

    // Verifica que el propietarioId esté en el almacenamiento antes de enviarlo
    if (!propietarioId) {
      setRespuesta("El propietarioId no está disponible.");
      return;
    }

    const formData = {
      ...form,
      propietarioId  // Asignamos el propietarioId desde el sessionStorage
    };

    const response = await fetch("http://localhost:5000/solicitudes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),  // Enviamos formData con propietarioId
    });

    const data = await response.json();
    setRespuesta(data.message);
  };

  return (
    <div className="p-4 shadow bg-white rounded">
      <h2>Enviar Solicitud / PQRS</h2>

      <form onSubmit={handleSubmit}>
        <label>Tipo:</label>
        <select name="tipo" value={form.tipo} onChange={handleChange} required>
          <option>Seleccione</option>
          <option>Queja</option>
          <option>Reclamo</option>
          <option>Solicitud</option>
        </select>

        <label>Mensaje:</label>
        <textarea
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Enviar</button>
      </form>

      {respuesta && <p style={{ marginTop: "10px" }}>{respuesta}</p>}
    </div>
  );
}
