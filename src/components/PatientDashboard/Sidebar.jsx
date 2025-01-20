import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiCalendar, FiFolder, FiUser, FiLogOut, FiPlusCircle } from 'react-icons/fi';
import '../../styles/PatientDashboard.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    {
      icon: <FiHome />,
      label: 'Tableau de bord',
      path: '/patient-dashboard'
    },
    {
      icon: <FiPlusCircle />,
      label: 'Prendre RDV',
      path: '/book-appointment'
    },
    {
      icon: <FiCalendar />,
      label: 'Rendez-vous',
      path: '/patient-appointments'
    },
    {
      icon: <FiFolder />,
      label: 'Dossier médical',
      path: '/medical-records'
    },
    {
      icon: <FiUser />,
      label: 'Profile',
      path: '/patient-profile'
    }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-profile">
        <div className="profile-photo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
          <FiUser size={60} color="#666" />
        </div>
        <h2 className="profile-name">Sarah Martin</h2>
        <p className="profile-info">Patient</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <button className="logout-button" onClick={handleLogout}>
        <FiLogOut />
        <span>Déconnexion</span>
      </button>
    </div>
  );
};

export default Sidebar; 