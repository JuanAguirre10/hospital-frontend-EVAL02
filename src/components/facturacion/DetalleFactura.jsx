import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import facturacionService from '../../services/facturacionService';
import './Facturacion.css';

function DetalleFactura() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [factura, setFactura] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarFactura();
    cargarDetalles();
  }, [id]);

  const cargarFactura = async () => {
    try {
      const response = await facturacionService.getById(id);
      setFactura(response.data);
    } catch (error) {
      console.error('Error al cargar factura:', error);
      alert('Error al cargar la factura');
    } finally {
      setLoading(false);
    }
  };

  const cargarDetalles = async () => {
    try {
      const response = await facturacionService.getDetalles(id);
      setDetalles(response.data);
    } catch (error) {
      console.error('Error al cargar detalles:', error);
    }
  };

  const handleMarcarPagada = async () => {
    if (window.confirm('¿Marcar esta factura como pagada?')) {
      try {
        await facturacionService.marcarComoPagada(id);
        alert('Factura marcada como pagada');
        cargarFactura();
      } catch (error) {
        console.error('Error al actualizar factura:', error);
        alert('Error al actualizar la factura');
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

  if (!factura) {
    return (
      <div className="module-container">
        <div className="error-message">Factura no encontrada</div>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <div>
          <h1>Detalles de la Factura</h1>
          <p>Información completa de la factura</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => navigate('/facturacion')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver
          </button>
          {factura.estado === 'pendiente' && (
            <button className="btn-primary" onClick={handleMarcarPagada}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Marcar como Pagada
            </button>
          )}
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="patient-avatar">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
              <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="patient-info">
            <h2>Factura #{factura.idFactura}</h2>
            <span className={`badge ${factura.estado === 'pagado' ? 'badge-success' : 'badge-danger'}`}>
              {factura.estado}
            </span>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <label>ID Paciente</label>
            <p>{factura.idPaciente}</p>
          </div>
          <div className="detail-item">
            <label>Fecha de Emisión</label>
            <p>{factura.fechaEmision}</p>
          </div>
          <div className="detail-item">
            <label>Total</label>
            <p className="factura-total">S/. {factura.total?.toFixed(2)}</p>
          </div>
          <div className="detail-item">
            <label>Estado</label>
            <p>{factura.estado}</p>
          </div>
        </div>

        {detalles.length > 0 && (
          <div className="detalles-section">
            <h3>Detalles de la Factura</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {detalles.map((detalle) => (
                    <tr key={detalle.idDetalleFactura}>
                      <td>{detalle.concepto}</td>
                      <td>S/. {detalle.monto?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetalleFactura;