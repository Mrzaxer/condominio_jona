import React from 'react';
import { Link } from 'react-router-dom';
import './Multas.css';

const Multas = () => {
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