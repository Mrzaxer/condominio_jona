import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const HomeU = () => {
  return (
    <div className="home-container">

      <header className="navbar">
        <div className="logo">
          <img src="/imagenes/logo5.png" alt="logo" width="80" height="80" />
          <span><h1>Inquilino</h1></span>
        </div>
        <nav className="menu">
          <Link to="/homeu">Inicio</Link>
          <Link to="/pagosu">Mis Pagos</Link>
          <Link to="/multasu">Mis Multas</Link>
          <Link to="/permisosu">Solicitar Permisos</Link>
          <Link to="/">Cerrar Sesión</Link>
        </nav>
      </header>
      
    
    </div>
  );
}

export default HomeU;
