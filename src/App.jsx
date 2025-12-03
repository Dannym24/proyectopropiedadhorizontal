import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';  
import 'font-awesome/css/font-awesome.min.css';




const App = () => {
  const [role, setRole] = useState(null);
  const [propietarioId, setPropietarioId] = useState(null);

  const setUserData = (role, propietarioId) => {
    setRole(role);
    setPropietarioId(propietarioId);
  };

  return (
    <Router>
      <div>
      <h1>Sistema de Software Propiedad Horizontal</h1>
        <p>Gestión eficiente de propiedades</p>
        <nav>
          <ul>
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
