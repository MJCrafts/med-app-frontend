import React from 'react';
import { FiClock, FiThumbsUp, FiDollarSign, FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import '../../styles/DoctorDashboard.css';

const DoctorDashboard = () => {
  const stats = [
    {
      title: "Rendez-vous aujourd'hui",
      value: "8",
      subtext: "4 en attente",
      icon: <FiClock />,
    },
    {
      title: "Satisfaction patients",
      value: "4.8/5",
      subtext: "Basé sur 124 avis",
      icon: <FiThumbsUp />,
    },
    {
      title: "Revenus hebdomadaires",
      value: "2450€",
      subtext: "↑ 12% vs semaine précédente",
      icon: <FiDollarSign />,
    }
  ];

  const appointments = [
    {
      patient: "Jean Dubois",
      date: "14/01 09:30",
      type: "Consultation standard",
      duration: "30min",
      status: "Confirmé"
    },
    {
      patient: "Sophie Martin",
      date: "14/01 10:30",
      type: "Première visite",
      duration: "45min",
      status: "En attente"
    },
    {
      patient: "Pierre Durand",
      date: "14/01 11:30",
      type: "Suivi",
      duration: "30min",
      status: "Annulé"
    }
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmé':
        return 'status-confirmed';
      case 'en attente':
        return 'status-pending';
      case 'annulé':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <NavBar />
        <div className="dashboard-content">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">{stat.icon}</span>
                  <h3>{stat.title}</h3>
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-subtext">{stat.subtext}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="appointments-section">
            <h3>Rendez-vous à venir</h3>
            <div className="appointments-table">
              <table>
                <thead>
                  <tr>
                    <th>PATIENT</th>
                    <th>DATE</th>
                    <th>TYPE</th>
                    <th>DURÉE</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={index}>
                      <td>{appointment.patient}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.type}</td>
                      <td>{appointment.duration}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="actions">
                        <button className="action-btn edit">
                          <FiEdit />
                          Modifier
                        </button>
                        <button className="action-btn delete">
                          <FiTrash2 />
                          Annuler
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="view-all">
              <a href="#all-appointments">Voir tous les rendez-vous →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard; 