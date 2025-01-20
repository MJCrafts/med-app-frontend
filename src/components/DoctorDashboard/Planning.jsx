import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { 
  FiCalendar, 
  FiClock, 
  FiCoffee,
  FiAlertCircle,
  FiCopy, 
  FiTrash2, 
  FiPlus,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiPhone
} from 'react-icons/fi';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import '../../styles/Planning.css';

const Planning = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [workDays, setWorkDays] = useState({
    Lundi: true,
    Mardi: true,
    Mercredi: true,
    Jeudi: true,
    Vendredi: true,
    Samedi: true,
    Dimanche: false
  });

  const [workHours, setWorkHours] = useState({
    Lundi: { morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
    Mardi: { morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
    Mercredi: { morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
    Jeudi: { morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
    Vendredi: { morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
    Samedi: { morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
    Dimanche: { morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } }
  });

  const [breaks, setBreaks] = useState([
    {
      id: 1,
      type: 'Pause déjeuner',
      startTime: '12:00',
      duration: '1 heure',
      days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
    }
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [unavailabilityPeriods, setUnavailabilityPeriods] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPeriod, setNewPeriod] = useState({
    startTime: '09:00',
    endTime: '17:00',
    reason: 'Congés'
  });

  const [calendarView, setCalendarView] = useState('month'); // 'day', 'week', 'month'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    patientName: '',
    patientPhone: '',
    duration: '30',
    type: 'consultation'
  });

  const [appointments, setAppointments] = useState([]);

  const tabs = [
    { id: 'calendar', label: 'Vue Calendrier', icon: <FiCalendar /> },
    { id: 'hours', label: 'Horaires de travail', icon: <FiClock /> },
    { id: 'recurring', label: 'Pauses récurrentes', icon: <FiCoffee /> },
    { id: 'unavailable', label: 'Indisponibilités', icon: <FiAlertCircle /> }
  ];

  const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const handleAddBreak = () => {
    const newBreak = {
      id: breaks.length + 1,
      type: 'Pause déjeuner',
      startTime: '12:00',
      duration: '1 heure',
      days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
    };
    setBreaks([...breaks, newBreak]);
  };

  const handleDeleteBreak = (breakId) => {
    setBreaks(breaks.filter(b => b.id !== breakId));
  };

  const handleBreakChange = (breakId, field, value) => {
    setBreaks(breaks.map(b => {
      if (b.id === breakId) {
        return { ...b, [field]: value };
      }
      return b;
    }));
  };

  const handleSaveBreaks = () => {
    console.log('Saving breaks:', breaks);
    alert('Pauses enregistrées avec succès!');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowAddForm(true);
  };

  const handleAddPeriod = () => {
    const period = {
      id: unavailabilityPeriods.length + 1,
      date: selectedDate,
      ...newPeriod
    };
    setUnavailabilityPeriods([...unavailabilityPeriods, period]);
    setShowAddForm(false);
    setNewPeriod({
      startTime: '09:00',
      endTime: '17:00',
      reason: 'Congés'
    });
  };

  const handleDeletePeriod = (periodId) => {
    setUnavailabilityPeriods(unavailabilityPeriods.filter(p => p.id !== periodId));
  };

  const handleSaveUnavailability = () => {
    console.log('Saving unavailability periods:', unavailabilityPeriods);
    alert('Périodes d\'indisponibilité enregistrées avec succès!');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleTimeChange = (day, period, timeType, value) => {
    setWorkHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [period]: {
          ...prev[day][period],
          [timeType]: value
        }
      }
    }));
  };

  const handleCopyHours = (sourceDay) => {
    const sourceDayHours = workHours[sourceDay];
    const updatedWorkHours = { ...workHours };
    
    Object.keys(workHours).forEach(day => {
      if (day !== sourceDay && workDays[day]) {
        updatedWorkHours[day] = JSON.parse(JSON.stringify(sourceDayHours));
      }
    });
    
    setWorkHours(updatedWorkHours);
  };

  const handleSaveWorkHours = () => {
    console.log('Saving work hours:', {
      workDays,
      workHours
    });
    alert('Horaires de travail enregistrés avec succès!');
  };

  const handlePrevDate = () => {
    const newDate = new Date(currentDate);
    if (calendarView === 'day') {
      newDate.setDate(currentDate.getDate() - 1);
    } else if (calendarView === 'week') {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNextDate = () => {
    const newDate = new Date(currentDate);
    if (calendarView === 'day') {
      newDate.setDate(currentDate.getDate() + 1);
    } else if (calendarView === 'week') {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getFormattedDateRange = () => {
    if (calendarView === 'day') {
      return formatDate(currentDate);
    } else if (calendarView === 'week') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - (currentDate.getDay() || 7) + 1);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `${weekStart.getDate()} - ${weekEnd.getDate()} janvier ${weekStart.getFullYear()}`;
    } else {
      return currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    }
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the first Monday before the first day of the month
    const start = new Date(firstDay);
    start.setDate(firstDay.getDate() - (firstDay.getDay() || 7) + 1);
    
    const days = [];
    const current = new Date(start);
    
    while (current <= lastDay || days.length % 7 !== 0) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getWeekDays = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - (currentDate.getDay() || 7) + 1);
    
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      return day;
    });
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const formatDayNumber = (date) => {
    return date.getDate();
  };

  const formatShortWeekDay = (date) => {
    // Get just the first 3 letters without the period
    return date.toLocaleDateString('fr-FR', { weekday: 'short' })
      .slice(0, 3)
      .toLowerCase();
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Date.now(),
      ...appointmentForm,
      date: selectedDate,
      time: selectedTimeSlot,
    };
    setAppointments(prev => [...prev, newAppointment]);
    console.log('Appointment added:', newAppointment);
    setShowAppointmentModal(false);
    setAppointmentForm({
      patientName: '',
      patientPhone: '',
      duration: '30',
      type: 'consultation'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderTimeCell = (time, date) => {
    const appointment = appointments.find(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.getDate() === date.getDate() &&
             aptDate.getMonth() === date.getMonth() &&
             aptDate.getFullYear() === date.getFullYear() &&
             apt.time === time;
    });

    return (
      <div 
        key={`${date}-${time}`}
        className={`time-cell ${appointment ? 'has-appointment' : ''}`}
        onClick={() => {
          if (!appointment) {
            setSelectedDate(date);
            setSelectedTimeSlot(time);
            setShowAppointmentModal(true);
          }
        }}
      >
        {appointment && (
          <div className="appointment-info">
            <div className="appointment-type">{appointment.type}</div>
            <div className="appointment-name">{appointment.patientName}</div>
          </div>
        )}
      </div>
    );
  };

  const renderCalendarView = () => (
    <div className="calendar-view">
      <div className="calendar-header">
        <div className="view-selector">
          <button 
            className={`view-button ${calendarView === 'day' ? 'active' : ''}`}
            onClick={() => setCalendarView('day')}
          >
            Jour
          </button>
          <button 
            className={`view-button ${calendarView === 'week' ? 'active' : ''}`}
            onClick={() => setCalendarView('week')}
          >
            Semaine
          </button>
          <button 
            className={`view-button ${calendarView === 'month' ? 'active' : ''}`}
            onClick={() => setCalendarView('month')}
          >
            Mois
          </button>
        </div>

        <div className="calendar-navigation">
          <button className="nav-button" onClick={handlePrevDate}>
            <FiChevronLeft />
          </button>
          <h2 className="current-date">{getFormattedDateRange()}</h2>
          <button className="nav-button" onClick={handleNextDate}>
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {calendarView === 'month' && (
          <div className="month-view">
            <div className="weekdays">
              {weekDays.map(day => (
                <div key={day} className="weekday">{day.slice(0, 3)}</div>
              ))}
            </div>
            <div className="days">
              {getMonthDays().map((date, index) => (
                <div 
                  key={index}
                  className={`day-cell ${isToday(date) ? 'today' : ''} ${
                    isCurrentMonth(date) ? 'current-month' : 'other-month'
                  }`}
                >
                  <span className="day-number">{formatDayNumber(date)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {calendarView === 'week' && (
          <div className="week-view">
            <div className="week-header">
              <div className="time-column"></div>
              {getWeekDays().map((date, index) => (
                <div 
                  key={index} 
                  className={`day-column-header ${isToday(date) ? 'today' : ''}`}
                >
                  <div className="weekday">{formatShortWeekDay(date)}</div>
                  <div className="day-number">{formatDayNumber(date)}</div>
                </div>
              ))}
            </div>
            <div className="week-grid">
              <div className="week-grid-content">
                <div className="time-column">
                  {timeSlots.map((time, index) => (
                    <div key={index} className="time-slot">
                      {time}
                    </div>
                  ))}
                </div>
                {getWeekDays().map((date, dayIndex) => (
                  <div key={dayIndex} className={`day-column ${isToday(date) ? 'today' : ''}`}>
                    {timeSlots.map((time, timeIndex) => renderTimeCell(time, date))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {calendarView === 'day' && (
          <div className="day-view">
            <div className="day-header">
              <div className="time-column"></div>
              <div className={`day-column-header ${isToday(currentDate) ? 'today' : ''}`}>
                <div className="weekday">{formatShortWeekDay(currentDate)}</div>
                <div className="day-number">{formatDayNumber(currentDate)}</div>
              </div>
            </div>
            <div className="day-grid">
              <div className="time-column">
                {timeSlots.map((time, index) => (
                  <div key={index} className="time-slot">
                    <span>{time}</span>
                  </div>
                ))}
              </div>
              <div className={`day-column ${isToday(currentDate) ? 'today' : ''}`}>
                {timeSlots.map((time, index) => renderTimeCell(time, currentDate))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderWorkHours = () => (
    <div className="work-hours">
      <div className="work-hours-header">
        <div>
          <h2>Horaires de travail</h2>
          <p className="subtitle">Définissez vos horaires de consultation habituels</p>
        </div>
        <button className="save-button" onClick={handleSaveWorkHours}>
          Enregistrer
        </button>
      </div>

      <div className="schedule-section">
        <div className="days-schedule">
          {Object.entries(workDays).map(([day, isActive]) => (
            <div key={day} className="day-row">
              <div className="day-toggle">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => setWorkDays(prev => ({ ...prev, [day]: !prev[day] }))}
                  />
                  <span className="slider"></span>
                </label>
                <span className="day-name">{day}</span>
              </div>

              {isActive && (
                <div className="hours-inputs">
                  <div className="time-section">
                    <span className="time-label">Matin</span>
                    <div className="time-inputs">
                      <input
                        type="time"
                        value={workHours[day].morning.start}
                        onChange={(e) => handleTimeChange(day, 'morning', 'start', e.target.value)}
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={workHours[day].morning.end}
                        onChange={(e) => handleTimeChange(day, 'morning', 'end', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="time-section">
                    <span className="time-label">Après-midi</span>
                    <div className="time-inputs">
                      <input
                        type="time"
                        value={workHours[day].afternoon.start}
                        onChange={(e) => handleTimeChange(day, 'afternoon', 'start', e.target.value)}
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={workHours[day].afternoon.end}
                        onChange={(e) => handleTimeChange(day, 'afternoon', 'end', e.target.value)}
                      />
                    </div>
                  </div>

                  <button className="copy-button" onClick={() => handleCopyHours(day)}>
                    <FiCopy />
                    Copier vers tous les jours
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecurringBreaks = () => (
    <div className="recurring-breaks">
      <div className="work-hours-header">
        <div>
          <h2>Pauses récurrentes</h2>
          <p className="subtitle">Définissez vos pauses régulières (déjeuner, réunions, etc.)</p>
        </div>
        <div className="header-buttons">
          <button className="add-button" onClick={handleAddBreak}>
            Ajouter une pause
          </button>
          <button className="save-button" onClick={handleSaveBreaks}>
            Enregistrer
          </button>
        </div>
      </div>

      <div className="breaks-section">
        {breaks.map((breakItem) => (
          <div key={breakItem.id} className="break-form">
            <div className="form-row">
              <div className="form-group">
                <label>Type de pause</label>
                <select 
                  value={breakItem.type}
                  onChange={(e) => handleBreakChange(breakItem.id, 'type', e.target.value)}
                >
                  <option>Pause déjeuner</option>
                  <option>Réunion</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="form-group">
                <label>Heure de début</label>
                <input 
                  type="time" 
                  value={breakItem.startTime}
                  onChange={(e) => handleBreakChange(breakItem.id, 'startTime', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Durée</label>
                <select 
                  value={breakItem.duration}
                  onChange={(e) => handleBreakChange(breakItem.id, 'duration', e.target.value)}
                >
                  <option>30 minutes</option>
                  <option>1 heure</option>
                  <option>1 heure 30</option>
                  <option>2 heures</option>
                </select>
              </div>
              <button 
                className="delete-button"
                onClick={() => handleDeleteBreak(breakItem.id)}
              >
                <FiTrash2 />
                Supprimer
              </button>
            </div>

            <div className="days-selection">
              <label>Jours de la semaine</label>
              <div className="days-buttons">
                {weekDays.map((day) => (
                  <button
                    key={day}
                    className={`day-button ${breakItem.days.includes(day) ? 'active' : ''}`}
                    onClick={() => {
                      const newDays = breakItem.days.includes(day)
                        ? breakItem.days.filter(d => d !== day)
                        : [...breakItem.days, day];
                      handleBreakChange(breakItem.id, 'days', newDays);
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUnavailability = () => (
    <div className="unavailability">
      <div className="work-hours-header">
        <div>
          <h2>Indisponibilités</h2>
          <p className="subtitle">Marquez vos périodes d'indisponibilité spécifiques</p>
        </div>
        <button className="save-button" onClick={handleSaveUnavailability}>
          <FiCalendar />
          Enregistrer
        </button>
      </div>

      <div className="unavailability-content">
        <div className="calendar-section">
          <h3>Calendrier</h3>
          <p className="subtitle">Sélectionnez une date pour ajouter une indisponibilité</p>
          <div className="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={new Date()}
              className="custom-calendar"
            />
          </div>
        </div>

        <div className="periods-section">
          <div className="periods-header">
            <h3>Périodes d'indisponibilité</h3>
            <p className="subtitle">Gérez vos périodes d'indisponibilité</p>
            <button className="add-button" onClick={() => setShowAddForm(true)}>
              <FiPlus />
              Ajouter une indisponibilité
            </button>
          </div>
          
          <div className="periods-list">
            {showAddForm && (
              <div className="period-form">
                <div className="form-header">
                  <h4>Nouvelle indisponibilité</h4>
                  <button className="close-button" onClick={() => setShowAddForm(false)}>
                    <FiX />
                  </button>
                </div>
                <div className="form-content">
                  <div className="form-group">
                    <label>Date</label>
                    <input type="text" value={formatDate(selectedDate)} disabled />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Heure de début</label>
                      <input
                        type="time"
                        value={newPeriod.startTime}
                        onChange={(e) => setNewPeriod({...newPeriod, startTime: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Heure de fin</label>
                      <input
                        type="time"
                        value={newPeriod.endTime}
                        onChange={(e) => setNewPeriod({...newPeriod, endTime: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Motif</label>
                    <select
                      value={newPeriod.reason}
                      onChange={(e) => setNewPeriod({...newPeriod, reason: e.target.value})}
                    >
                      <option>Congés</option>
                      <option>Formation</option>
                      <option>Rendez-vous personnel</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <button className="save-button" onClick={handleAddPeriod}>
                    Ajouter
                  </button>
                </div>
              </div>
            )}

            {unavailabilityPeriods.length === 0 && !showAddForm ? (
              <div className="empty-state">
                <p>Aucune indisponibilité définie. Sélectionnez une date et cliquez sur "Ajouter une indisponibilité".</p>
              </div>
            ) : (
              <div className="periods-grid">
                {unavailabilityPeriods.map((period) => (
                  <div key={period.id} className="period-card">
                    <div className="period-info">
                      <div className="period-date">{formatDate(period.date)}</div>
                      <div className="period-time">
                        {period.startTime} - {period.endTime}
                      </div>
                      <div className="period-reason">{period.reason}</div>
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => handleDeletePeriod(period.id)}
                    >
                      <FiTrash2 />
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <NavBar />
        <div className="dashboard-content">
          <div className="planning-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="planning-content">
            {activeTab === 'calendar' && renderCalendarView()}
            {activeTab === 'hours' && renderWorkHours()}
            {activeTab === 'recurring' && renderRecurringBreaks()}
            {activeTab === 'unavailable' && renderUnavailability()}
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Nouveau rendez-vous</h3>
              <button 
                className="close-button"
                onClick={() => setShowAppointmentModal(false)}
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleAppointmentSubmit} className="appointment-form">
              <div className="form-group">
                <label>
                  <FiUser className="input-icon" />
                  Nom du patient
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={appointmentForm.patientName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <FiPhone className="input-icon" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="patientPhone"
                  value={appointmentForm.patientPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Type de rendez-vous</label>
                  <select
                    name="type"
                    value={appointmentForm.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="consultation">Consultation</option>
                    <option value="suivi">Suivi</option>
                    <option value="urgence">Urgence</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Durée (minutes)</label>
                  <select
                    name="duration"
                    value={appointmentForm.duration}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">1 heure</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowAppointmentModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="submit-button">
                  Confirmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planning; 