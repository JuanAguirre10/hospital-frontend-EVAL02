import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import authService from './services/authService';
import './App.css';

function PrivateRoute({ children }) {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
}

function Dashboard() {
  const user = authService.getCurrentUser();
  
  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      <h1>Bienvenido, {user?.nombreUsuario}</h1>
      <p>Rol: {user?.rol}</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
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
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;