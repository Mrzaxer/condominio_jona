import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Verificar sesión al cargar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!token && refreshToken) {
        try {
          await refreshAccessToken();
        } catch (error) {
          console.log("No se pudo renovar la sesión:", error);
        }
      } else if (token) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        verifyTokenAndRedirect();
      }
    };
    
    checkAuth();
  }, []);

  const verifyTokenAndRedirect = async () => {
    try {
      const role = localStorage.getItem('userRole');
      if (role === 'admin') {
        navigate('/Home');
      } else if (role === 'inquilino') {
        navigate('/HomeU');
      }
    } catch (error) {
      console.error("Error al verificar token:", error);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        'https://api-mongo-5hdo.onrender.com/api/users/login', 
        { phone, password },
        { withCredentials: true }
      );

      const { accessToken, refreshToken, role, direccion } = response.data;

      // Guardar datos manualmente
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userRole', role);
      localStorage.setItem('departamento', direccion);

      // Configurar header de autorización manualmente
      axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

      // Redirección manual según rol
      if (role === 'admin') {
        navigate('/Home');
      } else if (role === 'inquilino') {
        navigate('/HomeU');
      } else {
        setError('Rol no reconocido');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
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
      
      // Actualizar token manualmente
      localStorage.setItem('token', accessToken);
      axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

      return accessToken;
    } catch (err) {
      console.error('Error al renovar token:', err);
      handleLogout();
      throw err;
    }
  };

  const handleLogout = () => {
    // Limpieza manual de tokens
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>

        <button 
          onClick={handleLogin} 
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
        
        <button 
          onClick={() => navigate('/register')} 
          className="register-button"
          disabled={isLoading}
        >
          Registrarse
        </button>

        <button 
          onClick={() => navigate('/forgotpassword')} 
          className="forgot-password-button"
          disabled={isLoading}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </div>
  );
};

export default Login;