import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import ListaPacientes from './components/pacientes/ListaPacientes';
import FormPaciente from './components/pacientes/FormPaciente';
import DetallePaciente from './components/pacientes/DetallePaciente';
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
        
        <Route 
          path="/medicos" 
          element={
            <PrivateRoute>
              <Layout>
                <div style={{ padding: '30px' }}>
                  <h1>Módulo de Médicos</h1>
                  <p>Próximamente...</p>
                </div>
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/citas" 
          element={
            <PrivateRoute>
              <Layout>
                <div style={{ padding: '30px' }}>
                  <h1>Módulo de Citas</h1>
                  <p>Próximamente...</p>
                </div>
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/consultas" 
          element={
            <PrivateRoute>
              <Layout>
                <div style={{ padding: '30px' }}>
                  <h1>Módulo de Consultas</h1>
                  <p>Próximamente...</p>
                </div>
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/hospitalizacion" 
          element={
            <PrivateRoute>
              <Layout>
                <div style={{ padding: '30px' }}>
                  <h1>Módulo de Hospitalización</h1>
                  <p>Próximamente...</p>
                </div>
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/facturacion" 
          element={
            <PrivateRoute>
              <Layout>
                <div style={{ padding: '30px' }}>
                  <h1>Módulo de Facturación</h1>
                  <p>Próximamente...</p>
                </div>
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