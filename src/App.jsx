import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import ListaPacientes from './components/pacientes/ListaPacientes';
import FormPaciente from './components/pacientes/FormPaciente';
import DetallePaciente from './components/pacientes/DetallePaciente';
import ListaMedicos from './components/medicos/ListaMedicos';
import FormMedico from './components/medicos/FormMedico';
import DetalleMedico from './components/medicos/DetalleMedico';
import ListaCitas from './components/citas/ListaCitas';
import FormCita from './components/citas/FormCita';
import DetalleCita from './components/citas/DetalleCita';
import ListaConsultas from './components/consultas/ListaConsultas';
import FormConsulta from './components/consultas/FormConsulta';
import DetalleConsulta from './components/consultas/DetalleConsulta';
import ListaHospitalizaciones from './components/hospitalizacion/ListaHospitalizaciones';
import FormHospitalizacion from './components/hospitalizacion/FormHospitalizacion';
import DetalleHospitalizacion from './components/hospitalizacion/DetalleHospitalizacion';
import ListaFacturas from './components/facturacion/ListaFacturas';
import FormFactura from './components/facturacion/FormFactura';
import DetalleFactura from './components/facturacion/DetalleFactura';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import authService from './services/authService';
import './App.css';

function PrivateRoute({ children }) {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
}

function Layout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        {/* PACIENTES */}
        <Route 
          path="/pacientes" 
          element={
            <PrivateRoute>
              <Layout>
                <ListaPacientes />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/pacientes/nuevo" 
          element={
            <PrivateRoute>
              <Layout>
                <FormPaciente />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/pacientes/editar/:id" 
          element={
            <PrivateRoute>
              <Layout>
                <FormPaciente />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/pacientes/:id" 
          element={
            <PrivateRoute>
              <Layout>
                <DetallePaciente />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        {/* MÉDICOS */}
        <Route 
          path="/medicos" 
          element={
            <PrivateRoute>
              <Layout>
                <ListaMedicos />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/medicos/nuevo" 
          element={
            <PrivateRoute>
              <Layout>
                <FormMedico />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/medicos/editar/:id" 
          element={
            <PrivateRoute>
              <Layout>
                <FormMedico />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/medicos/:id" 
          element={
            <PrivateRoute>
              <Layout>
                <DetalleMedico />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        {/* CITAS */}
        <Route 
          path="/citas" 
          element={
            <PrivateRoute>
              <Layout>
                <ListaCitas />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/citas/nuevo" 
          element={
            <PrivateRoute>
              <Layout>
                <FormCita />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/citas/editar/:id" 
          element={
            <PrivateRoute>
              <Layout>
                <FormCita />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/citas/:id" 
          element={
            <PrivateRoute>
              <Layout>
                <DetalleCita />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        {/* CONSULTAS */}
        <Route 
          path="/consultas" 
          element={
            <PrivateRoute>
              <Layout>
                <ListaConsultas />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/consultas/nuevo" 
          element={
            <PrivateRoute>
              <Layout>
                <FormConsulta />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/consultas/editar/:id" 
          element={
            <PrivateRoute>
              <Layout>
                <FormConsulta />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/consultas/:id" 
          element={
            <PrivateRoute>
              <Layout>
                <DetalleConsulta />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        {/* HOSPITALIZACIÓN */}
        <Route 
          path="/hospitalizacion" 
          element={
            <PrivateRoute>
              <Layout>
                <ListaHospitalizaciones />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/hospitalizacion/nuevo" 
          element={
            <PrivateRoute>
              <Layout>
                <FormHospitalizacion />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/hospitalizacion/editar/:id" 
          element={
            <PrivateRoute>
              <Layout>
                <FormHospitalizacion />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/hospitalizacion/:id" 
          element={
            <PrivateRoute>
              <Layout>
                <DetalleHospitalizacion />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        {/* FACTURACIÓN */}
        <Route 
          path="/facturacion" 
          element={
            <PrivateRoute>
              <Layout>
                <ListaFacturas />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/facturacion/nuevo" 
          element={
            <PrivateRoute>
              <Layout>
                <FormFactura />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/facturacion/editar/:id" 
          element={
            <PrivateRoute>
              <Layout>
                <FormFactura />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/facturacion/:id" 
          element={
            <PrivateRoute>
              <Layout>
                <DetalleFactura />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;