import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import pacienteService from '../../services/pacienteService';
import './Pacientes.css';

function DetallePaciente() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPaciente();
  }, [id]);

  const cargarPaciente = async () => {
    try {
      const response = await pacienteService.getById(id);
      setPaciente(response.data);
    } catch (error) {
      console.error('Error al cargar paciente:', error);
      alert('Error al cargar el paciente');
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

  if (!paciente) {
    return (
      <div className="module-container">
        <div className="error-message">Paciente no encontrado</div>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <div>
          <h1>Detalles del Paciente</h1>
          <p>Información completa del paciente</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => navigate('/pacientes')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver
          </button>
          <button className="btn-primary" onClick={() => navigate(`/pacientes/editar/${id}`)}>
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
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="patient-info">
            <h2>{paciente.nombres} {paciente.apellidos}</h2>
            <span className={`badge ${paciente.estado === 'activo' ? 'badge-success' : 'badge-danger'}`}>
              {paciente.estado}
            </span>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <label>DNI</label>
            <p>{paciente.dni}</p>
          </div>
          <div className="detail-item">
            <label>Fecha de Nacimiento</label>
            <p>{paciente.fechaNacimiento || 'No registrado'}</p>
          </div>
          <div className="detail-item">
            <label>Sexo</label>
            <p>{paciente.sexo === 'M' ? 'Masculino' : 'Femenino'}</p>
          </div>
          <div className="detail-item">
            <label>Teléfono</label>
            <p>{paciente.telefono || 'No registrado'}</p>
          </div>
          <div className="detail-item full-width">
            <label>Correo Electrónico</label>
            <p>{paciente.correo || 'No registrado'}</p>
          </div>
          <div className="detail-item full-width">
            <label>Dirección</label>
            <p>{paciente.direccion || 'No registrado'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallePaciente;