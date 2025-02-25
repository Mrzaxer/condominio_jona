import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Configuracion.css';

const Configuracion = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

      // Eliminar tokens para forzar reautenticación en todos los dispositivos
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');

      // Redirigir al usuario a la página de inicio (o login)
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Error al cambiar la contraseña.');
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('departamento');
    navigate('/');
  };

  // Volver a la página anterior
  const handleBack = () => {
    navigate(-1); // Regresar a la página anterior
  };

  return (
    <div className="configuracion-container">
      {/* Barra de Volver */}
      <div className="back-bar">
        <button className="back-button" onClick={handleBack}>← Volver</button>
      </div>

      <div className="config-content">
        <h2>Configuración</h2>

        {/* Error y éxito */}
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

          <button className="change-password-btn" onClick={handleChangePassword}>Cambiar Contraseña</button>
        </div>

        {/* Botón de Cerrar Sesión fuera del recuadro */}
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Configuracion;
