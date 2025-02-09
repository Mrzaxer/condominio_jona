import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import './AddMulta.css';

const AddMulta = () => {
  const [form, setForm] = useState({
    direccion: '',  // Dirección del inquilino
    motivo: '',
    monto: '',
    estado: 'pendiente' // Estado por defecto 'pendiente'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);  // Nuevo estado de carga
  const [showModal, setShowModal] = useState(false);  // Controlar la visibilidad del modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);  // Iniciar carga

    try {
      const response = await axios.post('http://localhost:5000/api/multas/no', form);
      setSuccess('Multa creada exitosamente. Notificación enviada.');
      setShowModal(true);  // Mostrar el modal de éxito

      // Limpiar el formulario después de crear la multa
      setForm({
        direccion: '',
        motivo: '',
        monto: '',
        estado: 'pendiente'
      });
    } catch (err) {
      console.error('Error al crear la multa:', err);
      const message = err.response?.data?.message || 'Ocurrió un error al crear la multa. Intenta nuevamente.';
      setError(message);
    } finally {
      setLoading(false);  // Terminar carga
    }
  };

  const handleCancel = () => {
    setForm({
      direccion: '',
      motivo: '',
      monto: '',
      estado: 'pendiente'
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
          <input
            type="text"
            name="direccion"
            placeholder="Dirección del Inquilino"
            value={form.direccion}
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
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
          >
            <option value="pendiente">Pendiente</option>
            <option value="pagado">Pagado</option>
          </select>

          <div className="button-container">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancelar
            </button>

            {/* Transición de "Cargando" */}
            <CSSTransition
              in={loading}
              timeout={300}
              classNames="loading"
              unmountOnExit
            >
              <button type="button" className="create-button" disabled>
                Cargando...
              </button>
            </CSSTransition>

            {/* Botón de crear multa */}
            <CSSTransition
              in={!loading}
              timeout={300}
              classNames="loading"
              unmountOnExit
            >
              <button type="submit" className="create-button">
                Crear Multa
              </button>
            </CSSTransition>
          </div>
        </form>

        {/* Mensajes de éxito o error */}
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Modal de éxito */}
      <CSSTransition
        in={showModal}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content">
            <h2>Éxito</h2>
            <p>{success}</p>
            <button onClick={() => setShowModal(false)} className="close-button">Cerrar</button>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default AddMulta;
