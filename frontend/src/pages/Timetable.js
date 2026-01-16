import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, X, Clock, MapPin } from 'lucide-react';
import './Timetable.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Timetable() {
  const [timetable, setTimetable] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [timetableRes, subjectsRes] = await Promise.all([
        axios.get('/api/timetable'),
        axios.get('/api/subjects')
      ]);
      setTimetable(timetableRes.data);
      setSubjects(subjectsRes.data);
    } catch (error) {
      toast.error('Failed to load timetable');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (day) => {
    setSelectedDay(day);
    const dayTimetable = timetable.find(t => t.day === day);
    
    if (dayTimetable) {
      setPeriods(dayTimetable.periods.map(p => ({
        subjectId: p.subjectId._id || p.subjectId,
        startTime: p.startTime,
        endTime: p.endTime,
        room: p.room || '',
        periodNumber: p.periodNumber
      })));
    } else {
      setPeriods([{
        subjectId: '',
        startTime: '09:00',
        endTime: '10:00',
        room: '',
        periodNumber: 1
      }]);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDay(null);
    setPeriods([]);
  };

  const addPeriod = () => {
    const lastPeriod = periods[periods.length - 1];
    setPeriods([
      ...periods,
      {
        subjectId: '',
        startTime: lastPeriod?.endTime || '09:00',
        endTime: '',
        room: '',
        periodNumber: periods.length + 1
      }
    ]);
  };

  const removePeriod = (index) => {
    setPeriods(periods.filter((_, i) => i !== index));
  };

  const updatePeriod = (index, field, value) => {
    const newPeriods = [...periods];
    newPeriods[index][field] = value;
    setPeriods(newPeriods);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (periods.some(p => !p.subjectId || !p.startTime || !p.endTime)) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await axios.post('/api/timetable', {
        day: selectedDay,
        periods: periods.map((p, index) => ({
          ...p,
          periodNumber: index + 1
        }))
      });
      
      toast.success('Timetable updated successfully');
      fetchData();
      closeModal();
    } catch (error) {
      toast.error('Failed to update timetable');
    }
  };

  const handleDelete = async (day) => {
    if (!window.confirm(`Delete timetable for ${day}?`)) return;
    
    try {
      await axios.delete(`/api/timetable/${day}`);
      setTimetable(timetable.filter(t => t.day !== day));
      toast.success('Timetable deleted successfully');
    } catch (error) {
      toast.error('Failed to delete timetable');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="timetable-page">
      <div className="page-header">
        <div>
          <h1>Timetable</h1>
          <p>Manage your weekly class schedule</p>
        </div>
      </div>

      <div className="timetable-container">
        {DAYS.map(day => {
          const dayTimetable = timetable.find(t => t.day === day);
          
          return (
            <div key={day} className="day-schedule">
              <div className="day-header">
                <h3>{day}</h3>
                <div className="day-actions">
                  <button className="btn-small btn-primary" onClick={() => openModal(day)}>
                    {dayTimetable ? 'Edit' : 'Add'}
                  </button>
                  {dayTimetable && (
                    <button className="btn-small btn-secondary" onClick={() => handleDelete(day)}>
                      Delete
                    </button>
                  )}
                </div>
              </div>

              <div className="periods-list">
                {dayTimetable ? (
                  dayTimetable.periods
                    .sort((a, b) => a.periodNumber - b.periodNumber)
                    .map((period, index) => (
                      <div 
                        key={index} 
                        className="period-card"
                        style={{ borderLeftColor: period.subjectId?.color || '#4F46E5' }}
                      >
                        <div className="period-header">
                          <span className="period-number">Period {period.periodNumber}</span>
                          <span className="period-time">
                            <Clock size={14} />
                            {period.startTime} - {period.endTime}
                          </span>
                        </div>
                        <h4>{period.subjectId?.name || 'Unknown Subject'}</h4>
                        {period.subjectId?.code && (
                          <p className="period-code">{period.subjectId.code}</p>
                        )}
                        {period.room && (
                          <p className="period-room">
                            <MapPin size={14} />
                            {period.room}
                          </p>
                        )}
                      </div>
                    ))
                ) : (
                  <div className="no-periods">
                    <p>No classes scheduled</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Timetable Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Timetable - {selectedDay}</h2>
              <button className="modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="periods-form">
                {periods.map((period, index) => (
                  <div key={index} className="period-form-row">
                    <div className="period-form-header">
                      <h4>Period {index + 1}</h4>
                      {periods.length > 1 && (
                        <button
                          type="button"
                          className="btn-icon danger"
                          onClick={() => removePeriod(index)}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Subject *</label>
                        <select
                          value={period.subjectId}
                          onChange={(e) => updatePeriod(index, 'subjectId', e.target.value)}
                          required
                        >
                          <option value="">Select subject</option>
                          {subjects.map(subject => (
                            <option key={subject._id} value={subject._id}>
                              {subject.name} {subject.code ? `(${subject.code})` : ''}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Start Time *</label>
                        <input
                          type="time"
                          value={period.startTime}
                          onChange={(e) => updatePeriod(index, 'startTime', e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>End Time *</label>
                        <input
                          type="time"
                          value={period.endTime}
                          onChange={(e) => updatePeriod(index, 'endTime', e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Room</label>
                        <input
                          type="text"
                          value={period.room}
                          onChange={(e) => updatePeriod(index, 'room', e.target.value)}
                          placeholder="e.g., Room 101"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  onClick={addPeriod}
                >
                  <Plus size={18} />
                  Add Period
                </button>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Timetable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Timetable;
