import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './configuracion.css';

const Configuracion = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/');
        return;
      }

      try {
        // Verificar token con el backend
        await axios.get('https://api-mongo-5hdo.onrender.com/api/users/verify', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsAuthenticated(true);
      } catch (err) {
        handleFullLogout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [navigate]);

  // Función completa de logout que limpia todo e invalida el refresh token
  const handleFullLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await axios.post('https://api-mongo-5hdo.onrender.com/api/users/logout', {
          refreshToken
        });
      }
    } catch (err) {
      console.error('Error al cerrar sesión en backend:', err);
    } finally {
      // Limpiar todo el almacenamiento local
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('departamento');
      
      // Eliminar el header de axios
      delete axios.defaults.headers['Authorization'];
      
      // Redirigir al login
      navigate('/');
    }
  };

  // Cambiar la contraseña
  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No estás autenticado.');
        return;
      }

      const response = await axios.put(
        'https://api-mongo-5hdo.onrender.com/api/users/change-password', 
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Contraseña cambiada exitosamente. Todas las sesiones se han cerrado.');
      setCurrentPassword('');
      setNewPassword('');

      // Cerrar sesión completamente después de cambiar la contraseña
      setTimeout(() => {
        handleFullLogout();
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Error al cambiar la contraseña.');
    }
  };

  // Volver a la página anterior
  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // O podrías redirigir directamente aquí
  }

  return (
    <div className="configuracion-container">
      {/* Barra de Volver */}
      <div className="back-bar">
        <button className="back-button" onClick={handleBack}>← Volver</button>
      </div>

      <div className="config-content">
        <h2>Configuración</h2>

        {/* Mensajes de estado */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {/* Recuadro de Cambio de Contraseña */}
        <div className="password-change-box">
          <h3>Cambiar Contraseña</h3>
          <div>
            <label htmlFor="currentPassword">Contraseña Actual</label>
            <input
              type="password"
              id="currentPassword"
              placeholder="Ingresa tu contraseña actual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="newPassword">Nueva Contraseña</label>
            <input
              type="password"
              id="newPassword"
              placeholder="Ingresa tu nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button 
            className="change-password-btn" 
            onClick={handleChangePassword}
            disabled={!currentPassword || !newPassword}
          >
            Cambiar Contraseña
          </button>
        </div>

        {/* Botón de Cerrar Sesión */}
        <button 
          className="logout-button" 
          onClick={handleFullLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Configuracion;