import { useEffect, useState } from 'react';
import pacienteService from '../services/pacienteService';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalPacientes: 0,
    citasHoy: 0,
    hospitalizados: 0,
    facturaspendientes: 0
  });

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const response = await pacienteService.getAll();
      setStats({
        ...stats,
        totalPacientes: response.data.length
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
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
            <div className="activity-item">
              <div className="activity-icon" style={{ background: 'rgba(102, 126, 234, 0.1)', color: '#667eea' }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="activity-content">
                <p>Nuevo paciente registrado</p>
                <span>Hace 2 horas</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon" style={{ background: 'rgba(72, 187, 120, 0.1)', color: '#48bb78' }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="activity-content">
                <p>Cita agendada</p>
                <span>Hace 4 horas</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon" style={{ background: 'rgba(245, 101, 101, 0.1)', color: '#f56565' }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="activity-content">
                <p>Factura generada</p>
                <span>Hace 6 horas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Accesos Rápidos</h2>
          <div className="quick-actions">
            <button className="quick-action-btn">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Nuevo Paciente
            </button>
            <button className="quick-action-btn">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Agendar Cita
            </button>
            <button className="quick-action-btn">
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