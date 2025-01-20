import React, { useState } from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import { FiFileText, FiDownload, FiEye, FiSearch, FiFilter, FiCalendar, FiUser } from 'react-icons/fi';
import '../../styles/PatientDashboard.css';

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('tous');
  const [selectedDoctor, setSelectedDoctor] = useState('tous');

  const documents = [
    {
      id: 1,
      title: 'Ordonnance - Traitement antibiotique',
      doctor: 'Dr. Marie Laurent',
      date: '5 décembre 2023',
      type: 'Ordonnance',
      description: 'Traitement pour infection respiratoire'
    },
    {
      id: 2,
      title: 'Résultats analyse sanguine',
      doctor: 'Dr. Thomas Bernard',
      date: '15 novembre 2023',
      type: 'Analyse',
      description: 'Bilan sanguin complet'
    },
    {
      id: 3,
      title: 'Compte rendu consultation',
      doctor: 'Dr. Marie Laurent',
      date: '5 décembre 2023',
      type: 'Compte rendu',
      description: 'Consultation de suivi général'
    },
    {
      id: 4,
      title: 'Radiographie thorax',
      doctor: 'Dr. Sophie Dubois',
      date: '10 octobre 2023',
      type: 'Imagerie',
      description: 'Contrôle annuel'
    }
  ];

  const documentTypes = ['tous', 'Ordonnance', 'Analyse', 'Compte rendu', 'Imagerie'];
  const doctors = ['tous', 'Dr. Marie Laurent', 'Dr. Thomas Bernard', 'Dr. Sophie Dubois'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'tous' || doc.type === selectedType;
    const matchesDoctor = selectedDoctor === 'tous' || doc.doctor === selectedDoctor;
    return matchesSearch && matchesType && matchesDoctor;
  });

  const handleView = (doc) => {
    // Implement document view logic
    console.log('Viewing document:', doc.title);
  };

  const handleDownload = (doc) => {
    // Implement document download logic
    console.log('Downloading document:', doc.title);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <NavBar />
        <div className="dashboard-content">
          <div className="medical-records-header">
            <div>
              <h1>Dossier médical</h1>
              <p>Consultez et gérez vos documents médicaux</p>
            </div>
            <div className="medical-records-stats">
              <div className="stat-item">
                <span className="stat-value">{documents.length}</span>
                <span className="stat-label">Documents</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{new Set(documents.map(d => d.type)).size}</span>
                <span className="stat-label">Types</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{new Set(documents.map(d => d.doctor)).size}</span>
                <span className="stat-label">Médecins</span>
              </div>
            </div>
          </div>

          <div className="medical-records-filters">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un document..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filters-group">
              <div className="filter-container">
                <FiFilter className="filter-icon" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="filter-select"
                >
                  {documentTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'tous' ? 'Tous les types' : type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-container">
                <FiUser className="filter-icon" />
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="filter-select"
                >
                  {doctors.map(doctor => (
                    <option key={doctor} value={doctor}>
                      {doctor === 'tous' ? 'Tous les médecins' : doctor}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="documents-grid">
            {filteredDocuments.map(doc => (
              <div key={doc.id} className="document-card">
                <div className="document-header">
                  <div className="document-icon">
                    <FiFileText size={24} />
                  </div>
                  <span className="document-type-tag">{doc.type}</span>
                </div>
                <div className="document-content">
                  <h3>{doc.title}</h3>
                  <p className="document-description">{doc.description}</p>
                  <div className="document-meta">
                    <div className="meta-item">
                      <FiUser className="meta-icon" />
                      <span>{doc.doctor}</span>
                    </div>
                    <div className="meta-item">
                      <FiCalendar className="meta-icon" />
                      <span>{doc.date}</span>
                    </div>
                  </div>
                </div>
                <div className="document-actions">
                  <button className="action-button view" onClick={() => handleView(doc)}>
                    <FiEye />
                    <span>Voir</span>
                  </button>
                  <button className="action-button download" onClick={() => handleDownload(doc)}>
                    <FiDownload />
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords; 