import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import medicoService from '../../services/medicoService';
import './Medicos.css';

function FormMedico() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [medico, setMedico] = useState({
    nombres: '',
    apellidos: '',
    colegiatura: '',
    telefono: '',
    correo: '',
    estado: 'activo'
  });

  useEffect(() => {
    if (id) {
      cargarMedico();
    }
  }, [id]);

  const cargarMedico = async () => {
    try {
      const response = await medicoService.getById(id);
      setMedico(response.data);
    } catch (error) {
      console.error('Error al cargar médico:', error);
      alert('Error al cargar el médico');
    }
  };

  const handleChange = (e) => {
    setMedico({
      ...medico,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await medicoService.update(id, medico);
        alert('Médico actualizado correctamente');
      } else {
        await medicoService.create(medico);
        alert('Médico registrado correctamente');
      }
      navigate('/medicos');
    } catch (error) {
      console.error('Error al guardar médico:', error);
      alert('Error al guardar el médico');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <div>
          <h1>{id ? 'Editar Médico' : 'Nuevo Médico'}</h1>
          <p>Complete el formulario con la información del médico</p>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/medicos')}>
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
              <label htmlFor="nombres">Nombres *</label>
              <input
                type="text"
                id="nombres"
                name="nombres"
                value={medico.nombres}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellidos">Apellidos *</label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={medico.apellidos}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="colegiatura">Colegiatura *</label>
              <input
                type="text"
                id="colegiatura"
                name="colegiatura"
                value={medico.colegiatura}
                onChange={handleChange}
                required
                placeholder="Ej: CMP-12345"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={medico.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={medico.correo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                value={medico.estado}
                onChange={handleChange}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/medicos')}>
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

export default FormMedico;