import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import { FiCalendar, FiClock, FiFileText, FiAlertCircle, FiPlusCircle, FiDownload, FiEye } from 'react-icons/fi';
import '../../styles/PatientDashboard.css';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const upcomingAppointment = {
    date: '15',
    month: 'Jan',
    doctor: 'Dr. Marie Laurent',
    time: '14:30',
    type: 'Consultation'
  };

  const documents = [
    { id: 1, title: 'Ordonnance - Antibiotiques', date: '5 décembre 2023', type: 'Ordonnance' },
    { id: 2, title: 'Résultats analyse sang', date: '1 décembre 2023', type: 'Analyse' },
  ];

  const reminders = [
    { id: 1, title: 'Vaccin rappel', dueIn: '2 mois', priority: 'medium' },
    { id: 2, title: 'Renouvellement ordonnance', dueIn: '15 jours', priority: 'high' },
  ];

  const handleAppointmentClick = () => {
    navigate('/patient-appointments');
  };

  const handleBookAppointment = () => {
    navigate('/book-appointment');
  };

  const handleDocumentClick = () => {
    navigate('/medical-records');
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <NavBar />
        <div className="dashboard-content">
          <div className="welcome-section">
            <div className="welcome-header">
              <div>
                <h1>Bienvenue, Sarah</h1>
                <p>Gérez vos rendez-vous et votre dossier médical</p>
              </div>
              <button className="quick-action-button" onClick={handleBookAppointment}>
                <FiPlusCircle />
                Prendre RDV
              </button>
            </div>
          </div>
          
          <div className="dashboard-grid">
            <div className="dashboard-card clickable" onClick={handleAppointmentClick}>
              <div className="card-header">
                <h2>Prochain rendez-vous</h2>
                <FiCalendar className="card-icon" />
              </div>
              <div className="appointment-preview">
                <div className="appointment-date">
                  <div className="date">{upcomingAppointment.date}</div>
                  <div className="month">{upcomingAppointment.month}</div>
                </div>
                <div className="appointment-details">
                  <h3>{upcomingAppointment.doctor}</h3>
                  <p>{upcomingAppointment.type} - {upcomingAppointment.time}</p>
                </div>
              </div>
              <div className="card-action">
                <span>Voir tous les rendez-vous</span>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h2>Historique médical</h2>
                <FiClock className="card-icon" />
              </div>
              <div className="history-preview">
                <div className="history-item">
                  <FiFileText className="item-icon" />
                  <div>
                    <h4>Dernière consultation</h4>
                    <p>5 décembre 2023</p>
                  </div>
                </div>
                <div className="history-item">
                  <FiAlertCircle className="item-icon success" />
                  <div>
                    <h4>État des vaccins</h4>
                    <p>À jour</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-card clickable" onClick={handleDocumentClick}>
              <div className="card-header">
                <h2>Documents récents</h2>
                <FiFileText className="card-icon" />
              </div>
              <div className="documents-preview">
                {documents.map(doc => (
                  <div key={doc.id} className="document-item">
                    <div className="document-info">
                      <h4>{doc.title}</h4>
                      <p>{doc.date}</p>
                    </div>
                    <div className="document-actions">
                      <button className="action-button view">
                        <FiEye />
                      </button>
                      <button className="action-button download">
                        <FiDownload />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-action">
                <span>Voir tous les documents</span>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h2>Rappels</h2>
                <FiAlertCircle className="card-icon" />
              </div>
              <div className="reminders-preview">
                {reminders.map(reminder => (
                  <div key={reminder.id} className="reminder-item">
                    <div className={`reminder-priority ${reminder.priority}`} />
                    <div className="reminder-info">
                      <h4>{reminder.title}</h4>
                      <p>Dans {reminder.dueIn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard; 