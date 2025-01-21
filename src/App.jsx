import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Pagos from './Pagos';
import Multas from './Multas';
import Permisos from './Permisos';
import Perfiles from './Perfiles';
import AddPermiso from './AddPermiso';
import AddPago from './AddPago';
import AddMulta from './AddMulta';
import AddPerfil from './AddPerfil';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/multas" element={<Multas />} />
        <Route path="/permisos" element={<Permisos />} />
        <Route path="/perfiles" element={<Perfiles />} />
        <Route path="/addpermiso" element={<AddPermiso />} />
        <Route path="/addpago" element={<AddPago />} />
        <Route path="/addmulta" element={<AddMulta />} />
        <Route path="/addperfil" element={<AddPerfil />} />
      </Routes>
    </Router>
  );
}

export default App;