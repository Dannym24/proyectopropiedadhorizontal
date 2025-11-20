import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Bienvenido a la Propiedad Horizontal</h2>
      <p>¡Regístrate o inicia sesión para continuar!</p>

      {/* Enlaces a las páginas de login y registro */}
      <div>
        <Link to="/login">Iniciar sesión</Link>
        <br />
        <Link to="/register">Registrarse</Link>
      </div>
    </div>
  );
};

export default Home;

