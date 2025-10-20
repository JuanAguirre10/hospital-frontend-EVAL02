import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import facturacionService from '../../services/facturacionService';
import pacienteService from '../../services/pacienteService';
import './Facturacion.css';

function FormFactura() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  
  const [factura, setFactura] = useState({
    idPaciente: '',
    fechaEmision: new Date().toISOString().split('T')[0],
    total: 0,
    estado: 'pendiente'
  });

  useEffect(() => {
    cargarPacientes();
    if (id) {
      cargarFactura();
    }
  }, [id]);

  const cargarPacientes = async () => {
    try {
      const response = await pacienteService.getAll();
      setPacientes(response.data);
    } catch (error) {
      console.error('Error al cargar pacientes:', error);
    }
  };

  const cargarFactura = async () => {
    try {
      const response = await facturacionService.getById(id);
      setFactura(response.data);
    } catch (error) {
      console.error('Error al cargar factura:', error);
      alert('Error al cargar la factura');
    }
  };

  const handleChange = (e) => {
    setFactura({
      ...factura,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await facturacionService.update(id, factura);
        alert('Factura actualizada correctamente');
      } else {
        await facturacionService.create(factura);
        alert('Factura registrada correctamente');
      }
      navigate('/facturacion');
    } catch (error) {
      console.error('Error al guardar factura:', error);
      alert('Error al guardar la factura');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <div>
          <h1>{id ? 'Editar Factura' : 'Nueva Factura'}</h1>
          <p>Complete el formulario con la información de la factura</p>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/facturacion')}>
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
                value={factura.idPaciente}
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
              <label htmlFor="fechaEmision">Fecha de Emisión *</label>
              <input
                type="date"
                id="fechaEmision"
                name="fechaEmision"
                value={factura.fechaEmision}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="total">Total (S/.) *</label>
              <input
                type="number"
                id="total"
                name="total"
                value={factura.total}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                value={factura.estado}
                onChange={handleChange}
              >
                <option value="pendiente">Pendiente</option>
                <option value="pagado">Pagado</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/facturacion')}>
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

export default FormFactura;