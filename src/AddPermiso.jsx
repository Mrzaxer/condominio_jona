import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddPermiso.css';

const AddPermiso = () => {
  const [form, setForm] = useState({
    id: '',
    tipoPermiso: '',
    autorizacion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Permiso creado:', form);
    setForm({
      id: '',
      tipoPermiso: '',
      autorizacion: ''
    });
  };

  const handleCancel = () => {
    setForm({
      id: '',
      tipoPermiso: '',
      autorizacion: ''
    });
  };

  return (
    <>
      <header className="navbar">
        <div className="logo">
          <img src="/imagenes/logo5.png" alt="logo" width="80" height="80" />
          <h1>Administrador</h1>
        </div>
        <nav className="menu">
          <Link to="/permisos">Volver</Link>
        </nav>
      </header>
      <div className="add-permiso-container">
        <h2>Crear Nuevo Permiso</h2>
        <form onSubmit={handleSubmit} className="permiso-form">
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={form.id}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tipoPermiso"
            placeholder="Tipo de Permiso"
            value={form.tipoPermiso}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="autorizacion"
            placeholder="Autorización"
            value={form.autorizacion}
            onChange={handleChange}
            required
          />
          <div className="button-container">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="create-button">
              Crear Permiso
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPermiso;