import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí puedes agregar la lógica de autenticación
    navigate('/home');
  }

  function handlePhoneChange(e) {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenido</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Número de teléfono</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}             
              pattern="\d*"
              maxLength="10"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;