import React, { useState } from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiLock, FiSave, FiHeart, FiAlertCircle, FiCalendar } from 'react-icons/fi';
import '../../styles/PatientDashboard.css';

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Martin',
    email: 'sarah.martin@example.com',
    phone: '06 12 34 56 78',
    address: '123 Rue de la Santé',
    city: 'Paris',
    postalCode: '75001',
    birthDate: '15/03/1990',
    bloodType: 'A+',
    allergies: 'Aucune',
    medicalHistory: 'Pas d\'antécédents médicaux particuliers',
    emergencyContact: 'Jean Martin - 06 98 76 54 32 (Père)',
    lastCheckup: '5 décembre 2023'
  });

  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <NavBar />
        <div className="dashboard-content">
          <div className="profile-header">
            <div className="header-content">
              <h1>Mon Profil</h1>
              <p>Gérez vos informations personnelles et médicales</p>
            </div>
            <button 
              className={`edit-profile-button ${isEditing ? 'save' : ''}`}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <FiSave />
                  Enregistrer
                </>
              ) : (
                <>
                  <FiEdit2 />
                  Modifier
                </>
              )}
            </button>
          </div>

          <div className="profile-grid">
            <div className="profile-section main-info">
              <div className="profile-photo-section">
                <div className="profile-photo">
                  <FiUser size={60} />
                </div>
                {isEditing && (
                  <button className="change-photo-button">
                    Changer la photo
                  </button>
                )}
              </div>
              <div className="profile-info-grid">
                <div className="info-group">
                  <label>
                    <FiUser className="icon" />
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={isEditing ? formData.firstName : profileData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="info-group">
                  <label>
                    <FiUser className="icon" />
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={isEditing ? formData.lastName : profileData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="info-group">
                  <label>
                    <FiCalendar className="icon" />
                    Date de naissance
                  </label>
                  <input
                    type="text"
                    name="birthDate"
                    value={isEditing ? formData.birthDate : profileData.birthDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Coordonnées</h2>
              <div className="profile-info-grid">
                <div className="info-group">
                  <label>
                    <FiMail className="icon" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={isEditing ? formData.email : profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="info-group">
                  <label>
                    <FiPhone className="icon" />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={isEditing ? formData.phone : profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="info-group full-width">
                  <label>
                    <FiMapPin className="icon" />
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={isEditing ? formData.address : profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="info-group">
                  <label>Ville</label>
                  <input
                    type="text"
                    name="city"
                    value={isEditing ? formData.city : profileData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="info-group">
                  <label>Code postal</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={isEditing ? formData.postalCode : profileData.postalCode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Informations médicales</h2>
              <div className="profile-info-grid">
                <div className="info-group">
                  <label>
                    <FiHeart className="icon" />
                    Groupe sanguin
                  </label>
                  <input
                    type="text"
                    name="bloodType"
                    value={isEditing ? formData.bloodType : profileData.bloodType}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="info-group">
                  <label>
                    <FiAlertCircle className="icon" />
                    Allergies
                  </label>
                  <input
                    type="text"
                    name="allergies"
                    value={isEditing ? formData.allergies : profileData.allergies}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="info-group full-width">
                  <label>Antécédents médicaux</label>
                  <textarea
                    name="medicalHistory"
                    value={isEditing ? formData.medicalHistory : profileData.medicalHistory}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="4"
                  />
                </div>
                <div className="info-group full-width">
                  <label>Contact d'urgence</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={isEditing ? formData.emergencyContact : profileData.emergencyContact}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="info-group">
                  <label>Dernier bilan</label>
                  <input
                    type="text"
                    name="lastCheckup"
                    value={isEditing ? formData.lastCheckup : profileData.lastCheckup}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Sécurité</h2>
              <div className="security-actions">
                <button className="change-password-button">
                  <FiLock />
                  Changer le mot de passe
                </button>
                <p className="security-info">Dernière modification du mot de passe: il y a 3 mois</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile; 