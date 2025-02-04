import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiSearch, FiFilter, FiUser, FiMapPin, FiClock, FiStar, FiChevronRight } from 'react-icons/fi';
import NavBar from './NavBar';
import '../../styles/SearchDoctors.css';

const SearchDoctors = () => {
  const location = useLocation();
  const { searchQuery: initialQuery = '', specialty: initialSpecialty = '', city: initialCity = '', location: initialLocation = '' } = location.state || {};

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty || 'tous');
  const [selectedLocation, setSelectedLocation] = useState(initialCity || 'tous');

  // Dummy data for doctors with more details
  const doctors = [
    {
      id: 1,
      name: 'Dr. Marie Laurent',
      specialty: 'Médecin généraliste',
      address: '123 Avenue de la République, Paris',
      rating: 4.8,
      experience: '15 ans',
      price: '25€',
      availableTimeSlots: ['09:00', '10:00', '14:00', '15:00', '16:00']
    },
    {
      id: 2,
      name: 'Dr. Thomas Bernard',
      specialty: 'Cardiologue',
      address: '45 Rue de la Santé, Paris',
      rating: 4.9,
      experience: '20 ans',
      price: '50€',
      availableTimeSlots: ['09:30', '11:00', '14:30', '16:30']
    },
    {
      id: 3,
      name: 'Dr. Sophie Dubois',
      specialty: 'Dermatologue',
      address: '78 Boulevard Saint-Michel, Paris',
      rating: 4.7,
      experience: '12 ans',
      price: '45€',
      availableTimeSlots: ['10:00', '11:00', '15:00', '16:00', '17:00']
    }
  ];

  const specialties = ['tous', 'Médecin généraliste', 'Cardiologue', 'Dermatologue'];
  const locations = ['tous', 'Paris', 'Lyon', 'Marseille'];

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality is handled by filtering in the render
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  // Filter doctors based on search criteria
  const filteredDoctors = doctors.filter(doctor => {
    return (
      (!searchTerm || doctor.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSpecialty === 'tous' || doctor.specialty === selectedSpecialty) &&
      (selectedLocation === 'tous' || doctor.address.toLowerCase().includes(selectedLocation.toLowerCase()))
    );
  });

  return (
    <>
      <NavBar />
      <div className="search-doctors-page">
        <div className="booking-header">
          <div className="booking-title">
            <h1>Prendre un rendez-vous</h1>
            <div className="booking-steps">
              <div className={`step ${!selectedDoctor ? 'active' : 'completed'}`}>
                1. Choisir un médecin
              </div>
              <FiChevronRight />
              <div className={`step ${selectedDoctor && !selectedTimeSlot ? 'active' : selectedTimeSlot ? 'completed' : ''}`}>
                2. Sélectionner un créneau
              </div>
              <FiChevronRight />
              <div className={`step ${selectedTimeSlot ? 'active' : ''}`}>
                3. Confirmer le rendez-vous
              </div>
            </div>
          </div>
        </div>

        <div className="booking-content">
          <div className="search-section">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-row">
                <div className="search-input-container">
                  <FiSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Rechercher un médecin"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filter-container">
                  <FiFilter className="filter-icon" />
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                  >
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>
                        {specialty === 'tous' ? 'Toutes les spécialités' : specialty}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="filter-container">
                  <FiMapPin className="filter-icon" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>
                        {location === 'tous' ? 'Toutes les villes' : location}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="search-button">
                  <FiSearch /> Rechercher
                </button>
              </div>
            </form>
          </div>

          <div className="doctors-grid">
            {selectedDoctor ? (
              <div className="doctor-card selected">
                <div className="doctor-avatar">
                  <FiUser size={32} />
                </div>
                <div className="doctor-details">
                  <div className="doctor-main-info">
                    <h3>{selectedDoctor.name}</h3>
                    <span className="specialty-tag">{selectedDoctor.specialty}</span>
                  </div>
                  <div className="doctor-secondary-info">
                    <div className="info-item">
                      <FiMapPin />
                      <span>{selectedDoctor.address}</span>
                    </div>
                    <div className="info-item">
                      <FiClock />
                      <span>{selectedDoctor.experience} d'expérience</span>
                    </div>
                    <div className="info-item">
                      <FiStar />
                      <span>{selectedDoctor.rating}/5</span>
                    </div>
                  </div>
                  <div className="consultation-info">
                    <span className="price">Consultation: {selectedDoctor.price}</span>
                    <button className="select-button" onClick={() => setSelectedDoctor(null)}>
                      Changer de médecin
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              filteredDoctors.map(doctor => (
                <div
                  key={doctor.id}
                  className="doctor-card"
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <div className="doctor-avatar">
                    <FiUser size={32} />
                  </div>
                  <div className="doctor-details">
                    <div className="doctor-main-info">
                      <h3>{doctor.name}</h3>
                      <span className="specialty-tag">{doctor.specialty}</span>
                    </div>
                    <div className="doctor-secondary-info">
                      <div className="info-item">
                        <FiMapPin />
                        <span>{doctor.address}</span>
                      </div>
                      <div className="info-item">
                        <FiClock />
                        <span>{doctor.experience} d'expérience</span>
                      </div>
                      <div className="info-item">
                        <FiStar />
                        <span>{doctor.rating}/5</span>
                      </div>
                    </div>
                    <div className="consultation-info">
                      <span className="price">Consultation: {doctor.price}</span>
                      <button className="select-button">
                        Choisir
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedDoctor && (
            <div className="appointment-section">
              <div className="section-title">
                <h2>Sélectionner un créneau avec {selectedDoctor.name}</h2>
              </div>
              <div className="date-grid">
                {[...Array(7)].map((_, index) => {
                  const date = new Date();
                  date.setDate(date.getDate() + index);
                  return (
                    <div
                      key={index}
                      className={`date-card ${selectedDate === date.toDateString() ? 'selected' : ''}`}
                      onClick={() => handleDateSelect(date.toDateString())}
                    >
                      <span className="day">{date.toLocaleDateString('fr-FR', { weekday: 'short' })}</span>
                      <span className="date">{date.getDate()}</span>
                      <span className="month">{date.toLocaleDateString('fr-FR', { month: 'short' })}</span>
                    </div>
                  );
                })}
              </div>

              {selectedDate && (
                <div className="time-slots">
                  <h3>Créneaux disponibles</h3>
                  <div className="time-grid">
                    {selectedDoctor.availableTimeSlots.map(timeSlot => (
                      <div
                        key={timeSlot}
                        className={`time-slot ${selectedTimeSlot === timeSlot ? 'selected' : ''}`}
                        onClick={() => handleTimeSlotSelect(timeSlot)}
                      >
                        {timeSlot}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTimeSlot && (
                <div className="appointment-summary">
                  <h3>Résumé du rendez-vous</h3>
                  <div className="summary-details">
                    <p><strong>Médecin:</strong> {selectedDoctor.name}</p>
                    <p><strong>Date:</strong> {selectedDate}</p>
                    <p><strong>Heure:</strong> {selectedTimeSlot}</p>
                    <p><strong>Prix:</strong> {selectedDoctor.price}</p>
                  </div>
                  <button className="confirm-button">
                    Confirmer le rendez-vous
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchDoctors; 