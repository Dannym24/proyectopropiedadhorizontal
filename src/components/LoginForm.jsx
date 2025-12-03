import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      console.log("Login Response from Backend:", response.data);
  
      // Guardamos los datos del usuario en sessionStorage
      sessionStorage.setItem("userRole", response.data.role);
  
      // Solo guardamos el propietarioId si el rol no es admin
      if (response.data.role !== "admin" && response.data.propietarioId) {
        sessionStorage.setItem("propietarioId", response.data.propietarioId);
      } else {
        // Si el rol es admin, aseguramos que el propietarioId no se guarde
        sessionStorage.removeItem("propietarioId");
      }
  
      // Redirige a Dashboard o muestra un mensaje de éxito
      window.location.href = "/dashboard"; // O usa redireccionamiento de React Router
    } catch (err) {
      setError("Usuario o contraseña incorrectos.");
    }
  };
  
  return (
    <div>
      <h2>Iniciar sesión</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
