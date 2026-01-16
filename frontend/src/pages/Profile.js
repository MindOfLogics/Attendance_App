import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Mail, Target, Save, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

function Profile() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    minAttendancePercentage: user?.minAttendancePercentage || 75,
    attendanceCriteria: user?.attendanceCriteria || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        minAttendancePercentage: formData.minAttendancePercentage,
        attendanceCriteria: formData.attendanceCriteria
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      const { data } = await axios.put('/api/auth/profile', updateData);
      updateUser(data);
      toast.success('Profile updated successfully');
      
      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>Profile Settings</h1>
        <p>Manage your account information and preferences</p>
      </div>

      <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-avatar">
          <User size={48} />
        </div>
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        
        <button 
          className="btn btn-primary btn-block"
          onClick={() => setIsEditing(true)}
          style={{ marginTop: '1rem' }}
        >
          <Edit2 size={18} />
          Edit Profile
        </button>
        
        <div className="profile-stats" style={{ marginTop: '1.5rem' }}>
          <div className="profile-stat">
            <Target size={20} />
            <div>
              <span className="stat-value">{user?.minAttendancePercentage}%</span>
              <span className="stat-label">Target Attendance</span>
            </div>
          </div>
          {user?.attendanceCriteria && (
            <div className="profile-criteria">
              <p className="criteria-label">Criteria:</p>
              <p className="criteria-text">{user.attendanceCriteria}</p>
            </div>
          )}
        </div>
      </div>

      <div className="profile-main">
        {!isEditing ? (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>Profile Information</h3>
              <button 
                className="btn btn-secondary"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 size={18} />
                Edit
              </button>
            </div>
            
            <div className="profile-view-field">
              <label>Full Name</label>
              <p>{user?.name}</p>
            </div>

            <div className="profile-view-field">
              <label>Email Address</label>
              <p>{user?.email}</p>
            </div>

            <div className="profile-view-field">
              <label>Target Attendance Percentage</label>
              <p>{user?.minAttendancePercentage}%</p>
            </div>

            {user?.attendanceCriteria && (
              <div className="profile-view-field">
                <label>Attendance Criteria</label>
                <p>{user.attendanceCriteria}</p>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="card">
              <h3>Personal Information</h3>
              
              <div className="form-group">
                <label>
                  <User size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="card">
              <h3>Attendance Preferences</h3>
              
              <div className="form-group">
                <label>
                  <Target size={16} />
                  Minimum Attendance Percentage (%)
                </label>
                <input
                  type="number"
                  name="minAttendancePercentage"
                  value={formData.minAttendancePercentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  required
                />
                <small>
                  This is your target attendance percentage. The app will calculate how many classes you need to attend or can miss based on this value.
                </small>
              </div>

              <div className="form-group">
                <label>Attendance Percentage Criteria</label>
                <input
                  type="text"
                  name="attendanceCriteria"
                  value={formData.attendanceCriteria}
                  onChange={handleChange}
                  placeholder="e.g., 75% for internal exams, 80% for semester"
                />
                <small>
                  Add any specific attendance requirements or criteria
                </small>
              </div>

              <div className="attendance-info">
                <div className="info-card">
                  <h4>What is this?</h4>
                  <p>
                    Set your minimum required attendance percentage (usually 75% for most institutions). 
                    The app will help you track if you're meeting this goal and provide smart suggestions.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Change Password</h3>
              
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                type="button" 
                className="btn btn-secondary btn-large" 
                onClick={() => setIsEditing(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary btn-large" 
                disabled={loading}
                style={{ flex: 1 }}
              >
                <Save size={20} />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
      </div>
    </div>
  );
}

export default Profile;
