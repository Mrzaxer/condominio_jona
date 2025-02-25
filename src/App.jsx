import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
//import Pagos from './Pagos';
import Multas from './Multas';
//import Permisos from './Permisos';
//import Perfiles from './Perfiles';
//import AddPermiso from './AddPermiso';
//import AddPago from './AddPago';
import AddMulta from './AddMulta';
//import AddPerfil from './AddPerfil';
import HomeU from './HomeU'
import MultasU from './MultasU';
//import PagosU from './PagosU';
import Notificaciones from './Notificaciones';
import Configuracion from './configuracion';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />        
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
       
        <Route path="/multas" element={<Multas />} />
       
   
      
      
        <Route path="/addmulta" element={<AddMulta />} />
      
        <Route path="/homeu" element={<HomeU />} />
        <Route path="/MultasU" element={<MultasU />} />
        
        <Route path="/Notificaciones" element={<Notificaciones />} />
        <Route path="/configuracion" element={<Configuracion />} />


      </Routes>
    </Router>
  );
}

export default App;