import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    minAttendancePercentage: 75,
    attendanceCriteria: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.minAttendancePercentage
      );
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <h1>Create Account</h1>
        <p>Start tracking your attendance today</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label>Minimum Attendance Percentage Required (%)</label>
            <input
              type="number"
              name="minAttendancePercentage"
              value={formData.minAttendancePercentage}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
            <small style={{color: 'var(--gray-500)', fontSize: '0.85rem'}}>
              Set your target attendance percentage (e.g., 75%)
            </small>
          </div>

          <div className="form-group">
            <label>Attendance Percentage Criteria (Optional)</label>
            <input
              type="text"
              name="attendanceCriteria"
              value={formData.attendanceCriteria}
              onChange={handleChange}
              placeholder="e.g., 75% for internal exams, 80% for semester"
            />
            <small style={{color: 'var(--gray-500)', fontSize: '0.85rem'}}>
              Add any specific attendance requirements or criteria
            </small>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
