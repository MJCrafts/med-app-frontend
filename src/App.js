import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard/PatientDashboard';
import DoctorPlanning from './components/DoctorDashboard/Planning';
import DoctorAppointments from './components/Appointments/Appointments';
import DoctorProfile from './components/DoctorDashboard/Profile';
import PatientAppointments from './components/PatientDashboard/PatientAppointments';
import PatientProfile from './components/PatientDashboard/PatientProfile';
import MedicalRecords from './components/PatientDashboard/MedicalRecords';
import BookAppointment from './components/PatientDashboard/BookAppointment';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/planning" element={<DoctorPlanning />} />
          <Route path="/appointments" element={<DoctorAppointments />} />
          <Route path="/profile" element={<DoctorProfile />} />
          
          {/* Patient Routes */}
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/patient-appointments" element={<PatientAppointments />} />
          <Route path="/patient-profile" element={<PatientProfile />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
