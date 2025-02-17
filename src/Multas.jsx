import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Multas.css';

const Multas = () => {
  const [multas, setMultas] = useState([]);  
  const [error, setError] = useState('');  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchMultas = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener token de autenticación

        if (!token) {
          throw new Error('No tienes permisos para ver las multas.');
        }

        const response = await axios.get('https://api-mongo-5hdo.onrender.com/api/multas/si', {
          headers: {
            Authorization: `Bearer ${token}`  // Enviar token en el header
          }
        });

        setMultas(response.data);
      } catch (err) {
        console.error('Error al obtener las multas:', err);
        setError(err.response?.data?.message || 'Ocurrió un error al cargar las multas.');
      } finally {
        setLoading(false);
      }
    };

    fetchMultas();
  }, []);  

  return (
    <div className="multas-container">
      <header className="navbar">
        <div className="logo">
          <img src="/imagenes/logo5.png" alt="logo" width="80" height="80" />
          <h1>Administrador</h1>
        </div>
        <nav className="menu">
          <Link to="/home">Inicio</Link>
          <Link to="/pagos">Pagos</Link>
          <Link to="/multas">Multas</Link>
          <Link to="/permisos">Permisos</Link>
          <Link to="/perfiles">Perfiles</Link>
          <Link to="/">Cerrar Sesión</Link>
        </nav>
      </header>

      <h2>Multas</h2>

      {/* Mostrar mensaje de carga */}
      {loading && <p className="loading-message">Cargando multas...</p>}

      {/* Mostrar mensaje de error */}
      {error && <p className="error-message">{error}</p>}

      {/* Tabla de multas */}
      {!loading && !error && (
        <table className="multas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Motivo</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {multas.length > 0 ? (
              multas.map((multa) => (
                <tr key={multa.id}>
                  <td>{multa.id}</td>
                  <td>{multa.motivo}</td>
                  <td>{multa.monto}</td>
                  <td>{multa.estado}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay multas registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Botón para agregar nueva multa */}
      <div className="button-container">
        <Link to="/addmulta">
          <button className="add-multa-button">Agregar Nueva Multa</button>
        </Link>
      </div>
    </div>
  );
};

export default Multas;
