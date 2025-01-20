import React, { useState, useEffect, useCallback } from 'react';
import { FiX, FiMail, FiLock, FiUser, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import '../../styles/AuthModals.css';

const AuthModals = ({ isLoginOpen, isRegisterOpen, onClose, initialRole }) => {
  const [selectedRole, setSelectedRole] = useState(initialRole);

  const resetForms = useCallback(() => {
    setLoginForm({
      email: '',
      password: '',
      rememberMe: false
    });
    setRegisterForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      personalPhone: '',
      address: '',
      dateOfBirth: '',
      specialty: '',
      experience: ''
    });
  }, []);

  useEffect(() => {
    if (isRegisterOpen && initialRole) {
      setSelectedRole(initialRole);
    }
  }, [isRegisterOpen, initialRole]);

  useEffect(() => {
    if (!isRegisterOpen && !isLoginOpen) {
      setSelectedRole(null);
      resetForms();
    }
  }, [isRegisterOpen, isLoginOpen, resetForms]);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    personalPhone: '',
    address: '',
    dateOfBirth: '',
    specialty: '',
    experience: ''
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Implement login logic
    console.log('Login:', loginForm);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Implement registration logic
    console.log('Register:', { role: selectedRole, ...registerForm });
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClose = () => {
    onClose();
    setSelectedRole(null);
    resetForms();
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic
    console.log('Forgot password clicked');
  };

  return (
    <>
      {/* Login Modal */}
      {isLoginOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleClose}>
              <FiX />
            </button>
            <h2>Se connecter</h2>
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="form-group">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={loginForm.rememberMe}
                    onChange={handleLoginChange}
                  />
                  Se souvenir de moi
                </label>
                <button 
                  type="button" 
                  className="forgot-password"
                  onClick={handleForgotPassword}
                >
                  Mot de passe oublié?
                </button>
              </div>
              <button type="submit" className="submit-button">Se connecter</button>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleClose}>
              <FiX />
            </button>
            <h2>S'inscrire</h2>
            
            {!selectedRole ? (
              <div className="role-selection">
                <h3>Choisissez votre rôle</h3>
                <div className="role-buttons">
                  <button 
                    className="role-button"
                    onClick={() => setSelectedRole('patient')}
                  >
                    <FiUser />
                    <span>Patient</span>
                  </button>
                  <button 
                    className="role-button"
                    onClick={() => setSelectedRole('doctor')}
                  >
                    <MdOutlineHealthAndSafety />
                    <span>Médecin</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="auth-form">
                <div className="form-row">
                  <div className="form-group">
                    <FiUser className="input-icon" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Prénom"
                      value={registerForm.firstName}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <FiUser className="input-icon" />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Nom"
                      value={registerForm.lastName}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <FiLock className="input-icon" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <FiLock className="input-icon" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirmer le mot de passe"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <FiMapPin className="input-icon" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Adresse"
                    value={registerForm.address}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                {selectedRole === 'patient' && (
                  <>
                    <div className="form-group">
                      <FiPhone className="input-icon" />
                      <input
                        type="tel"
                        name="personalPhone"
                        placeholder="Téléphone"
                        value={registerForm.personalPhone}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <FiCalendar className="input-icon" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="Date de naissance"
                        value={registerForm.dateOfBirth}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                  </>
                )}

                {selectedRole === 'doctor' && (
                  <>
                    <div className="form-group">
                      <MdOutlineHealthAndSafety className="input-icon" />
                      <select
                        name="specialty"
                        value={registerForm.specialty}
                        onChange={handleRegisterChange}
                        required
                      >
                        <option value="">Sélectionnez une spécialité</option>
                        <option value="generaliste">Généraliste</option>
                        <option value="dentiste">Dentiste</option>
                        <option value="pediatre">Pédiatre</option>
                        <option value="cardiologue">Cardiologue</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <FiPhone className="input-icon" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Téléphone du cabinet"
                        value={registerForm.phone}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <FiPhone className="input-icon" />
                      <input
                        type="tel"
                        name="personalPhone"
                        placeholder="Téléphone personnel"
                        value={registerForm.personalPhone}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <FiCalendar className="input-icon" />
                      <input
                        type="number"
                        name="experience"
                        placeholder="Années d'expérience"
                        value={registerForm.experience}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                  </>
                )}

                <button type="submit" className="submit-button">
                  S'inscrire
                </button>
                <button 
                  type="button" 
                  className="back-button"
                  onClick={() => setSelectedRole(null)}
                >
                  Retour
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModals; 