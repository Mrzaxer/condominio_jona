import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Pagos from './Pagos';
import Multas from './Multas';
import Permisos from './Permisos';
import Perfiles from './Perfiles';
import AddPermiso from './AddPermiso';
import AddPago from './AddPago';
import AddMulta from './AddMulta';
import AddPerfil from './AddPerfil';
import HomeU from './HomeU'
import MultasU from './MultasU';
import PagosU from './PagosU';
import Notificaciones from './Notificaciones';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />        
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/multas" element={<Multas />} />
        <Route path="/permisos" element={<Permisos />} />
        <Route path="/perfiles" element={<Perfiles />} />
        <Route path="/addpermiso" element={<AddPermiso />} />
        <Route path="/addpago" element={<AddPago />} />
        <Route path="/addmulta" element={<AddMulta />} />
        <Route path="/addperfil" element={<AddPerfil />} />
        <Route path="/homeu" element={<HomeU />} />
        <Route path="/MultasU" element={<MultasU />} />
        <Route path="/PagosU" element={<PagosU />} />
        <Route path="/Notificaciones" element={<Notificaciones />} />

      </Routes>
    </Router>
  );
}

export default App;