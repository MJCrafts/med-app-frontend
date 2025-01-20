import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiEdit2, FiLock, FiSave } from 'react-icons/fi';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import '../../styles/Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Marie',
    lastName: 'Laurent',
    specialty: 'Médecin généraliste',
    email: 'marie.laurent@example.com',
    personalPhone: '06 12 34 56 78',
    officePhone: '01 23 45 67 89',
    address: '123 Avenue de la Médecine',
    city: 'Paris',
    postalCode: '75001',
    about: 'Médecin généraliste expérimentée, spécialisée dans la médecine préventive et le suivi des maladies chroniques.'
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
          <div className="profile-container">
            <div className="profile-banner">
              <div className="profile-photo-banner">
                <img src="/doctor-avatar.jpg" alt="Profile" />
                {isEditing && (
                  <button className="change-photo-button">
                    <FiEdit2 />
                    Changer la photo
                  </button>
                )}
              </div>
              <div className="banner-content">
                <h1>{profileData.firstName} {profileData.lastName}</h1>
                <p className="specialty">{profileData.specialty}</p>
              </div>
              <button 
                className={`edit-button ${isEditing ? 'save' : ''}`}
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
              <div className="profile-card contact-info">
                <h2>Contact</h2>
                <div className="info-list">
                  <div className="info-item">
                    <FiMail className="icon" />
                    <div className="info-content">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={isEditing ? formData.email : profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="info-item">
                    <FiPhone className="icon" />
                    <div className="info-content">
                      <label>Téléphone personnel</label>
                      <input
                        type="tel"
                        name="personalPhone"
                        value={isEditing ? formData.personalPhone : profileData.personalPhone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="info-item">
                    <FiPhone className="icon" />
                    <div className="info-content">
                      <label>Téléphone du cabinet</label>
                      <input
                        type="tel"
                        name="officePhone"
                        value={isEditing ? formData.officePhone : profileData.officePhone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-card location-info">
                <h2>Adresse du cabinet</h2>
                <div className="info-list">
                  <div className="info-item">
                    <FiMapPin className="icon" />
                    <div className="info-content">
                      <label>Adresse</label>
                      <input
                        type="text"
                        name="address"
                        value={isEditing ? formData.address : profileData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="info-item">
                    <FiMapPin className="icon" />
                    <div className="info-content">
                      <label>Ville</label>
                      <input
                        type="text"
                        name="city"
                        value={isEditing ? formData.city : profileData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="info-item">
                    <FiMapPin className="icon" />
                    <div className="info-content">
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
              </div>

              <div className="profile-card about-info">
                <h2>À propos</h2>
                <div className="info-content">
                  <textarea
                    name="about"
                    value={isEditing ? formData.about : profileData.about}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="4"
                    placeholder="Décrivez votre pratique médicale, votre expérience et vos domaines d'expertise..."
                  />
                </div>
              </div>

              <div className="profile-card security-info">
                <h2>Sécurité</h2>
                <button className="change-password-button">
                  <div className="button-content">
                    <FiLock className="icon" />
                    <span>Changer le mot de passe</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 