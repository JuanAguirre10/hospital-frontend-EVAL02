import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import hospitalizacionService from '../../services/hospitalizacionService';
import pacienteService from '../../services/pacienteService';
import './Hospitalizacion.css';

function FormHospitalizacion() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  
  const [hospitalizacion, setHospitalizacion] = useState({
    idPaciente: '',
    idHabitacion: '',
    fechaIngreso: new Date().toISOString().split('T')[0],
    fechaAlta: '',
    diagnosticoIngreso: '',
    estado: 'activo'
  });

  useEffect(() => {
    cargarDatos();
    if (id) {
      cargarHospitalizacion();
    }
  }, [id]);

  const cargarDatos = async () => {
    try {
      const [resPacientes, resHabitaciones] = await Promise.all([
        pacienteService.getAll(),
        hospitalizacionService.getHabitacionesDisponibles()
      ]);
      setPacientes(resPacientes.data);
      setHabitaciones(resHabitaciones.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  const cargarHospitalizacion = async () => {
    try {
      const response = await hospitalizacionService.getById(id);
      setHospitalizacion(response.data);
    } catch (error) {
      console.error('Error al cargar hospitalización:', error);
      alert('Error al cargar la hospitalización');
    }
  };

  const handleChange = (e) => {
    setHospitalizacion({
      ...hospitalizacion,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await hospitalizacionService.update(id, hospitalizacion);
        alert('Hospitalización actualizada correctamente');
      } else {
        await hospitalizacionService.create(hospitalizacion);
        alert('Hospitalización registrada correctamente');
      }
      navigate('/hospitalizacion');
    } catch (error) {
      console.error('Error al guardar hospitalización:', error);
      alert('Error al guardar la hospitalización');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <div>
          <h1>{id ? 'Editar Hospitalización' : 'Nueva Hospitalización'}</h1>
          <p>Complete el formulario con la información de la hospitalización</p>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/hospitalizacion')}>
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
                value={hospitalizacion.idPaciente}
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
              <label htmlFor="idHabitacion">Habitación *</label>
              <select
                id="idHabitacion"
                name="idHabitacion"
                value={hospitalizacion.idHabitacion}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una habitación</option>
                {habitaciones.map(hab => (
                  <option key={hab.idHabitacion} value={hab.idHabitacion}>
                    Habitación {hab.numero} - {hab.tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fechaIngreso">Fecha de Ingreso *</label>
              <input
                type="date"
                id="fechaIngreso"
                name="fechaIngreso"
                value={hospitalizacion.fechaIngreso}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaAlta">Fecha de Alta</label>
              <input
                type="date"
                id="fechaAlta"
                name="fechaAlta"
                value={hospitalizacion.fechaAlta}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="diagnosticoIngreso">Diagnóstico de Ingreso *</label>
              <textarea
                id="diagnosticoIngreso"
                name="diagnosticoIngreso"
                value={hospitalizacion.diagnosticoIngreso}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                value={hospitalizacion.estado}
                onChange={handleChange}
              >
                <option value="activo">Activo</option>
                <option value="dado de alta">Dado de Alta</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/hospitalizacion')}>
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

export default FormHospitalizacion;