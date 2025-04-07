import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificación manual de autenticación
  useEffect(() => {
    const verifyAuthentication = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('userRole');

      if (!token) {
        navigate('/');
        return;
      }

      try {
        // Verificación manual con el backend
        await axios.get('https://api-mongo-5hdo.onrender.com/api/users/verify', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Verificación manual del rol
        if (role !== 'admin') {
          navigate('/homeu');
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error de verificación:', error);
        localStorage.clear();
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuthentication();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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
      
      {/* Resto de tu contenido */}
    </div>
  );
};

export default Home;