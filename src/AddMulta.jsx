import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AddMulta.css';

const AddMulta = () => {
  const [form, setForm] = useState({
    direccion: '',  // Dirección del inquilino
    motivo: '',
    monto: '',
    estado: 'pendiente' // Estado por defecto 'pending' o el que corresponda
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Controlador para manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Enviar la solicitud para crear la multa
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Hacemos la solicitud para crear la multa
      const response = await axios.post('http://localhost:5000/api/multas/no', form);

      // Suponemos que el backend envía una notificación al inquilino
      setSuccess('Multa creada exitosamente. Notificación enviada.');

      // Limpiar el formulario después de crear la multa
      setForm({
        direccion: '',
        motivo: '',
        monto: '',
        estado: 'pendiente' // Reinicia el estado
      });
    } catch (err) {
      console.error('Error al crear la multa:', err);
      const message = err.response?.data?.message || 'Ocurrió un error al crear la multa. Intenta nuevamente.';
      setError(message);
    }
  };

  // Función para cancelar el formulario
  const handleCancel = () => {
    setForm({
      direccion: '',
      motivo: '',
      monto: '',
      estado: 'pendiente' // Reinicia el estado
    });
    setError('');
    setSuccess('');
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
          {/* Campo para dirección del inquilino */}
          <input
            type="text"
            name="direccion"
            placeholder="Dirección del Inquilino"
            value={form.direccion}
            onChange={handleChange}
            required
          />
          
          {/* Campo para motivo */}
          <input
            type="text"
            name="motivo"
            placeholder="Motivo"
            value={form.motivo}
            onChange={handleChange}
            required
          />
          
          {/* Campo para monto */}
          <input
            type="number"
            name="monto"
            placeholder="Monto"
            value={form.monto}
            onChange={handleChange}
            required
          />
          
          {/* Campo para estado de la multa */}
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
          >
            <option value="pendiente">Pendiente</option>
            <option value="pagado">Pagado</option>
            
          </select>

          {/* Botones para cancelar o enviar */}
          <div className="button-container">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="create-button">
              Crear Multa
            </button>
          </div>
        </form>

        {/* Mensajes de éxito o error */}
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </>
  );
};

export default AddMulta;