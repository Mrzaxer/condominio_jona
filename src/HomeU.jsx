import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Home.css';

const HomeU = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [contador, setContador] = useState(0);
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  const departamento = localStorage.getItem('departamento');
  const token = localStorage.getItem('token'); // Obtiene el token de localStorage

  // Configuración de axios con el token
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`, // Agrega el token en la cabecera
    },
  };

  // Obtener notificaciones
  const fetchNotificaciones = async () => {
    try {
      const response = await axios.get(
        `https://api-mongo-5hdo.onrender.com/api/notificaciones/${departamento}`,
        axiosConfig // Se pasa la configuración con el token
      );

      const filteredNotificaciones = response.data.filter(
        (notif) => notif.departamento === departamento
      );
      setNotificaciones(filteredNotificaciones);

      const notificacionesNoLeidas = filteredNotificaciones.filter(
        (noti) => !noti.leida
      );
      setContador(notificacionesNoLeidas.length);
    } catch (err) {
      console.error('Error al obtener notificaciones:', err);
    }
  };

  useEffect(() => {
    fetchNotificaciones();

    const intervalId = setInterval(() => {
      fetchNotificaciones();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [departamento]);

  // Marcar como leída y redirigir
  const manejarClickNotificacion = async (id, ruta) => {
    try {
      await axios.put(
        `https://api-mongo-5hdo.onrender.com/api/notificaciones/${id}/leida`,
        {},
        axiosConfig // Se pasa el token
      );

      setNotificaciones((prev) =>
        prev.map((noti) => (noti._id === id ? { ...noti, leida: true } : noti))
      );
      setContador((prev) => Math.max(prev - 1, 0));
      navigate(ruta);
    } catch (err) {
      console.error('Error al marcar como leída:', err);
    }
  };

  // Eliminar notificación
  const eliminarNotificacion = async (id) => {
    try {
      await axios.delete(
        `https://api-mongo-5hdo.onrender.com/api/notificaciones/${id}`,
        axiosConfig // Se pasa el token
      );

      setNotificaciones((prev) => prev.filter((noti) => noti._id !== id));
      setContador((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.error('Error al eliminar la notificación:', err);
    }
  };

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
          <TransitionGroup component="ul" className="notification-list">
            {notificaciones.map((noti) => (
              <CSSTransition key={noti._id} timeout={500} classNames="notification">
                <li className={noti.leida ? 'leida' : 'nueva'}>
                  <span onClick={() => manejarClickNotificacion(noti._id, '/multasu')}>
                    {noti.mensaje}
                  </span>
                  <button className="delete-btn" onClick={() => eliminarNotificacion(noti._id)}>
                    X
                  </button>
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
        ) : (
          <p>No tienes notificaciones.</p>
        )}
      </div>
    </div>
  );
};

export default HomeU;
