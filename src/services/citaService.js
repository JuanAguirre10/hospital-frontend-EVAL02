import api from './api';

const citaService = {
  getAll: () => api.get('/citas'),
  
  getById: (id) => api.get(`/citas/${id}`),
  
  getByPaciente: (idPaciente) => api.get(`/citas/paciente/${idPaciente}`),
  
  getByMedico: (idMedico) => api.get(`/citas/medico/${idMedico}`),
  
  getByEstado: (estado) => api.get(`/citas/estado/${estado}`),
  
  create: (cita) => api.post('/citas', cita),
  
  update: (id, cita) => api.put(`/citas/${id}`, cita),
  
  cambiarEstado: (id, estado) => api.patch(`/citas/${id}/estado?estado=${estado}`),
  
  cancelar: (id) => api.patch(`/citas/${id}/cancelar`)
};

export default citaService;