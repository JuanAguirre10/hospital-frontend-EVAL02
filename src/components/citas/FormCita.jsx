import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import citaService from '../../services/citaService';
import pacienteService from '../../services/pacienteService';
import medicoService from '../../services/medicoService';
import './Citas.css';

function FormCita() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [cita, setCita] = useState({
    idPaciente: '',
    idMedico: '',
    fecha: '',
    hora: '',
    motivo: '',
    estado: 'programada'
  });

  useEffect(() => {
    cargarDatos();
    if (id) {
      cargarCita();
    }
  }, [id]);

  const cargarDatos = async () => {
    try {
      const [pacientesRes, medicosRes] = await Promise.all([
        pacienteService.getAll(),
        medicoService.getActivos()
      ]);
      setPacientes(pacientesRes.data);
      setMedicos(medicosRes.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  const cargarCita = async () => {
    try {
      const response = await citaService.getById(id);
      setCita(response.data);
    } catch (error) {
      console.error('Error al cargar cita:', error);
      alert('Error al cargar la cita');
    }
  };

  const handleChange = (e) => {
    setCita({
      ...cita,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await citaService.update(id, cita);
        alert('Cita actualizada correctamente');
      } else {
        await citaService.create(cita);
        alert('Cita agendada correctamente');
      }
      navigate('/citas');
    } catch (error) {
      console.error('Error al guardar cita:', error);
      alert('Error al guardar la cita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <div>
          <h1>{id ? 'Editar Cita' : 'Nueva Cita'}</h1>
          <p>Complete el formulario para agendar la cita</p>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/citas')}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Volver
        </button>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="idPaciente">Paciente *</label>
              <select
                id="idPaciente"
                name="idPaciente"
                value={cita.idPaciente}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un paciente</option>
                {pacientes.map(paciente => (
                  <option key={paciente.idPaciente} value={paciente.idPaciente}>
                    {paciente.nombres} {paciente.apellidos} - {paciente.dni}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="idMedico">Médico *</label>
              <select
                id="idMedico"
                name="idMedico"
                value={cita.idMedico}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un médico</option>
                {medicos.map(medico => (
                  <option key={medico.idMedico} value={medico.idMedico}>
                    Dr. {medico.nombres} {medico.apellidos}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fecha">Fecha *</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={cita.fecha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hora">Hora *</label>
              <input
                type="time"
                id="hora"
                name="hora"
                value={cita.hora}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="motivo">Motivo de la Consulta</label>
              <textarea
                id="motivo"
                name="motivo"
                value={cita.motivo}
                onChange={handleChange}
                rows="3"
                placeholder="Describa el motivo de la consulta..."
              />
            </div>

            {id && (
              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  name="estado"
                  value={cita.estado}
                  onChange={handleChange}
                >
                  <option value="programada">Programada</option>
                  <option value="atendida">Atendida</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/citas')}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Guardando...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 21V13H7V21M7 3V8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {id ? 'Actualizar' : 'Agendar'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCita;