import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBell, FaCog } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Home.css';

const HomeU = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [contador, setContador] = useState(0);
  const [abierto, setAbierto] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Verificación de autenticación
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('userRole');
      
      if (!token) {
        navigate('/');
        return;
      }

      try {
        await axios.get('https://api-mongo-5hdo.onrender.com/api/users/verify', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (role !== 'inquilino') {
          navigate('/home');
          return;
        }

        setIsAuthenticated(true);
        fetchNotificaciones(); // Solo cargar notificaciones si está autenticado
      } catch (error) {
        localStorage.clear();
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [navigate]);

  // Configuración de axios con el token
  const getAxiosConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  // Obtener notificaciones
  const fetchNotificaciones = async () => {
    try {
      const departamento = localStorage.getItem('departamento');
      const response = await axios.get(
        `https://api-mongo-5hdo.onrender.com/api/notificaciones/${departamento}`,
        getAxiosConfig()
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

  // Marcar como leída y redirigir
  const manejarClickNotificacion = async (id, ruta) => {
    try {
      await axios.put(
        `https://api-mongo-5hdo.onrender.com/api/notificaciones/${id}/leida`,
        {},
        getAxiosConfig()
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
        getAxiosConfig()
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

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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
          <Link to="/configuracion" className="configuracion-button">
            <FaCog size={20} />
          </Link>
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