import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import citaService from '../../services/citaService';
import pacienteService from '../../services/pacienteService';
import medicoService from '../../services/medicoService';
import './Citas.css';

function DetalleCita() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cita, setCita] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [medico, setMedico] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, [id]);

  const cargarDatos = async () => {
    try {
      const citaRes = await citaService.getById(id);
      setCita(citaRes.data);

      const [pacienteRes, medicoRes] = await Promise.all([
        pacienteService.getById(citaRes.data.idPaciente),
        medicoService.getById(citaRes.data.idMedico)
      ]);

      setPaciente(pacienteRes.data);
      setMedico(medicoRes.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar la cita');
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

  if (!cita) {
    return (
      <div className="module-container">
        <div className="error-message">Cita no encontrada</div>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <div>
          <h1>Detalles de la Cita</h1>
          <p>Información completa de la cita médica</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => navigate('/citas')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver
          </button>
          {cita.estado === 'programada' && (
            <button className="btn-primary" onClick={() => navigate(`/citas/editar/${id}`)}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Editar
            </button>
          )}
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="patient-avatar" style={{ background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)' }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="patient-info">
            <h2>Cita Médica</h2>
            <span className={`badge badge-${
              cita.estado === 'programada' ? 'warning' :
              cita.estado === 'atendida' ? 'success' : 'danger'
            }`}>
              {cita.estado}
            </span>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <label>Fecha</label>
            <p>{cita.fecha}</p>
          </div>
          <div className="detail-item">
            <label>Hora</label>
            <p>{cita.hora}</p>
          </div>
          <div className="detail-item full-width">
            <label>Paciente</label>
            <p>{paciente ? `${paciente.nombres} ${paciente.apellidos}` : 'Cargando...'}</p>
          </div>
          <div className="detail-item full-width">
            <label>Médico</label>
            <p>{medico ? `Dr. ${medico.nombres} ${medico.apellidos}` : 'Cargando...'}</p>
          </div>
          <div className="detail-item full-width">
            <label>Motivo de la Consulta</label>
            <p>{cita.motivo || 'No especificado'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleCita;