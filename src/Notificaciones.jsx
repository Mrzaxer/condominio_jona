import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notificaciones.css';

const Notificaciones = ({ departamento, setContador }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await axios.get(`https://api-mongo-5hdo.onrender.com/api/notificaciones/${departamento}`);
        setNotificaciones(response.data);
        // Actualizar el contador de notificaciones no leídas
        const notificacionesNoLeidas = response.data.filter((noti) => !noti.leida);
        setContador(notificacionesNoLeidas.length);
      } catch (err) {
        setError('Error al cargar las notificaciones.');
        console.error(err);
      }
    };

    fetchNotificaciones();
  }, [departamento, setContador]);

  const marcarComoLeida = async (id) => {
    try {
      await axios.put(`https://api-mongo-5hdo.onrender.com/api/notificaciones/${id}/leida`);
      setNotificaciones((prev) =>
        prev.map((noti) => (noti._id === id ? { ...noti, leida: true } : noti))
      );

      // Actualizar el contador de notificaciones no leídas
      const notificacionesNoLeidas = notificaciones.filter((noti) => !noti.leida);
      setContador(notificacionesNoLeidas.length - 1);
    } catch (err) {
      console.error('Error al marcar como leída:', err);
    }
  };

  return (
    <div className="notificaciones-container">
      <h2>Notificaciones</h2>
      {error && <p className="error-message">{error}</p>}
      {notificaciones.length > 0 ? (
        <ul>
          {notificaciones.map((noti) => (
            <li key={noti._id} className={noti.leida ? 'leida' : 'nueva'}>
              {noti.mensaje}
              {!noti.leida && (
                <button onClick={() => marcarComoLeida(noti._id)}>Marcar como leída</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes notificaciones.</p>
      )}
    </div>
  );
};

export default Notificaciones;
