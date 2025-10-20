import api from './api';

const consultaService = {
  getAll: () => api.get('/consultas'),
  
  getById: (id) => api.get(`/consultas/${id}`),
  
  getByPaciente: (idPaciente) => api.get(`/consultas/paciente/${idPaciente}`),
  
  create: (consulta) => api.post('/consultas', consulta),
  
  update: (id, consulta) => api.put(`/consultas/${id}`, consulta),
  
  delete: (id) => api.delete(`/consultas/${id}`)
};

export default consultaService;