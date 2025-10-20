import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hospitalizacionService from '../../services/hospitalizacionService';
import './Hospitalizacion.css';

function ListaHospitalizaciones() {
  const [hospitalizaciones, setHospitalizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    cargarHospitalizaciones();
  }, []);

  const cargarHospitalizaciones = async () => {
    try {
      const response = await hospitalizacionService.getAll();
      setHospitalizaciones(response.data);
    } catch (error) {
      console.error('Error al cargar hospitalizaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDarAlta = async (id) => {
    const fechaAlta = prompt('Ingrese la fecha de alta (YYYY-MM-DD):');
    if (fechaAlta) {
      try {
        await hospitalizacionService.darAlta(id, fechaAlta);
        alert('Alta registrada correctamente');
        cargarHospitalizaciones();
      } catch (error) {
        console.error('Error al dar de alta:', error);
        alert('Error al registrar el alta');
      }
    }
  };

  const hospitalizacionesFiltradas = hospitalizaciones.filter(hosp =>
    hosp.diagnosticoIngreso?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (hosp.idPaciente && hosp.idPaciente.toString().includes(searchTerm)) ||
    hosp.estado?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Cargando hospitalizaciones...</p>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <div>
          <h1>Gestión de Hospitalización</h1>
          <p>Administra los pacientes hospitalizados</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/hospitalizacion/nuevo')}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Nueva Hospitalización
        </button>
      </div>

      <div className="search-bar">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Buscar por diagnóstico, ID paciente o estado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Paciente</th>
              <th>ID Habitación</th>
              <th>Fecha Ingreso</th>
              <th>Fecha Alta</th>
              <th>Diagnóstico</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {hospitalizacionesFiltradas.length > 0 ? (
              hospitalizacionesFiltradas.map((hosp) => (
                <tr key={hosp.idHosp}>
                  <td>{hosp.idHosp}</td>
                  <td>{hosp.idPaciente}</td>
                  <td>{hosp.idHabitacion}</td>
                  <td>{hosp.fechaIngreso}</td>
                  <td>{hosp.fechaAlta || 'Sin alta'}</td>
                  <td>{hosp.diagnosticoIngreso}</td>
                  <td>
                    <span className={`badge ${hosp.estado === 'activo' ? 'badge-success' : 'badge-danger'}`}>
                      {hosp.estado}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-view" 
                        onClick={() => navigate(`/hospitalizacion/${hosp.idHosp}`)}
                        title="Ver detalles"
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </button>
                      {hosp.estado === 'activo' && (
                        <button 
                          className="btn-icon btn-edit" 
                          onClick={() => handleDarAlta(hosp.idHosp)}
                          title="Dar de alta"
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  No se encontraron hospitalizaciones
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaHospitalizaciones;