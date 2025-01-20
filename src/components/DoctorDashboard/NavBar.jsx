import React from 'react';
import '../../styles/NavBar.css';
import caduceus from '../../assets/caduceus.png';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={caduceus} alt="MediApp Logo" className="navbar-logo" />
        <h1>Espace Médecin</h1>
      </div>
    </nav>
  );
};

export default NavBar; 