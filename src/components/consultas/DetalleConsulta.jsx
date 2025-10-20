import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import consultaService from '../../services/consultaService';
import './Consultas.css';

function DetalleConsulta() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [consulta, setConsulta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarConsulta();
  }, [id]);

  const cargarConsulta = async () => {
    try {
      const response = await consultaService.getById(id);
      setConsulta(response.data);
    } catch (error) {
      console.error('Error al cargar consulta:', error);
      alert('Error al cargar la consulta');
    } finally {
      setLoading(false);
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

  if (!consulta) {
    return (
      <div className="module-container">
        <div className="error-message">Consulta no encontrada</div>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <div>
          <h1>Detalles de la Consulta</h1>
          <p>Información completa de la consulta médica</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => navigate('/consultas')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver
          </button>
          <button className="btn-primary" onClick={() => navigate(`/consultas/editar/${id}`)}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Editar
          </button>
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="patient-avatar">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="patient-info">
            <h2>Consulta #{consulta.idConsulta}</h2>
            <span className="badge badge-success">Registrada</span>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <label>Fecha</label>
            <p>{consulta.fecha}</p>
          </div>
          <div className="detail-item">
            <label>Hora</label>
            <p>{consulta.hora}</p>
          </div>
          <div className="detail-item">
            <label>ID Paciente</label>
            <p>{consulta.idPaciente}</p>
          </div>
          <div className="detail-item">
            <label>ID Médico</label>
            <p>{consulta.idMedico}</p>
          </div>
          <div className="detail-item full-width">
            <label>Motivo de Consulta</label>
            <p>{consulta.motivoConsulta || 'No registrado'}</p>
          </div>
          <div className="detail-item full-width">
            <label>Observaciones</label>
            <p>{consulta.observaciones || 'Sin observaciones'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleConsulta;