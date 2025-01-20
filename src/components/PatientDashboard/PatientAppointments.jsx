import React from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import '../../styles/PatientDashboard.css';

const PatientAppointments = () => {
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Marie Laurent',
      specialty: 'Médecin généraliste',
      date: '15 Jan 2024',
      time: '14:30',
      type: 'Consultation',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Thomas Bernard',
      specialty: 'Cardiologue',
      date: '22 Jan 2024',
      time: '10:00',
      type: 'Suivi',
      status: 'pending'
    }
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <NavBar />
        <div className="dashboard-content">
          <div className="welcome-section">
            <h1>Mes Rendez-vous</h1>
            <p>Consultez et gérez vos rendez-vous médicaux</p>
          </div>

          <div className="appointments-list">
            {appointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-header">
                  <div className="appointment-date">
                    <FiCalendar className="icon" />
                    <span>{appointment.date}</span>
                    <FiClock className="icon" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className={`status-badge status-${appointment.status}`}>
                    {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                  </div>
                </div>
                
                <div className="appointment-body">
                  <div className="doctor-info">
                    <FiUser className="icon" />
                    <div>
                      <h3>{appointment.doctor}</h3>
                      <p>{appointment.specialty}</p>
                    </div>
                  </div>
                  <div className="appointment-type">
                    {appointment.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments; 