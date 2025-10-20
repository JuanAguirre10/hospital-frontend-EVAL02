import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import hospitalizacionService from '../../services/hospitalizacionService';
import './Hospitalizacion.css';

function DetalleHospitalizacion() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hospitalizacion, setHospitalizacion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarHospitalizacion();
  }, [id]);

  const cargarHospitalizacion = async () => {
    try {
      const response = await hospitalizacionService.getById(id);
      setHospitalizacion(response.data);
    } catch (error) {
      console.error('Error al cargar hospitalización:', error);
      alert('Error al cargar la hospitalización');
    } finally {
      setLoading(false);
    }
  };

  const handleDarAlta = async () => {
    const fechaAlta = prompt('Ingrese la fecha de alta (YYYY-MM-DD):');
    if (fechaAlta) {
      try {
        await hospitalizacionService.darAlta(id, fechaAlta);
        alert('Alta registrada correctamente');
        cargarHospitalizacion();
      } catch (error) {
        console.error('Error al dar de alta:', error);
        alert('Error al registrar el alta');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Cargando información...</p>
      </div>
    );
  }

  if (!hospitalizacion) {
    return (
      <div className="module-container">
        <div className="error-message">Hospitalización no encontrada</div>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <div>
          <h1>Detalles de la Hospitalización</h1>
          <p>Información completa del internamiento</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => navigate('/hospitalizacion')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver
          </button>
          {hospitalizacion.estado === 'activo' && (
            <button className="btn-primary" onClick={handleDarAlta}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Dar de Alta
            </button>
          )}
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="patient-avatar">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="patient-info">
            <h2>Hospitalización #{hospitalizacion.idHosp}</h2>
            <span className={`badge ${hospitalizacion.estado === 'activo' ? 'badge-success' : 'badge-danger'}`}>
              {hospitalizacion.estado}
            </span>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <label>ID Paciente</label>
            <p>{hospitalizacion.idPaciente}</p>
          </div>
          <div className="detail-item">
            <label>ID Habitación</label>
            <p>{hospitalizacion.idHabitacion}</p>
          </div>
          <div className="detail-item">
            <label>Fecha de Ingreso</label>
            <p>{hospitalizacion.fechaIngreso}</p>
          </div>
          <div className="detail-item">
            <label>Fecha de Alta</label>
            <p>{hospitalizacion.fechaAlta || 'Sin alta'}</p>
          </div>
          <div className="detail-item full-width">
            <label>Diagnóstico de Ingreso</label>
            <p>{hospitalizacion.diagnosticoIngreso || 'No registrado'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleHospitalizacion;