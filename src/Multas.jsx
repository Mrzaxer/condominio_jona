import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Multas.css';

const Multas = () => {
  const [multas, setMultas] = useState([]); // Estado para almacenar las multas
  const [error, setError] = useState('');  // Estado para manejar errores

  // Función para obtener las multas desde la API
  useEffect(() => {
    const fetchMultas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/multas/si'); // Cambia esta URL según tu backend
        setMultas(response.data); // Almacena las multas en el estado
      } catch (err) {
        console.error('Error al obtener las multas:', err);
        setError('Ocurrió un error al cargar las multas. Intenta nuevamente.');
      }
    };

    fetchMultas();
  }, []); // Se ejecuta solo una vez al montar el componente

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
      <div className="button-container">
        <Link to="/addmulta">
          <button className="add-multa-button">Agregar Nueva Multa</button>
        </Link>
      </div>
    </div>
  );
};

export default Multas;
