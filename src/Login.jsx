import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://api-mongo-5hdo.onrender.com/api/users/login', { phone, password });

      // Extraer los datos de la respuesta
      const { role, departamento } = response.data;

      // Guardar en localStorage
      localStorage.setItem('userRole', role);
      localStorage.setItem('departamento', departamento);

      // Redirigir según el rol
      if (role === 'admin') {
        navigate('/Home');  // Página para administradores
      } else if (role === 'inquilino') {
        navigate('/HomeU'); // Página para inquilinos
      } else {
        setError('Rol no reconocido');
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="/imagenes/logo5.png" alt="logo" width="80" height="80" />
        </div>
        <h2>Bienvenido</h2>
        <p>Por favor ingresa tus datos para iniciar sesión</p>
        
        {error && <p style={{ color: 'red' }}>{error}</p>} 
        
        <div>
          <label htmlFor="phone">Teléfono</label>
          <input
            type="text"
            id="phone"
            placeholder="Ingrese su teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin}>Iniciar Sesión</button>
        <button onClick={() => navigate('/register')} className="register-button">
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Login;
