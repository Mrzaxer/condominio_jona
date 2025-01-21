import React from 'react';
import { Link } from 'react-router-dom';
import './Permisos.css';

const Permisos = () => {
  return (
    <div className="permisos-container">
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

      <h2>Lista de Permisos</h2>
      <table className="permisos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Permiso</th>
            <th>Autorización</th>
          </tr>
        </thead>
      </table>
      <div className="button-container">
      <Link to="/addpermiso">
          <button className="assign-button">Asignar permiso</button>
        </Link>
      </div>
    </div>
  );
};

export default Permisos;