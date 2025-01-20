import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/HomePage.css';
import caduceusLogo from '../../assets/caduceus.png';
import { FiSearch, FiMapPin, FiClock, FiShield, FiUser, FiUserPlus, FiLogIn } from 'react-icons/fi';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { BsCalendarCheck } from 'react-icons/bs';
import AuthModals from '../Auth/AuthModals';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search:', { searchQuery, specialty, city, location });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Here you would typically reverse geocode the coordinates
          // For now, we'll just set it to indicate we have the location
          setLocation('Current Location');
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleRegisterClick = (role) => {
    setSelectedRole(role);
    setIsRegisterOpen(true);
  };

  const handleModalClose = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setSelectedRole(null);
  };

  return (
    <div className="home-page">
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
      </header>

      <main className="main-content">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Trouvez un médecin et<br />prenez rendez-vous</h1>
            </div>
            <div className="hero-image">
              <img src={caduceusLogo} alt="MediApp Hero" className="hero-logo" />
            </div>
          </div>
          
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-bar">
              <input
                type="text"
                placeholder="Rechercher un médecin"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                <option value="">Spécialité</option>
                <option value="generaliste">Généraliste</option>
                <option value="dentiste">Dentiste</option>
                <option value="pediatre">Pédiatre</option>
                <option value="cardiologue">Cardiologue</option>
              </select>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Ville</option>
                <option value="paris">Paris</option>
                <option value="lyon">Lyon</option>
                <option value="marseille">Marseille</option>
              </select>
              <button type="button" className="location-button" onClick={handleLocation}>
                <FiMapPin /> {location || 'Ma position'}
              </button>
              <button type="submit" className="search-button">
                <FiSearch /> Rechercher
              </button>
            </form>
          </div>
        </div>

        <section className="advantages">
          <h2>Nos Avantages</h2>
          <div className="advantages-grid">
            <div className="advantage-card">
              <div className="card-icon">
                <MdOutlineHealthAndSafety />
              </div>
              <h3>Accédez rapidement à votre médecin</h3>
              <p>Réservez et prenez rendez-vous avec votre médecin en quelques clics</p>
            </div>
            <div className="advantage-card">
              <div className="card-icon">
                <FiClock />
              </div>
              <h3>Réservation 24/7</h3>
              <p>Prenez rendez-vous à tout moment, où que vous soyez</p>
            </div>
            <div className="advantage-card">
              <div className="card-icon">
                <FiShield />
              </div>
              <h3>Données sécurisées</h3>
              <p>Protection maximale de vos données personnelles</p>
            </div>
          </div>
        </section>

        <section className="user-choice">
          <h2>À Vous de Choisir</h2>
          <p>Sélectionnez l'option qui vous correspond</p>
          
          <div className="choice-cards">
            <div className="choice-card">
              <div className="card-icon">
                <FiUser />
              </div>
              <h3>Réservez en tant que invité</h3>
              <p>Pas besoin de créer un compte</p>
              <button className="choice-btn">
                <BsCalendarCheck className="btn-icon" />
                Réserver maintenant
              </button>
            </div>
            <div className="choice-card">
              <div className="card-icon">
                <FiUserPlus />
              </div>
              <h3>Réservez en tant que patient</h3>
              <p>Suivez vos rendez-vous en ligne</p>
              <button 
                className="choice-btn"
                onClick={() => handleRegisterClick('patient')}
              >
                <FiUserPlus className="btn-icon" />
                Créer un compte
              </button>
            </div>
            <div className="choice-card">
              <div className="card-icon">
                <MdOutlineHealthAndSafety />
              </div>
              <h3>Vous êtes médecin?</h3>
              <p>Inscrivez-vous et gérez vos rendez-vous en ligne</p>
              <button 
                className="choice-btn"
                onClick={() => handleRegisterClick('doctor')}
              >
                <FiLogIn className="btn-icon" />
                S'inscrire
              </button>
            </div>
          </div>
        </section>
      </main>

      <AuthModals 
        isLoginOpen={isLoginOpen}
        isRegisterOpen={isRegisterOpen}
        onClose={handleModalClose}
        initialRole={selectedRole}
      />
    </div>
  );
};

export default HomePage; 