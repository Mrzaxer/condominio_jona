import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddPerfil.css';

const AddPerfil = () => {
  const [form, setForm] = useState({
    id: '',
    nombre: '',
    telefono: '',
    correo: '',
    contraseña: '',
    torre: '',
    departamento: '',
    tipoPerfil: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Perfil creado:', form);
    setForm({
      id: '',
      nombre: '',
      telefono: '',
      correo: '',
      contraseña: '',
      torre: '',
      departamento: '',
      tipoPerfil: ''
    });
  };

  const handleCancel = () => {
    setForm({
      id: '',
      nombre: '',
      telefono: '',
      correo: '',
      contraseña: '',
      torre: '',
      departamento: '',
      tipoPerfil: ''
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
          <Link to="/perfiles">Volver</Link>
        </nav>
      </header>
      <div className="add-perfil-container">
        <h2>Crear Nuevo Perfil</h2>
        <form onSubmit={handleSubmit} className="perfil-form">
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
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Número de Teléfono"
            value={form.telefono}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={form.contraseña}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="torre"
            placeholder="Torre"
            value={form.torre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="departamento"
            placeholder="Departamento"
            value={form.departamento}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tipoPerfil"
            placeholder="Tipo de Perfil"
            value={form.tipoPerfil}
            onChange={handleChange}
            required
          />
          <div className="button-container">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="create-button">
              Crear Perfil
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPerfil;