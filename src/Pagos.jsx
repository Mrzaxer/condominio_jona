import React from 'react';
import { Link } from 'react-router-dom';
import './Pagos.css';

const Pagos = () => {
  return (
    <div className="pagos-container">
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

      <div className="pagos-container">
        <h2>Pagos Pendientes</h2>
        <table className="pagos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Fecha</th>
            </tr>
          </thead>
        </table>

        <h2>Pagos Realizados</h2>
        <table className="pagos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Fecha</th>
            </tr>
          </thead>
        </table>

        <div className="button-container">
          <Link to="/addpago">
             <button className="add-payment-button">Agregar Nuevo Pago</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pagos;