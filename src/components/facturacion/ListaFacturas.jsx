import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import facturacionService from '../../services/facturacionService';
import './Facturacion.css';

function ListaFacturas() {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    cargarFacturas();
  }, []);

  const cargarFacturas = async () => {
    try {
      const response = await facturacionService.getAll();
      setFacturas(response.data);
    } catch (error) {
      console.error('Error al cargar facturas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarcarPagada = async (id) => {
    if (window.confirm('¿Marcar esta factura como pagada?')) {
      try {
        await facturacionService.marcarComoPagada(id);
        alert('Factura marcada como pagada');
        cargarFacturas();
      } catch (error) {
        console.error('Error al actualizar factura:', error);
        alert('Error al actualizar la factura');
      }
    }
  };

  const facturasFiltradas = facturas.filter(factura =>
    (factura.idPaciente && factura.idPaciente.toString().includes(searchTerm)) ||
    factura.estado?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Cargando facturas...</p>
      </div>
    );
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <div>
          <h1>Gestión de Facturación</h1>
          <p>Administra las facturas y pagos del hospital</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/facturacion/nuevo')}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Nueva Factura
        </button>
      </div>

      <div className="search-bar">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Buscar por ID paciente o estado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Paciente</th>
              <th>Fecha Emisión</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturasFiltradas.length > 0 ? (
              facturasFiltradas.map((factura) => (
                <tr key={factura.idFactura}>
                  <td>{factura.idFactura}</td>
                  <td>{factura.idPaciente}</td>
                  <td>{factura.fechaEmision}</td>
                  <td>S/. {factura.total?.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${factura.estado === 'pagado' ? 'badge-success' : 'badge-danger'}`}>
                      {factura.estado}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-view" 
                        onClick={() => navigate(`/facturacion/${factura.idFactura}`)}
                        title="Ver detalles"
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </button>
                      {factura.estado === 'pendiente' && (
                        <button 
                          className="btn-icon btn-edit" 
                          onClick={() => handleMarcarPagada(factura.idFactura)}
                          title="Marcar como pagada"
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  No se encontraron facturas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaFacturas;