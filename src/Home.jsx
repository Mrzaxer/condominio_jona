import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">

      <header className="navbar">
        <div className="logo">
        <img src="/imagenes/logo5.png" alt="logo" width="80" height="80" />
          <span><h1>Administrador</h1></span>
        </div>
        <nav className="menu">
                  <Link to="/pagos">Pagos</Link>
                  <Link to="/multas">Multas</Link>
                  <Link to="/permisos">Permisos</Link>
                  <Link to="/perfiles">Perfiles</Link>
                  <Link to="/">Cerrrar Sesión</Link>
                </nav>
      </header>
      
      
      <main className="main-content">
        <h2>Notificaciones de inquilinos🔔</h2>
        <div className="notifications-box">

        </div>
      </main>
    </div>
  );
}

export default Home;
