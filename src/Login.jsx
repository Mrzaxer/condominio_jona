import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        await refreshAccessToken();
      } else {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://api-mongo-5hdo.onrender.com/api/users/login', 
        { phone, password },
        { withCredentials: true }  
      );

      const { accessToken, refreshToken, role, direccion } = response.data;

      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userRole', role);
      localStorage.setItem('departamento', direccion);

      axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

      if (role === 'admin') {
        navigate('/Home');
      } else if (role === 'inquilino') {
        navigate('/HomeU');
      } else {
        setError('Rol no reconocido');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No hay refresh token disponible');

      const response = await axios.post(
        'https://api-mongo-5hdo.onrender.com/api/users/token',  
        { refreshToken },  
        { withCredentials: true }  
      );

      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);

      axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

      console.log('Token renovado exitosamente');
    } catch (err) {
      console.error('No se pudo renovar el token:', err.response?.data?.message || err.message);
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('departamento');
    delete axios.defaults.headers['Authorization'];
    navigate('/');
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

        {/* ✅ Botón para recuperar contraseña */}
        <button 
          onClick={() => navigate('/recuperar')} 
          className="forgot-password-button"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </div>
  );
};

export default Login;
