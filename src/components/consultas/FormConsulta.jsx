import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import consultaService from '../../services/consultaService';
import pacienteService from '../../services/pacienteService';
import medicoService from '../../services/medicoService';
import citaService from '../../services/citaService';
import './Consultas.css';

function FormConsulta() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [citas, setCitas] = useState([]);
  
  const [consulta, setConsulta] = useState({
    idCita: '',
    idMedico: '',
    idPaciente: '',
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toTimeString().slice(0, 5),
    motivoConsulta: '',
    observaciones: ''
  });

  useEffect(() => {
    cargarDatos();
    if (id) {
      cargarConsulta();
    }
  }, [id]);

  const cargarDatos = async () => {
    try {
      const [resPacientes, resMedicos, resCitas] = await Promise.all([
        pacienteService.getAll(),
        medicoService.getAll(),
        citaService.getAll()
      ]);
      setPacientes(resPacientes.data);
      setMedicos(resMedicos.data);
      setCitas(resCitas.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  const cargarConsulta = async () => {
    try {
      const response = await consultaService.getById(id);
      setConsulta(response.data);
    } catch (error) {
      console.error('Error al cargar consulta:', error);
      alert('Error al cargar la consulta');
    }
  };

  const handleChange = (e) => {
    setConsulta({
      ...consulta,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await consultaService.update(id, consulta);
        alert('Consulta actualizada correctamente');
      } else {
        await consultaService.create(consulta);
        alert('Consulta registrada correctamente');
      }
      navigate('/consultas');
    } catch (error) {
      console.error('Error al guardar consulta:', error);
      alert('Error al guardar la consulta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <div>
          <h1>{id ? 'Editar Consulta' : 'Nueva Consulta'}</h1>
          <p>Complete el formulario con la información de la consulta</p>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/consultas')}>
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
              <label htmlFor="idCita">Cita</label>
              <select
                id="idCita"
                name="idCita"
                value={consulta.idCita}
                onChange={handleChange}
              >
                <option value="">Seleccione una cita</option>
                {citas.map(cita => (
                  <option key={cita.idCita} value={cita.idCita}>
                    Cita #{cita.idCita} - {cita.fecha}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="idPaciente">Paciente *</label>
              <select
                id="idPaciente"
                name="idPaciente"
                value={consulta.idPaciente}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un paciente</option>
                {pacientes.map(paciente => (
                  <option key={paciente.idPaciente} value={paciente.idPaciente}>
                    {paciente.nombres} {paciente.apellidos}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="idMedico">Médico *</label>
              <select
                id="idMedico"
                name="idMedico"
                value={consulta.idMedico}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un médico</option>
                {medicos.map(medico => (
                  <option key={medico.idMedico} value={medico.idMedico}>
                    {medico.nombres} {medico.apellidos}
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
                value={consulta.fecha}
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
                value={consulta.hora}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="motivoConsulta">Motivo de Consulta *</label>
              <textarea
                id="motivoConsulta"
                name="motivoConsulta"
                value={consulta.motivoConsulta}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="observaciones">Observaciones</label>
              <textarea
                id="observaciones"
                name="observaciones"
                value={consulta.observaciones}
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/consultas')}>
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
                  {id ? 'Actualizar' : 'Guardar'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormConsulta;