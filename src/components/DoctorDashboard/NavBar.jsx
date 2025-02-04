import React from 'react';
import { Link } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import caduceusLogo from '../../assets/caduceus.png';
import '../../styles/DoctorDashboard.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <img src={caduceusLogo} alt="Logo" />
        </Link>
        <div className="brand-text">
          <h1>Espace Médecin</h1>
        </div>
      </div>

      <div className="navbar-actions">
        <button className="notification-button">
          <FiBell />
          <span className="notification-badge">3</span>
        </button>
      </div>
    </div>
  );
};

export default NavBar; 