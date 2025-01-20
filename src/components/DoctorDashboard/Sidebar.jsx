import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiChevronLeft, FiBarChart2, FiCalendar, FiUser, FiLogOut, FiClock, FiList } from 'react-icons/fi';
import '../../styles/DoctorDashboard.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const doctor = {
    name: "Dr. Marie Laurent",
    specialty: "Médecin généraliste",
    avatar: "/doctor-avatar.jpg"
  };

  const menuItems = [
    { 
      icon: <FiBarChart2 />, 
      label: 'Tableau de bord', 
      path: '/doctor-dashboard',
      active: location.pathname === '/doctor-dashboard'
    },
    { 
      icon: <FiCalendar />, 
      label: 'Planning', 
      path: '/planning',
      active: location.pathname === '/planning'
    },
    { 
      icon: <FiList />, 
      label: 'Rendez-vous',
      path: '/appointments',
      active: location.pathname === '/appointments'
    },
    { 
      icon: <FiUser />, 
      label: 'Profile',
      path: '/profile',
      active: location.pathname === '/profile'
    },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-profile">
        <div className="profile-photo">
          {doctor.avatar ? (
            <img src={doctor.avatar} alt={doctor.name} />
          ) : (
            <FiUser />
          )}
        </div>
        <h3 className="profile-name">{doctor.name}</h3>
        <p className="profile-info">{doctor.specialty}</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <a 
            key={index} 
            className={`nav-item ${item.active ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            href={item.path}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
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