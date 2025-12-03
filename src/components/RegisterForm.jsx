import React, { useState } from 'react';
import { registerUser } from '../api/propertyApi';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('propietario'); // rol por defecto
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword || !role) {
      setError('Todos los campos son obligatorios');
      setSuccess('');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setSuccess('');
      return;
    }

    try {
      const response = await registerUser({ username, password, role });
      console.log('Usuario registrado:', response);

      setError('');
      setSuccess('Registro exitoso');

      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setRole('propietario');

      // Redirigir al login
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al registrar usuario');
      setSuccess('');
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="role">Rol:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="propietario">Propietario</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
