import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, X, AlertCircle, Calendar, Clock } from 'lucide-react';
import './ClassChanges.css';

const CHANGE_TYPES = [
  { value: 'postponed', label: 'Postponed', color: '#F59E0B' },
  { value: 'cancelled', label: 'Cancelled', color: '#EF4444' },
  { value: 'rescheduled', label: 'Rescheduled', color: '#3B82F6' },
  { value: 'extra', label: 'Extra Class', color: '#10B981' }
];

function ClassChanges() {
  const [classChanges, setClassChanges] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    subjectId: '',
    originalDate: '',
    originalTime: '',
    changeType: 'postponed',
    newDate: '',
    newTime: '',
    reason: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [changesRes, subjectsRes] = await Promise.all([
        axios.get('/api/class-changes'),
        axios.get('/api/subjects')
      ]);
      setClassChanges(changesRes.data);
      setSubjects(subjectsRes.data);
    } catch (error) {
      toast.error('Failed to load class changes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/class-changes', formData);
      toast.success('Class change added successfully');
      fetchData();
      closeModal();
    } catch (error) {
      toast.error('Failed to add class change');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this class change?')) return;
    
    try {
      await axios.delete(`/api/class-changes/${id}`);
      setClassChanges(classChanges.filter(c => c._id !== id));
      toast.success('Class change deleted successfully');
    } catch (error) {
      toast.error('Failed to delete class change');
    }
  };

  const openModal = () => {
    setFormData({
      subjectId: '',
      originalDate: new Date().toISOString().split('T')[0],
      originalTime: '',
      changeType: 'postponed',
      newDate: '',
      newTime: '',
      reason: ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  // Group changes by upcoming and past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingChanges = classChanges.filter(c => new Date(c.originalDate) >= today);
  const pastChanges = classChanges.filter(c => new Date(c.originalDate) < today);

  return (
    <div className="class-changes-page">
      <div className="page-header">
        <div>
          <h1>Class Changes</h1>
          <p>Track postponements, cancellations, and schedule changes</p>
        </div>
        <button className="btn btn-primary" onClick={openModal}>
          <Plus size={20} />
          Add Change
        </button>
      </div>

      {classChanges.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">
              <AlertCircle size={64} />
            </div>
            <h3>No class changes recorded</h3>
            <p>Add class postponements, cancellations, or schedule changes</p>
            <button className="btn btn-primary" onClick={openModal}>
              <Plus size={20} />
              Add Class Change
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Upcoming Changes */}
          {upcomingChanges.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h2>Upcoming Changes</h2>
                <span className="badge">{upcomingChanges.length}</span>
              </div>
              <div className="changes-list">
                {upcomingChanges.map(change => (
                  <ClassChangeCard
                    key={change._id}
                    change={change}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Past Changes */}
          {pastChanges.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h2>Past Changes</h2>
                <span className="badge">{pastChanges.length}</span>
              </div>
              <div className="changes-list">
                {pastChanges.map(change => (
                  <ClassChangeCard
                    key={change._id}
                    change={change}
                    onDelete={handleDelete}
                    isPast
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Add Class Change Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Class Change</h2>
              <button className="modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Subject *</label>
                <select
                  value={formData.subjectId}
                  onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
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

              <div className="form-row">
                <div className="form-group">
                  <label>Original Date *</label>
                  <input
                    type="date"
                    value={formData.originalDate}
                    onChange={(e) => setFormData({ ...formData, originalDate: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Original Time *</label>
                  <input
                    type="time"
                    value={formData.originalTime}
                    onChange={(e) => setFormData({ ...formData, originalTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Change Type *</label>
                <div className="change-types-grid">
                  {CHANGE_TYPES.map(type => (
                    <button
                      key={type.value}
                      type="button"
                      className={`change-type-btn ${formData.changeType === type.value ? 'active' : ''}`}
                      style={{
                        borderColor: formData.changeType === type.value ? type.color : 'var(--gray-300)',
                        backgroundColor: formData.changeType === type.value ? `${type.color}15` : 'white'
                      }}
                      onClick={() => setFormData({ ...formData, changeType: type.value })}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {(formData.changeType === 'postponed' || formData.changeType === 'rescheduled' || formData.changeType === 'extra') && (
                <div className="form-row">
                  <div className="form-group">
                    <label>New Date</label>
                    <input
                      type="date"
                      value={formData.newDate}
                      onChange={(e) => setFormData({ ...formData, newDate: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>New Time</label>
                    <input
                      type="time"
                      value={formData.newTime}
                      onChange={(e) => setFormData({ ...formData, newTime: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Reason (Optional)</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Add a note about this change..."
                  rows="3"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ClassChangeCard({ change, onDelete, isPast = false }) {
  const changeType = CHANGE_TYPES.find(t => t.value === change.changeType);
  
  return (
    <div className={`change-card ${isPast ? 'past' : ''}`}>
      <div
        className="change-color-indicator"
        style={{ backgroundColor: changeType?.color || '#4F46E5' }}
      />
      
      <div className="change-content">
        <div className="change-header">
          <div>
            <h3>{change.subjectId?.name || 'Unknown Subject'}</h3>
            {change.subjectId?.code && (
              <span className="change-code">{change.subjectId.code}</span>
            )}
          </div>
          <div className="change-actions">
            <span
              className="change-badge"
              style={{ backgroundColor: changeType?.color || '#4F46E5' }}
            >
              {changeType?.label || change.changeType}
            </span>
            <button className="btn-icon" onClick={() => onDelete(change._id)}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="change-details">
          <div className="change-detail-item">
            <Calendar size={16} />
            <div>
              <span className="detail-label">Original:</span>
              <span className="detail-value">
                {new Date(change.originalDate).toLocaleDateString()} at {change.originalTime}
              </span>
            </div>
          </div>

          {change.newDate && (
            <div className="change-detail-item">
              <Clock size={16} />
              <div>
                <span className="detail-label">Rescheduled to:</span>
                <span className="detail-value">
                  {new Date(change.newDate).toLocaleDateString()} 
                  {change.newTime && ` at ${change.newTime}`}
                </span>
              </div>
            </div>
          )}
        </div>

        {change.reason && (
          <div className="change-reason">
            <AlertCircle size={14} />
            <span>{change.reason}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassChanges;
