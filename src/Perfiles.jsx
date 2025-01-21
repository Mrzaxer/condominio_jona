import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Perfiles.css';

const Perfiles = () => {
  const [profiles, setProfiles] = useState([]);

  const handleDelete = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <div className="perfiles-container">
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
      
      <h2>Gestión de Perfiles</h2>
      <table className="profiles-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Torre</th>
            <th>Departamento</th>
            <th>Tipo de Perfil</th>
            <th>Acciones</th>
          </tr>
        </thead>
      </table>
      <div className="button-container">
        <Link to="/addperfil">
          <button className="add-button">Agregar perfil</button>
        </Link>
      </div>
    </div>
  );
};

export default Perfiles;