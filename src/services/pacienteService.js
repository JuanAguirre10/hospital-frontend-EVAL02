import api from './api';

const pacienteService = {
  getAll: () => api.get('/pacientes'),
  
  getById: (id) => api.get(`/pacientes/${id}`),
  
  getByDni: (dni) => api.get(`/pacientes/dni/${dni}`),
  
  create: (paciente) => api.post('/pacientes', paciente),
  
  update: (id, paciente) => api.put(`/pacientes/${id}`, paciente),
  
  delete: (id) => api.delete(`/pacientes/${id}`)
};

export default pacienteService;