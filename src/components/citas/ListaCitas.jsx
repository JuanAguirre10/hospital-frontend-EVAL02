import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import citaService from '../../services/citaService';
import pacienteService from '../../services/pacienteService';
import medicoService from '../../services/medicoService';
import './Citas.css';

function ListaCitas() {
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('todas');
  const navigate = useNavigate();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [citasRes, pacientesRes, medicosRes] = await Promise.all([
        citaService.getAll(),
        pacienteService.getAll(),
        medicoService.getAll()
      ]);
      setCitas(citasRes.data);
      setPacientes(pacientesRes.data);
      setMedicos(medicosRes.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const obtenerNombrePaciente = (idPaciente) => {
    const paciente = pacientes.find(p => p.idPaciente === idPaciente);
    return paciente ? `${paciente.nombres} ${paciente.apellidos}` : 'Desconocido';
  };

  const obtenerNombreMedico = (idMedico) => {
    const medico = medicos.find(m => m.idMedico === idMedico);
    return medico ? `Dr. ${medico.nombres} ${medico.apellidos}` : 'Desconocido';
  };

  const handleCancelar = async (id) => {
    if (window.confirm('¿Está seguro de cancelar esta cita?')) {
      try {
        await citaService.cancelar(id);
        cargarDatos();
      } catch (error) {
        console.error('Error al cancelar cita:', error);
        alert('Error al cancelar la cita');
      }
    }
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await citaService.cambiarEstado(id, nuevoEstado);
      cargarDatos();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      alert('Error al cambiar el estado');
    }
  };

  const citasFiltradas = filtroEstado === 'todas' 
    ? citas 
    : citas.filter(cita => cita.estado === filtroEstado);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Cargando citas...</p>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <div>
          <h1>Gestión de Citas Médicas</h1>
          <p>Administra las citas del hospital</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/citas/nuevo')}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Nueva Cita
        </button>
      </div>

      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filtroEstado === 'todas' ? 'active' : ''}`}
          onClick={() => setFiltroEstado('todas')}
        >
          Todas
        </button>
        <button 
          className={`filter-tab ${filtroEstado === 'programada' ? 'active' : ''}`}
          onClick={() => setFiltroEstado('programada')}
        >
          Programadas
        </button>
        <button 
          className={`filter-tab ${filtroEstado === 'atendida' ? 'active' : ''}`}
          onClick={() => setFiltroEstado('atendida')}
        >
          Atendidas
        </button>
        <button 
          className={`filter-tab ${filtroEstado === 'cancelada' ? 'active' : ''}`}
          onClick={() => setFiltroEstado('cancelada')}
        >
          Canceladas
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Motivo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.length > 0 ? (
              citasFiltradas.map((cita) => (
                <tr key={cita.idCita}>
                  <td>{cita.fecha}</td>
                  <td>{cita.hora}</td>
                  <td>{obtenerNombrePaciente(cita.idPaciente)}</td>
                  <td>{obtenerNombreMedico(cita.idMedico)}</td>
                  <td>{cita.motivo}</td>
                  <td>
                    <span className={`badge badge-${
                      cita.estado === 'programada' ? 'warning' :
                      cita.estado === 'atendida' ? 'success' : 'danger'
                    }`}>
                      {cita.estado}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-view" 
                        onClick={() => navigate(`/citas/${cita.idCita}`)}
                        title="Ver detalles"
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </button>
                      {cita.estado === 'programada' && (
                        <>
                          <button 
                            className="btn-icon btn-edit" 
                            onClick={() => navigate(`/citas/editar/${cita.idCita}`)}
                            title="Editar"
                          >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button 
                            className="btn-icon btn-success" 
                            onClick={() => handleCambiarEstado(cita.idCita, 'atendida')}
                            title="Marcar como atendida"
                          >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button 
                            className="btn-icon btn-delete" 
                            onClick={() => handleCancelar(cita.idCita)}
                            title="Cancelar cita"
                          >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  No se encontraron citas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaCitas;