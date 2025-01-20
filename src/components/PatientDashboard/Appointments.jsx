import React, { useState } from 'react';
import { FiCalendar, FiSearch, FiFilter } from 'react-icons/fi';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import '../../styles/Appointments.css';

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Marie Laurent',
      specialty: 'Médecin généraliste',
      date: '2024-02-15',
      time: '14:30',
      type: 'Consultation',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Thomas Bernard',
      specialty: 'Dentiste',
      date: '2024-02-20',
      time: '10:00',
      type: 'Contrôle',
      status: 'pending'
    }
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesDate = !dateFilter || appointment.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="dashboard-layout">
      <NavBar />
      <div className="dashboard-main">
        <Sidebar />
        <div className="dashboard-content">
          <div className="appointments-container">
            <div className="appointments-header">
              <div className="header-title">
                <h1>Mes rendez-vous</h1>
                <p className="subtitle">Gérez vos rendez-vous médicaux</p>
              </div>
              <button className="btn-primary">
                <FiCalendar />
                Nouveau rendez-vous
              </button>
            </div>

            <div className="appointments-filters">
              <div className="search-bar">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Rechercher un médecin ou une spécialité"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filters">
                <div className="filter-group">
                  <FiFilter className="filter-icon" />
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="pending">En attente</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </div>

                <div className="filter-group">
                  <FiCalendar className="filter-icon" />
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="date-filter"
                  />
                </div>
              </div>
            </div>

            <div className="appointments-table">
              <table>
                <thead>
                  <tr>
                    <th>Médecin</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td>
                        <div className="doctor-info">
                          <h4>{appointment.doctor}</h4>
                          <p>{appointment.specialty}</p>
                        </div>
                      </td>
                      <td>
                        <div className="date-info">
                          <FiCalendar className="icon" />
                          <span>{new Date(appointment.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })} à {appointment.time}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`appointment-type ${appointment.type.toLowerCase()}`}>
                          {appointment.type}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge status-${appointment.status}`}>
                          {appointment.status === 'confirmed' ? 'Confirmé' : 
                           appointment.status === 'pending' ? 'En attente' : 'Annulé'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments; 