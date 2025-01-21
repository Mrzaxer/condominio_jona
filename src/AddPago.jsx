import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddPago.css';

const AddPago = () => {
  const [form, setForm] = useState({
    id: '',
    descripcion: '',
    monto: '',
    fecha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pago creado:', form);
    setForm({
      id: '',
      descripcion: '',
      monto: '',
      fecha: ''
    });
  };

  const handleCancel = () => {
    setForm({
      id: '',
      descripcion: '',
      monto: '',
      fecha: ''
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
          <Link to="/pagos">Volver</Link>
        </nav>
      </header>
      <div className="add-pago-container">
        <h2>Crear Nuevo Pago</h2>
        <form onSubmit={handleSubmit} className="pago-form">
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
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
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
            type="date"
            name="fecha"
            placeholder="Fecha"
            value={form.fecha}
            onChange={handleChange}
            required
          />
          <div className="button-container">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="create-button">
              Crear Pago
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPago;