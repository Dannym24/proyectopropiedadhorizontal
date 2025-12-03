import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importamos el hook useNavigate

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("propietario"); // Rol por defecto
  const [nombreCompleto, setNombreCompleto] = useState(""); // Nuevo campo para el nombre completo
  const [cedula, setCedula] = useState(""); // Nuevo campo para la cédula
  const [apartamento, setApartamento] = useState(""); // Nuevo campo para el apartamento
  const [torre, setTorre] = useState(""); // Nuevo campo para la torre
  const [correo, setCorreo] = useState(""); // Nuevo campo para el correo
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
        nombreCompleto,
        cedula,
        apartamento,
        torre,
        correo,
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
    <div className="container" style={containerStyle}>
      <h2 style={headingStyle}>Registro de Usuario</h2>
      {error && <p className="error" style={errorStyle}>{error}</p>}
      {success && <p className="success" style={successStyle}>{success}</p>}
      <form onSubmit={handleRegister} style={formStyle}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Apartamento"
          value={apartamento}
          onChange={(e) => setApartamento(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Torre"
          value={torre}
          onChange={(e) => setTorre(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        {/* Campo para seleccionar el rol */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={selectStyle}
        >
          <option value="propietario">Propietario</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit" style={buttonStyle}>Registrarse</button>
      </form>
    </div>
  );
};

// Estilo para los campos de entrada
const inputStyle = {
  padding: "12px",
  fontSize: "14px",
  border: "2px solid #f39c12",  // Amarillo suave
  borderRadius: "8px",
  width: "100%",
  boxSizing: "border-box",
  marginBottom: "10px",
  backgroundColor: "#f4f6f8", // Fondo suave claro
};

// Estilo para el selector de rol
const selectStyle = {
  padding: "12px",
  fontSize: "14px",
  border: "2px solid #f39c12",  // Amarillo suave
  borderRadius: "8px",
  width: "100%",
  boxSizing: "border-box",
  marginBottom: "10px",
  backgroundColor: "#f4f6f8", // Fondo suave claro
};

// Estilo para el botón
const buttonStyle = {
  padding: "12px 20px",
  fontSize: "16px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#f39c12",  // Amarillo suave
  color: "#fff",
  cursor: "pointer",
  width: "100%",
  boxSizing: "border-box",
  marginTop: "10px",
};

// Estilos generales
const containerStyle = {
  maxWidth: "450px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#fff", // Fondo blanco
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra suave
  borderRadius: "8px", // Bordes redondeados
};

const headingStyle = {
  color: "#f39c12", // Color de texto naranjita (amarillo suave)
  fontSize: "24px",
  textAlign: "center",
  marginBottom: "20px",
};

const errorStyle = {
  color: "#e74c3c", // Rojo para el mensaje de error
  fontSize: "14px",
};

const successStyle = {
  color: "#2ecc71", // Verde para el mensaje de éxito
  fontSize: "14px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

export default RegisterForm;
