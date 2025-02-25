import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <img src="/imagenes/logo5.png" alt="logo" width="80" height="80" />
          <h1>Administrador</h1>
        </div>
        <nav className="menu">
          <Link to="/pagos">Pagos</Link>
          <Link to="/multas">Multas</Link>
          <Link to="/permisos">Permisos</Link>
          <Link to="/perfiles">Perfiles</Link>
          <Link to="/configuracion" className="configuracion-button">
            <FaCog size={20} />
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Home;
