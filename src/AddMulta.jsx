import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddMulta.css';

const AddMulta = () => {
  const [form, setForm] = useState({
    id: '',
    motivo: '',
    monto: '',
    estado: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Multa creada:', form);
    setForm({
      id: '',
      motivo: '',
      monto: '',
      estado: ''
    });
  };

  const handleCancel = () => {
    setForm({
      id: '',
      motivo: '',
      monto: '',
      estado: ''
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
          <Link to="/multas">Volver</Link>
        </nav>
      </header>
      <div className="add-multa-container">
        <h2>Crear Nueva Multa</h2>
        <form onSubmit={handleSubmit} className="multa-form">
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
            name="motivo"
            placeholder="Motivo"
            value={form.motivo}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="monto"
            placeholder="Monto"
            value={form.monto}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={form.estado}
            onChange={handleChange}
            required
          />
          <div className="button-container">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="create-button">
              Crear Multa
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMulta;