import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Home = () => {
  const handleLogin = (data) => {
    console.log('Login:', data);
  };

  const handleRegister = (data) => {
    console.log('Registro:', data);
  };

  return (
    <div>
      <h1>Propiedad Horizontal</h1>
      <h2>Login</h2>
      <LoginForm onLogin={handleLogin} />
      <h2>Registro</h2>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default Home;
