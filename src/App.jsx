import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  // Mantén el estado de role y propietarioId dentro de App
  const [role, setRole] = useState(null);
  const [propietarioId, setPropietarioId] = useState(null);

  // Función para actualizar el estado del usuario
  const setUserData = (role, propietarioId) => {
    setRole(role);
    setPropietarioId(propietarioId);
  };

  return (
    <Router>
      <div>
        <h1>Propiedad Horizontal</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Iniciar sesión</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/register">Registro</Link></li>
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm setUserData={setUserData} />} />
          <Route 
            path="/dashboard" 
            element={<Dashboard role={role} propietarioId={propietarioId} />} 
          />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
