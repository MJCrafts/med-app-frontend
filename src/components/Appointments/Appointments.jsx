import React, { useState } from 'react';
import { FiSearch, FiFilter, FiCalendar, FiClock, FiUser, FiPhone, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Sidebar from '../DoctorDashboard/Sidebar';
import NavBar from '../DoctorDashboard/NavBar';
import '../../styles/Appointments.css';

const Appointments = () => {
  // Sample appointments data - replace with real data later
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Jean Dupont',
      patientPhone: '06 12 34 56 78',
      type: 'consultation',
      date: new Date('2024-01-20T09:00:00'),
      duration: '30',
      status: 'confirmé'
    },
    {
      id: 2,
      patientName: 'Marie Martin',
      patientPhone: '06 98 76 54 32',
      type: 'suivi',
      date: new Date('2024-01-20T10:00:00'),
      duration: '45',
      status: 'en attente'
    },
    {
      id: 3,
      patientName: 'Pierre Dubois',
      patientPhone: '06 11 22 33 44',
      type: 'urgence',
      date: new Date('2024-01-20T14:30:00'),
      duration: '30',
      status: 'confirmé'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');
  const [filterType, setFilterType] = useState('tous');
  const [filterDate, setFilterDate] = useState('');

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const filteredAppointments = appointments
    .filter(appointment => {
      const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          appointment.patientPhone.includes(searchTerm);
      const matchesStatus = filterStatus === 'tous' || appointment.status === filterStatus;
      const matchesType = filterType === 'tous' || appointment.type === filterType;
      const matchesDate = !filterDate || isSameDay(appointment.date, new Date(filterDate));
      return matchesSearch && matchesStatus && matchesType && matchesDate;
    })
    .sort((a, b) => a.date - b.date);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <NavBar />
        <div className="appointments-container">
          <div className="appointments-header">
            <div className="header-title">
              <h1>Rendez-vous</h1>
              <p className="subtitle">Gérez vos rendez-vous et consultations</p>
            </div>
          </div>

          <div className="appointments-filters">
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un patient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filters">
              <div className="filter-group">
                <FiCalendar className="filter-icon" />
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="date-filter"
                />
              </div>

              <div className="filter-group">
                <FiFilter className="filter-icon" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="confirmé">Confirmé</option>
                  <option value="en attente">En attente</option>
                  <option value="annulé">Annulé</option>
                </select>
              </div>

              <div className="filter-group">
                <FiFilter className="filter-icon" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="tous">Tous les types</option>
                  <option value="consultation">Consultation</option>
                  <option value="suivi">Suivi</option>
                  <option value="urgence">Urgence</option>
                </select>
              </div>
            </div>
          </div>

          <div className="appointments-table">
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Heure</th>
                  <th>Type</th>
                  <th>Durée</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td className="patient-info">
                      <div className="patient-name">
                        <FiUser className="icon" />
                        {appointment.patientName}
                      </div>
                      <div className="patient-phone">
                        <FiPhone className="icon" />
                        {appointment.patientPhone}
                      </div>
                    </td>
                    <td>
                      <div className="date-info">
                        <FiCalendar className="icon" />
                        {formatDate(appointment.date)}
                      </div>
                    </td>
                    <td>
                      <div className="time-info">
                        <FiClock className="icon" />
                        {formatTime(appointment.date)}
                      </div>
                    </td>
                    <td>
                      <span className={`appointment-type ${appointment.type}`}>
                        {appointment.type}
                      </span>
                    </td>
                    <td>{appointment.duration} min</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button className="action-button edit">
                          <FiEdit2 />
                        </button>
                        <button className="action-button delete">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments; 