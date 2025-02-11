import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Importamos react-transition-group
import './Multas.css';

const HomeU = () => {
  const [multas, setMultas] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);
  const [contador, setContador] = useState(0);
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();
  const departamento = localStorage.getItem('departamento');

  // Obtener multas
  useEffect(() => {
    const fetchMultas = async () => {
      try {
        const response = await axios.get('https://api-mongo-5hdo.onrender.com/api/multas/si');
        const filteredMultas = response.data.filter(multa => multa.direccion.includes(departamento));
        setMultas(filteredMultas);
      } catch (err) {
        console.error('Error al obtener multas:', err);
      }
    };
    fetchMultas();
  }, [departamento]);

  // Obtener notificaciones con actualización automática
  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await axios.get(`https://api-mongo-5hdo.onrender.com/api/notificaciones/${departamento}`);
        const filteredNotificaciones = response.data.filter(notif => notif.departamento === departamento);
        setNotificaciones(filteredNotificaciones);

        const notificacionesNoLeidas = filteredNotificaciones.filter(noti => !noti.leida);
        setContador(notificacionesNoLeidas.length);
      } catch (err) {
        console.error('Error al obtener notificaciones:', err);
      }
    };

    fetchNotificaciones();
    
    // Intervalo para actualizar las notificaciones cada 3 segundos
    const interval = setInterval(fetchNotificaciones, 3000);

    return () => clearInterval(interval);
  }, [departamento]);

  // Marcar notificación como leída y redirigir
  const marcarComoLeidaYRedirigir = async (id, ruta) => {
    try {
      await axios.put(`https://api-mongo-5hdo.onrender.com/api/notificaciones/${id}/leida`);
      setNotificaciones(prev => prev.map(noti => (noti._id === id ? { ...noti, leida: true } : noti)));
      setContador(prev => Math.max(prev - 1, 0));
      navigate(ruta);
    } catch (err) {
      console.error('Error al marcar como leída:', err);
    }
  };

  // Eliminar notificación manualmente
  const eliminarNotificacion = async (id) => {
    try {
      await axios.delete(`https://api-mongo-5hdo.onrender.com/api/notificaciones/${id}`);
      setNotificaciones(prev => prev.filter(noti => noti._id !== id));
    } catch (err) {
      console.error('Error al eliminar la notificación:', err);
    }
  };

  const toggleDropdown = () => {
    setAbierto(!abierto);
  };

  return (
    <div className="multas-container">
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
          <Link to="/homeu">Inicio</Link>
          <Link to="/pagosu">Mis Pagos</Link>
          <Link to="/multasu">Mis Multas</Link>
          <Link to="/permisosu">Solicitar Permisos</Link>
          <Link to="/">Cerrar Sesión</Link>
        </nav>
      </header>

      {/* Menú de notificaciones deslizante */}
      <div className={`notification-menu ${abierto ? 'open' : ''}`}>
        <div className="close-btn" onClick={toggleDropdown}>X</div>
        <h4>Notificaciones</h4>
        {notificaciones.length > 0 ? (
          <TransitionGroup component="ul" className="notification-list">
            {notificaciones.map(noti => (
              <CSSTransition
                key={noti._id}
                timeout={500}
                classNames="notification"
              >
                <li className={noti.leida ? 'leida' : 'nueva'}>
                  <span onClick={() => marcarComoLeidaYRedirigir(noti._id, noti.ruta)}>
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

      <main className="main-content">
        <h2>Mis Multas</h2>
        <table className="multas-table">
          <thead>
            <tr>
              <th>Motivo</th>
              <th>Dirección</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {multas.length === 0 ? (
              <tr><td colSpan="4">No tienes multas.</td></tr>
            ) : (
              multas.map(multa => (
                <tr key={multa._id}>
                  <td>{multa.motivo}</td>
                  <td>{multa.direccion}</td>
                  <td>${multa.monto}</td>
                  <td>{multa.estado}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default HomeU;
