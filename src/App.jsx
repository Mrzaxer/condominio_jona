import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Recuperar from './recuperar';
import Home from './Home';
import HomeU from './HomeU';

import Multas from './Multas';
import MultasU from './MultasU';
import AddMulta from './AddMulta';

// import Pagos from './Pagos';
// import PagosU from './PagosU';
// import AddPago from './AddPago';

// import Permisos from './Permisos';
// import AddPermiso from './AddPermiso';

// import Perfiles from './Perfiles';
// import AddPerfil from './AddPerfil';

import Notificaciones from './Notificaciones';
import Configuracion from './Configuracion';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de Autenticación */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperar" element={<Recuperar />} />

        {/* Rutas del Administrador */}
        <Route path="/home" element={<Home />} />
        <Route path="/multas" element={<Multas />} />
        <Route path="/addmulta" element={<AddMulta />} />

        {/* Rutas del Usuario */}
        <Route path="/homeu" element={<HomeU />} />
        <Route path="/multasu" element={<MultasU />} />

        {/* Configuración y Notificaciones */}
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
    </Router>
  );
}

export default App;
