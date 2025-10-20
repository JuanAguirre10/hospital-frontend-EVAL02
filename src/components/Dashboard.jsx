import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pacienteService from '../services/pacienteService';
import citaService from '../services/citaService';
import hospitalizacionService from '../services/hospitalizacionService';
import facturacionService from '../services/facturacionService';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPacientes: 0,
    citasHoy: 0,
    hospitalizados: 0,
    facturasPendientes: 0
  });
  const [loading, setLoading] = useState(true);
  const [ultimasActividades, setUltimasActividades] = useState([]);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];

      const [pacientes, citas, hospitalizaciones, facturas] = await Promise.all([
        pacienteService.getAll(),
        citaService.getAll(),
        hospitalizacionService.getByEstado('activo'),
        facturacionService.getByEstado('pendiente')
      ]);

      const citasHoy = citas.data.filter(cita => cita.fecha === today).length;

      setStats({
        totalPacientes: pacientes.data.length,
        citasHoy: citasHoy,
        hospitalizados: hospitalizaciones.data.length,
        facturasPendientes: facturas.data.length
      });

      generarActividades(citas.data, facturas.data);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const generarActividades = (citas, facturas) => {
    const actividades = [];

    const citasRecientes = citas
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, 2);

    citasRecientes.forEach(cita => {
      actividades.push({
        tipo: 'cita',
        titulo: 'Cita agendada',
        tiempo: calcularTiempoTranscurrido(cita.fecha),
        icono: (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
        color: '#48bb78'
      });
    });

    const facturasRecientes = facturas.slice(0, 1);
    facturasRecientes.forEach(() => {
      actividades.push({
        tipo: 'factura',
        titulo: 'Factura generada',
        tiempo: 'Hace unos momentos',
        icono: (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
        color: '#f56565'
      });
    });

    setUltimasActividades(actividades.slice(0, 3));
  };

  const calcularTiempoTranscurrido = (fecha) => {
    const ahora = new Date();
    const fechaCita = new Date(fecha);
    const diff = Math.abs(ahora - fechaCita);
    const horas = Math.floor(diff / (1000 * 60 * 60));
    
    if (horas < 1) return 'Hace menos de 1 hora';
    if (horas === 1) return 'Hace 1 hora';
    if (horas < 24) return `Hace ${horas} horas`;
    
    const dias = Math.floor(horas / 24);
    if (dias === 1) return 'Hace 1 día';
    return `Hace ${dias} días`;
  };

  const cards = [
    {
      title: 'Total Pacientes',
      value: stats.totalPacientes,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2"/>
          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      color: '#667eea',
      bgColor: 'rgba(102, 126, 234, 0.1)'
    },
    {
      title: 'Citas Hoy',
      value: stats.citasHoy,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      color: '#48bb78',
      bgColor: 'rgba(72, 187, 120, 0.1)'
    },
    {
      title: 'Hospitalizados',
      value: stats.hospitalizados,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      color: '#ed8936',
      bgColor: 'rgba(237, 137, 54, 0.1)'
    },
    {
      title: 'Facturas Pendientes',
      value: stats.facturasPendientes,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      color: '#f56565',
      bgColor: 'rgba(245, 101, 101, 0.1)'
    }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Bienvenido al Sistema de Gestión Hospitalaria</p>
      </div>

      <div className="stats-grid">
        {cards.map((card, index) => (
          <div key={index} className="stat-card" style={{ '--card-color': card.color, '--card-bg': card.bgColor }}>
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-info">
              <h3>{card.value}</h3>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Actividad Reciente</h2>
          <div className="activity-list">
            {ultimasActividades.length > 0 ? (
              ultimasActividades.map((actividad, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon" style={{ background: `${actividad.color}20`, color: actividad.color }}>
                    {actividad.icono}
                  </div>
                  <div className="activity-content">
                    <p>{actividad.titulo}</p>
                    <span>{actividad.tiempo}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-activity">
                <p>No hay actividad reciente</p>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Accesos Rápidos</h2>
          <div className="quick-actions">
            <button className="quick-action-btn" onClick={() => navigate('/pacientes/nuevo')}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Nuevo Paciente
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/citas/nuevo')}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Agendar Cita
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/consultas/nuevo')}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Nueva Consulta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;