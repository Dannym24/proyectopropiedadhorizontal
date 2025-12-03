import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Bienvenido</h2>
      <p>¡Regístrate o inicia sesión para continuar!</p>

      <div>
        <Link to="/login">Iniciar sesión</Link>
        <br />
        <Link to="/register">Registrarse</Link>
      </div>

      {/* Botones de redes sociales */}
      <div className="social-buttons">
        <a href="https://www.facebook.com" target="_blank" className="social-button facebook">
          <i className="fa fa-facebook-f"></i> {/* Ícono de Facebook */}
        </a>
        <a href="https://twitter.com" target="_blank" className="social-button twitter">
          <i className="fa fa-twitter"></i> {/* Ícono de Twitter */}
        </a>
        <a href="https://www.instagram.com" target="_blank" className="social-button instagram">
          <i className="fa fa-instagram"></i> {/* Ícono de Instagram */}
        </a>
        <a href="https://www.linkedin.com" target="_blank" className="social-button linkedin">
          <i className="fa fa-linkedin"></i> {/* Ícono de LinkedIn */}
        </a>
      </div>
    </div>
  );
};

export default Home;
