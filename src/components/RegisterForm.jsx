import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importamos el hook useNavigate

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("propietario"); // Rol por defecto
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Inicializamos el hook useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
        role,
      });
      console.log("Register Response from Backend:", response.data);
      setSuccess("Usuario registrado correctamente.");
      setError("");
      
      // Redirige a la página de inicio de sesión después de un registro exitoso
      navigate("/login"); // Esto redirige a la ruta "/login"
    } catch (err) {
      setError("Error al registrar el usuario.");
      setSuccess("");
    }
  };

  return (
    <div className="container">
      <h2>Registro de Usuario</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Campo para seleccionar el rol */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            marginBottom: "15px",
            padding: "12px",
            width: "100%",
            border: "2px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
            backgroundColor: "#f4f6f8",
          }}
        >
          <option value="propietario">Propietario</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterForm;
