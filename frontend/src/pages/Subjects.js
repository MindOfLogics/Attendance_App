import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, X, CheckCircle, XCircle, Edit2, Trash2, Calendar, Ban } from 'lucide-react';
import './Subjects.css';

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    teacher: '',
    color: '#4F46E5',
    credits: 3
  });
  const [attendanceData, setAttendanceData] = useState({
    status: 'present',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    periodNumber: 1
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const { data } = await axios.get('/api/subjects');
      setSubjects(data);
    } catch (error) {
      toast.error('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingSubject) {
        const { data } = await axios.put(`/api/subjects/${editingSubject._id}`, formData);
        setSubjects(subjects.map(s => s._id === data._id ? data : s));
        toast.success('Subject updated successfully');
      } else {
        const { data } = await axios.post('/api/subjects', formData);
        setSubjects([...subjects, data]);
        toast.success('Subject added successfully');
      }
      
      closeModal();
    } catch (error) {
      toast.error('Failed to save subject');
    }
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`/api/subjects/${selectedSubject._id}/attendance`, attendanceData);
      toast.success('Attendance marked successfully');
      fetchSubjects();
      closeAttendanceModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to mark attendance');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subject?')) return;
    
    try {
      await axios.delete(`/api/subjects/${id}`);
      setSubjects(subjects.filter(s => s._id !== id));
      toast.success('Subject deleted successfully');
    } catch (error) {
      toast.error('Failed to delete subject');
    }
  };

  const openModal = (subject = null) => {
    if (subject) {
      setEditingSubject(subject);
      setFormData({
        name: subject.name,
        code: subject.code || '',
        teacher: subject.teacher || '',
        color: subject.color || '#4F46E5',
        credits: subject.credits || 3
      });
    } else {
      setEditingSubject(null);
      setFormData({
        name: '',
        code: '',
        teacher: '',
        color: '#4F46E5',
        credits: 3
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSubject(null);
  };

  const openAttendanceModal = (subject) => {
    setSelectedSubject(subject);
    setAttendanceData({
      status: 'present',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowAttendanceModal(true);
  };

  const closeAttendanceModal = () => {
    setShowAttendanceModal(false);
    setSelectedSubject(null);
  };

  const openHistoryModal = async (subject) => {
    setSelectedSubject(subject);
    try {
      const { data } = await axios.get(`/api/dashboard/history?subjectId=${subject._id}`);
      setAttendanceHistory(data);
      setShowHistoryModal(true);
    } catch (error) {
      toast.error('Failed to load attendance history');
    }
  };

  const closeHistoryModal = () => {
    setShowHistoryModal(false);
    setSelectedSubject(null);
    setAttendanceHistory([]);
  };

  const handleDeleteAttendance = async (attendanceId) => {
    if (!window.confirm('Delete this attendance record?')) return;
    
    try {
      await axios.delete(`/api/attendance/${attendanceId}`);
      toast.success('Attendance deleted successfully');
      fetchSubjects();
      openHistoryModal(selectedSubject); // Refresh history
    } catch (error) {
      toast.error('Failed to delete attendance');
    }
  };

  const colors = [
    '#4F46E5', '#7C3AED', '#DB2777', '#DC2626', 
    '#EA580C', '#D97706', '#059669', '#0891B2'
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="subjects-page">
      <div className="page-header">
        <div>
          <h1>Subjects</h1>
          <p>Manage your subjects and track attendance</p>
        </div>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <Plus size={20} />
          Add Subject
        </button>
      </div>

      {subjects.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h3>No subjects yet</h3>
            <p>Add your first subject to start tracking attendance</p>
            <button className="btn btn-primary" onClick={() => openModal()}>
              <Plus size={20} />
              Add Subject
            </button>
          </div>
        </div>
      ) : (
        <div className="subjects-grid">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject._id}
              subject={subject}
              onEdit={() => openModal(subject)}
              onDelete={() => handleDelete(subject._id)}
              onMarkAttendance={() => openAttendanceModal(subject)}
              onViewHistory={() => openHistoryModal(subject)}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Subject Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingSubject ? 'Edit Subject' : 'Add Subject'}</h2>
              <button className="modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Subject Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mathematics"
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., MATH101"
                />
              </div>

              <div className="form-group">
                <label>Teacher Name</label>
                <input
                  type="text"
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  placeholder="e.g., Dr. Smith"
                />
              </div>

              <div className="form-group">
                <label>Credits</label>
                <input
                  type="number"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
                  min="1"
                  max="10"
                />
              </div>

              <div className="form-group">
                <label>Color</label>
                <div className="color-picker">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${formData.color === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData({ ...formData, color })}
                    />
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingSubject ? 'Update' : 'Add'} Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attendance History Modal */}
      {showHistoryModal && (
        <div className="modal-overlay" onClick={closeHistoryModal}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Attendance History - {selectedSubject?.name}</h2>
              <button className="modal-close" onClick={closeHistoryModal}>
                <X size={20} />
              </button>
            </div>

            <div className="attendance-history-list">
              {attendanceHistory.length === 0 ? (
                <div className="empty-state">
                  <Calendar size={48} />
                  <p>No attendance records yet</p>
                </div>
              ) : (
                attendanceHistory.map((record) => (
                  <div key={record._id} className="history-item">
                    <div className="history-date">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                      {record.periodNumber > 0 && (
                        <span className="period-badge-small">
                          Period {record.periodNumber}
                        </span>
                      )}
                    </div>
                    <div className="history-status">
                      <span className={`status-badge ${record.status}`}>
                        {record.status === 'present' && <CheckCircle size={16} />}
                        {record.status === 'absent' && <XCircle size={16} />}
                        {record.status === 'cancelled' && <Ban size={16} />}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                    {record.notes && (
                      <div className="history-notes">{record.notes}</div>
                    )}
                    <button
                      className="btn-icon danger"
                      onClick={() => handleDeleteAttendance(record._id)}
                      title="Delete this record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeHistoryModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mark Attendance Modal */}
      {showAttendanceModal && (
        <div className="modal-overlay" onClick={closeAttendanceModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Mark Attendance - {selectedSubject?.name}</h2>
              <button className="modal-close" onClick={closeAttendanceModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleMarkAttendance}>
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={attendanceData.date}
                  onChange={(e) => setAttendanceData({ ...attendanceData, date: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Status *</label>
                <div className="attendance-options">
                  <button
                    type="button"
                    className={`attendance-btn ${attendanceData.status === 'present' ? 'active present' : ''}`}
                    onClick={() => setAttendanceData({ ...attendanceData, status: 'present' })}
                  >
                    <CheckCircle size={20} />
                    Present
                  </button>
                  <button
                    type="button"
                    className={`attendance-btn ${attendanceData.status === 'absent' ? 'active absent' : ''}`}
                    onClick={() => setAttendanceData({ ...attendanceData, status: 'absent' })}
                  >
                    <XCircle size={20} />
                    Absent
                  </button>
                  <button
                    type="button"
                    className={`attendance-btn ${attendanceData.status === 'cancelled' ? 'active cancelled' : ''}`}
                    onClick={() => setAttendanceData({ ...attendanceData, status: 'cancelled' })}
                  >
                    <Ban size={20} />
                    Class Cancelled
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Period Number</label>
                <input
                  type="number"
                  value={attendanceData.periodNumber}
                  onChange={(e) => setAttendanceData({ ...attendanceData, periodNumber: parseInt(e.target.value) || 1 })}
                  min="1"
                  max="10"
                  placeholder="1"
                />
                <small style={{color: 'var(--gray-500)', fontSize: '0.85rem', display: 'block', marginTop: '0.25rem'}}>
                  Enter period number if this subject has multiple classes today (e.g., 1, 2, 3)
                </small>
              </div>

              <div className="form-group">
                <label>Notes (Optional)</label>
                <textarea
                  value={attendanceData.notes}
                  onChange={(e) => setAttendanceData({ ...attendanceData, notes: e.target.value })}
                  placeholder="Add any notes..."
                  rows="3"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeAttendanceModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Mark Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SubjectCard({ subject, onEdit, onDelete, onMarkAttendance, onViewHistory }) {
  const percentage = parseFloat(subject.attendancePercentage || 0);
  const isLow = percentage < 75;

  return (
    <div className="subject-card-small">
      <div className="subject-card-header">
        <div className="subject-color-bar" style={{ backgroundColor: subject.color }} />
        <div className="subject-card-actions">
          <button className="icon-btn" onClick={onEdit}>
            <Edit2 size={16} />
          </button>
          <button className="icon-btn danger" onClick={onDelete}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="subject-card-body">
        <h3>{subject.name}</h3>
        {subject.code && <p className="subject-code">{subject.code}</p>}
        {subject.teacher && <p className="subject-teacher">👨‍🏫 {subject.teacher}</p>}

        <div className="subject-card-stats">
          <div className="stat">
            <span className={`percentage ${isLow ? 'low' : 'good'}`}>
              {percentage}%
            </span>
            <span className="stat-label">Attendance</span>
          </div>
          <div className="stat">
            <span className="stat-value">{subject.attendedClasses}/{subject.totalClasses}</span>
            <span className="stat-label">Classes</span>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <button 
            className="btn btn-primary btn-block" 
            onClick={onMarkAttendance}
          >
            <CheckCircle size={18} />
            Mark Attendance
          </button>
          <button 
            className="btn btn-secondary btn-block" 
            onClick={onViewHistory}
          >
            <Calendar size={18} />
            View History
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subjects;
