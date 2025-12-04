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

  // Función para validar los campos antes de enviar
  const validateForm = () => {
    if (
      !nombreCompleto ||
      !cedula ||
      !apartamento ||
      !torre ||
      !correo ||
      !username ||
      !password
    ) {
      setError("Todos los campos son obligatorios.");
      return false;
    }

    // Validación del formato del correo
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(correo)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return false;
    }

    // Si todo es válido, restablecemos los errores
    setError("");
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validamos antes de hacer la solicitud
    if (!validateForm()) {
      return; // No continuar si la validación falla
    }

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
      
      // Si el registro fue exitoso, mostramos el mensaje de éxito
      setSuccess("Usuario registrado correctamente.");
      setError("");

      // Redirigimos a la página de inicio de sesión después de un pequeño retraso
      setTimeout(() => {
        navigate("/login"); // Redirige a la ruta "/login"
      }, 2000); // Espera 2 segundos antes de redirigir (opcional para que el usuario vea el mensaje)
      
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
  padding: "8px",
  fontSize: "14px",
  border: "2px solid #FF7043",  // Naranja
  borderRadius: "5px",
  width: "100%",
  boxSizing: "border-box",
  marginBottom: "10px",
  backgroundColor: "#fff", // Fondo blanco
};

// Estilo para el selector de rol
const selectStyle = {
  padding: "8px",
  fontSize: "14px",
  border: "2px solid #FF7043",  // Naranja
  borderRadius: "5px",
  width: "100%",
  boxSizing: "border-box",
  marginBottom: "10px",
  backgroundColor: "#fff", // Fondo blanco
};

// Estilo para el botón
const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#FF7043",  // Naranja
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
  color: "#333", // Color de texto oscuro para el título
  fontSize: "24px",
  textAlign: "center",
  marginBottom: "20px",
};

const errorStyle = {
  color: "#ff4d4d", // Color rojo para el mensaje de error
  fontSize: "14px",
};

const successStyle = {
  color: "#4caf50", // Color verde para el mensaje de éxito
  fontSize: "14px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

export default RegisterForm;
