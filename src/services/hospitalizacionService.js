import api from './api';

const hospitalizacionService = {
  getAll: () => api.get('/hospitalizaciones'),
  
  getById: (id) => api.get(`/hospitalizaciones/${id}`),
  
  getByPaciente: (idPaciente) => api.get(`/hospitalizaciones/paciente/${idPaciente}`),
  
  getByEstado: (estado) => api.get(`/hospitalizaciones/estado/${estado}`),
  
  create: (hospitalizacion) => api.post('/hospitalizaciones', hospitalizacion),
  
  update: (id, hospitalizacion) => api.put(`/hospitalizaciones/${id}`, hospitalizacion),
  
  darAlta: (id, fechaAlta) => api.patch(`/hospitalizaciones/${id}/alta?fechaAlta=${fechaAlta}`),
  
  getHabitaciones: () => api.get('/habitaciones'),
  
  getHabitacionesDisponibles: () => api.get('/habitaciones/estado/disponible')
};

export default hospitalizacionService;