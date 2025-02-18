import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiMail, FiLock, FiUser, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import '../../styles/AuthModals.css';

const AuthModals = ({ isLoginOpen, isRegisterOpen, onClose, initialRole }) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authService.login(loginForm);
      toast.success('Connexion réussie!');
      onClose();
      // Redirect based on user role
      if (response.user.role === 'patient') {
        navigate('/patient-dashboard');
      } else if (response.user.role === 'doctor') {
        navigate('/doctor-dashboard');
      }
    } catch (error) {
      toast.error(error.message || 'Erreur lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);
    try {
      const userData = {
        ...registerForm,
        role: selectedRole,
      };
      const response = await authService.register(userData);
      toast.success('Inscription réussie!');
      onClose();
      // Redirect based on user role
      if (response.user.role === 'patient') {
        navigate('/patient-dashboard');
      } else if (response.user.role === 'doctor') {
        navigate('/doctor-dashboard');
      }
    } catch (error) {
      toast.error(error.message || 'Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={loginForm.rememberMe}
                    onChange={handleLoginChange}
                    disabled={isLoading}
                  />
                  Se souvenir de moi
                </label>
                <button 
                  type="button" 
                  className="forgot-password"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                >
                  Mot de passe oublié?
                </button>
              </div>
              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Chargement...' : 'Se connecter'}
              </button>
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
                    disabled={isLoading}
                  >
                    <FiUser />
                    <span>Patient</span>
                  </button>
                  <button 
                    className="role-button"
                    onClick={() => setSelectedRole('doctor')}
                    disabled={isLoading}
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                    disabled={isLoading}
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <FiPhone className="input-icon" />
                  <input
                    type="tel"
                    name="personalPhone"
                    placeholder="Téléphone"
                    value={registerForm.personalPhone}
                    onChange={handleRegisterChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                {selectedRole === 'patient' && (
                  <div className="form-group">
                    <FiCalendar className="input-icon" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      placeholder="Date de naissance"
                      value={registerForm.dateOfBirth}
                      onChange={handleRegisterChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
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
                        disabled={isLoading}
                      >
                        <option value="">Sélectionnez une spécialité</option>
                        <option value="generaliste">Généraliste</option>
                        <option value="dentiste">Dentiste</option>
                        <option value="pediatre">Pédiatre</option>
                        <option value="cardiologue">Cardiologue</option>
                      </select>
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
                        disabled={isLoading}
                      />
                    </div>
                  </>
                )}
                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? 'Chargement...' : 'S\'inscrire'}
                </button>
                <button 
                  type="button" 
                  className="back-button"
                  onClick={() => setSelectedRole(null)}
                  disabled={isLoading}
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