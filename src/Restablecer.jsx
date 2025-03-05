import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Restablecer.css';

const Restablecer = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    try {
      const response = await axios.post('https://api-mongo-5hdo.onrender.com/api/users/recover', { phone });
      setMessage(response.data.message || 'Código enviado a tu WhatsApp.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar el código.');
      setMessage('');
    }
  };

  return (
    <div className="recuperar-container">
      <div className="recuperar-box">
        <h2>Recuperar Contraseña</h2>
        <p>Ingresa tu número de teléfono y te enviaremos un código por WhatsApp.</p>
        
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        
        <div>
          <label htmlFor="phone">Teléfono</label>
          <input
            type="text"
            id="phone"
            placeholder="Ingrese su teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        
        <button onClick={handleSendCode}>Enviar Código</button>
        <button onClick={() => navigate('/')} className="back-button">Volver</button>
      </div>
    </div>
  );
};

export default Restablecer;