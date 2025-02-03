import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import './Home.css';

const HomeU = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [contador, setContador] = useState(0);
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  const departamento = localStorage.getItem('departamento');

  // Obtener notificaciones
  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notificaciones/${departamento}`);
        const filteredNotificaciones = response.data.filter(notif => notif.departamento === departamento);
        setNotificaciones(filteredNotificaciones);

        const notificacionesNoLeidas = filteredNotificaciones.filter(noti => !noti.leida);
        setContador(notificacionesNoLeidas.length);
      } catch (err) {
        console.error('Error al obtener notificaciones:', err);
      }
    };

    fetchNotificaciones();
  }, [departamento]);

  // Marcar como leída y redirigir
  const manejarClickNotificacion = async (id, ruta) => {
    try {
      await axios.put(`http://localhost:5000/api/notificaciones/${id}/leida`);
      setNotificaciones(prev =>
        prev.map(noti => (noti._id === id ? { ...noti, leida: true } : noti))
      );
      setContador(prev => Math.max(prev - 1, 0));
      navigate(ruta); // Redirige a la ruta deseada
    } catch (err) {
      console.error('Error al marcar como leída:', err);
    }
  };

  // Eliminar notificación
  const eliminarNotificacion = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notificaciones/${id}`);
      setNotificaciones(prev => prev.filter(noti => noti._id !== id));
      setContador(prev => Math.max(prev - 1, 0));
    } catch (err) {
      console.error('Error al eliminar la notificación:', err);
    }
  };

  // Alternar menú de notificaciones
  const toggleDropdown = () => {
    setAbierto(!abierto);
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <img src="/imagenes/logo5.png" alt="logo" width="80" height="80" />
          <h1>Inquilino</h1>
        </div>
        <nav className="menu">
          <div className="campana-container" onClick={toggleDropdown}>
            <FaBell size={24} />
            {contador > 0 && <span className="notification-count">{contador}</span>}
          </div>
          <Link to="/pagosu">Mis Pagos</Link>
          <Link to="/multasu">Mis Multas</Link>
          <Link to="/permisosu">Solicitar Permisos</Link>
          <Link to="/">Cerrar Sesión</Link>
        </nav>
      </header>

      {/* Menú de notificaciones */}
      <div className={`notification-menu ${abierto ? 'open' : ''}`}>
        <div className="close-btn" onClick={toggleDropdown}>X</div>
        <h4>Notificaciones</h4>
        {notificaciones.length > 0 ? (
          <ul>
            {notificaciones.map(noti => (
              <li key={noti._id} className={noti.leida ? 'leida' : 'nueva'} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span onClick={() => manejarClickNotificacion(noti._id, '/multasu')}>
                  {noti.mensaje}
                </span>
                <button onClick={() => eliminarNotificacion(noti._id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' }}>X</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes notificaciones.</p>
        )}
      </div>
    </div>
  );
};

export default HomeU;
