import api from './api';

const facturacionService = {
  getAll: () => api.get('/facturas'),
  
  getById: (id) => api.get(`/facturas/${id}`),
  
  getByPaciente: (idPaciente) => api.get(`/facturas/paciente/${idPaciente}`),
  
  getByEstado: (estado) => api.get(`/facturas/estado/${estado}`),
  
  create: (factura) => api.post('/facturas', factura),
  
  update: (id, factura) => api.put(`/facturas/${id}`, factura),
  
  marcarComoPagada: (id) => api.patch(`/facturas/${id}/pagar`),
  
  agregarDetalle: (detalle) => api.post('/detalle-facturas', detalle),
  
  getDetalles: (idFactura) => api.get(`/detalle-facturas/factura/${idFactura}`)
};

export default facturacionService;