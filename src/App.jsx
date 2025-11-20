import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/LoginForm';  // Asegúrate de tener este componente

const App = () => {
  return (
    <Router>
      <div>
        <h1>Propiedad Horizontal</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Iniciar sesión</Link></li> {/* Enlace a Login */}
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} /> {/* Ruta para Login */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
