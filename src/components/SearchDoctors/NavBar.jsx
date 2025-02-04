import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import caduceusLogo from '../../assets/caduceus.png';
import AuthModals from '../Auth/AuthModals';
import '../../styles/SearchDoctors.css';

const NavBar = () => {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState(null);

  const handleModalClose = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setSelectedRole(null);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={caduceusLogo} alt="MediApp Logo" className="logo-img" />
        <span>MediApp</span>
      </div>
      <div className="auth-buttons">
        <button className="btn-secondary" onClick={() => setIsLoginOpen(true)}>Se connecter</button>
        <button className="btn-primary" onClick={() => setIsRegisterOpen(true)}>S'inscrire</button>
        <Link to="/patient-dashboard" className="btn-secondary">
          <FiUser className="btn-icon" />
          Espace Patient
        </Link>
        <Link to="/doctor-dashboard" className="btn-secondary">
          <FiUser className="btn-icon" />
          Espace Médecin
        </Link>
      </div>
      {(isLoginOpen || isRegisterOpen) && (
        <AuthModals 
          isLoginOpen={isLoginOpen}
          isRegisterOpen={isRegisterOpen}
          onClose={handleModalClose}
          initialRole={selectedRole}
        />
      )}
    </header>
  );
};

export default NavBar; 