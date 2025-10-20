import api from './api';

const medicoService = {
  getAll: () => api.get('/medicos'),
  
  getById: (id) => api.get(`/medicos/${id}`),
  
  getActivos: () => api.get('/medicos/activos'),
  
  create: (medico) => api.post('/medicos', medico),
  
  update: (id, medico) => api.put(`/medicos/${id}`, medico),
  
  delete: (id) => api.delete(`/medicos/${id}`)
};

export default medicoService;