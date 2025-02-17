import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    direccion: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Para redirigir después del registro

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.role !== 'admin' && formData.role !== 'inquilino') {
      return setMessage('Por favor selecciona un rol válido (Administrador o Inquilino)');
    }

    try {
      const response = await axios.post('https://api-mongo-5hdo.onrender.com/api/users/register', formData);
      
      // Extraer el token y los datos del usuario
      const { token, role, direccion } = response.data;

      // Guardar manualmente el token y datos en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('departamento', direccion); // Dirección equivale a departamento

      setMessage('Usuario registrado exitosamente');
      
      // Redirigir a la página correspondiente
      if (role === 'admin') {
        navigate('/Home');  
      } else if (role === 'inquilino') {
        navigate('/HomeU'); 
      }

    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Error en el registro');
      } else {
        setMessage('Error de conexión con el servidor');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          value={formData.nombre}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          onChange={handleChange}
          value={formData.phone}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={formData.password}
          required
        />
        
        <select
          name="role"
          onChange={handleChange}
          value={formData.role}
          required
        >
          <option value="">Seleccionar Rol</option>
          <option value="admin">Administrador</option>
          <option value="inquilino">Inquilino</option>
        </select>

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          onChange={handleChange}
          value={formData.direccion}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
