import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, CheckCircle, XCircle, Ban } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './DailyAttendance.css';

const DailyAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [subjects, setSubjects] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      const [subjectsRes, historyRes] = await Promise.all([
        axios.get('/api/subjects'),
        axios.get(`/api/dashboard/history?startDate=${selectedDate}&endDate=${selectedDate}`)
      ]);
      
      setSubjects(subjectsRes.data);
      
      // Create a map of subject attendance for the selected date with period numbers
      const attendanceMap = {};
      historyRes.data.forEach(record => {
        const key = `${record.subjectId._id || record.subjectId}-${record.periodNumber || 0}`;
        attendanceMap[key] = record;
      });
      setAttendanceRecords(attendanceMap);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = async (subjectId, status, periodNumber = 0) => {
    try {
      // Check if attendance already exists for this subject and period
      const key = `${subjectId}-${periodNumber}`;
      const existingRecord = attendanceRecords[key];
      
      if (existingRecord) {
        // Delete existing and create new one
        await axios.delete(`/api/attendance/${existingRecord._id}`);
      }
      
      // Mark new attendance
      await axios.post(`/api/subjects/${subjectId}/attendance`, {
        status,
        date: selectedDate,
        notes: '',
        periodNumber
      });
      
      toast.success(`Marked as ${status}${periodNumber > 0 ? ` (Period ${periodNumber})` : ''}`);
      fetchData(); // Refresh data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to mark attendance');
    }
  };

  const handleClearAttendance = async (subjectId, periodNumber = 0) => {
    const key = `${subjectId}-${periodNumber}`;
    const existingRecord = attendanceRecords[key];
    if (!existingRecord) return;

    try {
      await axios.delete(`/api/attendance/${existingRecord._id}`);
      toast.success('Attendance cleared');
      fetchData();
    } catch (error) {
      toast.error('Failed to clear attendance');
    }
  };

  const handlePreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const handleToday = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const isToday = selectedDate === new Date().toISOString().split('T')[0];
  const isFuture = new Date(selectedDate) > new Date(new Date().toISOString().split('T')[0]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="daily-attendance-page">
      <div className="page-header">
        <div>
          <h1>Daily Attendance</h1>
          <p>Mark attendance for all subjects on any day</p>
        </div>
      </div>

      {/* Date Navigator */}
      <div className="date-navigator">
        <button className="nav-btn" onClick={handlePreviousDay}>
          <ChevronLeft size={20} />
          Previous Day
        </button>

        <div className="date-selector">
          <Calendar size={20} />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <button className="nav-btn" onClick={handleNextDay} disabled={isFuture}>
          Next Day
          <ChevronRight size={20} />
        </button>

        {!isToday && (
          <button className="nav-btn today-btn" onClick={handleToday}>
            Today
          </button>
        )}
      </div>

      {/* Selected Date Display */}
      <div className="selected-date-display">
        <h2>{formatDisplayDate(selectedDate)}</h2>
        {isToday && <span className="today-badge">Today</span>}
      </div>

      {/* Subjects List */}
      {subjects.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h3>No subjects added yet</h3>
            <p>Add subjects first to mark daily attendance</p>
          </div>
        </div>
      ) : (
        <div className="subjects-attendance-list">
          {subjects.map((subject) => {
            // Group attendance records by subject to find multiple periods
            const subjectRecords = Object.values(attendanceRecords).filter(
              record => (record.subjectId._id || record.subjectId) === subject._id
            );
            
            // If no records, show single row with period 0
            const periods = subjectRecords.length > 0 
              ? subjectRecords.map(r => r.periodNumber || 0).sort((a, b) => a - b)
              : [0];

            // Check if this subject appears multiple times in timetable
            const hasMultiplePeriods = periods.length > 1 || 
              (subjectRecords.length === 0 && subjects.filter(s => s._id === subject._id).length > 0);

            return periods.map((periodNum, index) => {
              const key = `${subject._id}-${periodNum}`;
              const attendance = attendanceRecords[key];
              const status = attendance?.status;
              const isFirstOfMultiple = hasMultiplePeriods && index === 0;
              const shouldShowPeriod = periodNum > 0 || periods.length > 1;

              return (
                <div key={key} className="subject-attendance-card">
                  <div 
                    className="subject-color-indicator" 
                    style={{ backgroundColor: subject.color }}
                  />
                  
                  <div className="subject-info">
                    <h3>
                      {subject.name}
                      {shouldShowPeriod && (
                        <span className="period-badge">Period {periodNum || (index + 1)}</span>
                      )}
                    </h3>
                    {subject.code && <p className="subject-code">{subject.code}</p>}
                    {subject.teacher && index === 0 && <p className="subject-teacher">👨‍🏫 {subject.teacher}</p>}
                  </div>

                  <div className="attendance-status">
                    {status && (
                      <div className={`current-status ${status}`}>
                        {status === 'present' && <><CheckCircle size={16} /> Present</>}
                        {status === 'absent' && <><XCircle size={16} /> Absent</>}
                        {status === 'cancelled' && <><Ban size={16} /> Cancelled</>}
                      </div>
                    )}
                    {!status && (
                      <div className="current-status unmarked">
                        Not marked
                      </div>
                    )}
                  </div>

                  <div className="attendance-actions">
                    <button
                      className={`action-btn present ${status === 'present' ? 'active' : ''}`}
                      onClick={() => handleMarkAttendance(subject._id, 'present', periodNum || (index + 1))}
                      title="Mark Present"
                    >
                      <CheckCircle size={20} />
                    </button>
                    
                    <button
                      className={`action-btn absent ${status === 'absent' ? 'active' : ''}`}
                      onClick={() => handleMarkAttendance(subject._id, 'absent', periodNum || (index + 1))}
                      title="Mark Absent"
                    >
                      <XCircle size={20} />
                    </button>
                    
                    <button
                      className={`action-btn cancelled ${status === 'cancelled' ? 'active' : ''}`}
                      onClick={() => handleMarkAttendance(subject._id, 'cancelled', periodNum || (index + 1))}
                      title="Class Cancelled"
                    >
                      <Ban size={20} />
                    </button>

                    {status && (
                      <button
                        className="action-btn clear"
                        onClick={() => handleClearAttendance(subject._id, periodNum || (index + 1))}
                        title="Clear attendance"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              );
            });
          })}
        </div>
      )}

      {/* Legend */}
      <div className="legend-card">
        <h3>Quick Guide</h3>
        <div className="legend-items">
          <div className="legend-item">
            <CheckCircle size={20} className="icon-present" />
            <span>Present - You attended the class</span>
          </div>
          <div className="legend-item">
            <XCircle size={20} className="icon-absent" />
            <span>Absent - You missed the class</span>
          </div>
          <div className="legend-item">
            <Ban size={20} className="icon-cancelled" />
            <span>Cancelled - Class was cancelled (doesn't count in stats)</span>
          </div>
        </div>
        <p className="legend-note">
          💡 Tip: Use the calendar or arrow buttons to navigate to any previous day and mark attendance!
        </p>
        <p className="legend-note" style={{ marginTop: '0.5rem' }}>
          📌 Note: If you have the same subject multiple times in a day, each period will be listed separately with a period badge!
        </p>
      </div>
    </div>
  );
};

export default DailyAttendance;
