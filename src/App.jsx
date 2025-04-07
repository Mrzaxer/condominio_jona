import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Restablecer from './Restablecer';
import Home from './Home';
import HomeU from './HomeU';
import Multas from './Multas';
import MultasU from './MultasU';
import AddMulta from './AddMulta';
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

import Notificaciones from './Notificaciones';
import Configuracion from './configuracion';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de Autenticación */}
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Restablecer" element={<Restablecer />} />

        {/* Rutas del Administrador */}
        <Route path="/Home" element={<Home />} />
        <Route path="/Multas" element={<Multas />} />
        <Route path="/Addmulta" element={<AddMulta />} />

        {/* Rutas del Usuario */}
        <Route path="/Homeu" element={<HomeU />} />
        <Route path="/Multasu" element={<MultasU />} />

        {/* Configuración y Notificaciones */}
        <Route path="/Notificaciones" element={<Notificaciones />} />
        <Route path="/Configuracion" element={<Configuracion />} />

        {/* Restablecimiento de contraseña */}
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        
      </Routes>
    </Router>
  );
}

export default App;
