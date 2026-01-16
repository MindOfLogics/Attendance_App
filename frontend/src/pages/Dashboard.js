import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  TrendingUp, 
  BookOpen, 
  CheckCircle, 
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/dashboard/stats');
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  const overallPercentage = stats?.overall?.percentage || 0;
  const targetPercentage = stats?.overall?.targetPercentage || 75;
  const isOnTrack = overallPercentage >= targetPercentage;

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.name}! Here's your attendance overview</p>
      </div>


      {/* Subjects Overview */}
      <div className="card">
        <div className="card-header">
          <h2>Subjects Overview</h2>
          <p>Smart suggestions to help you reach your attendance goal</p>
        </div>

        {stats?.subjects?.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h3>No subjects added yet</h3>
            <p>Add your subjects to start tracking attendance</p>
          </div>
        ) : (
          <div className="subjects-list">
            {stats?.subjects?.map((subject) => (
              <SubjectCard 
                key={subject.id} 
                subject={subject} 
                targetPercentage={targetPercentage}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

function SubjectCard({ subject, targetPercentage }) {
  const isAtRisk = subject.percentage < targetPercentage;
  const classesNeeded = subject.classesToAttend;
  const classesCanMiss = subject.classesCanMiss;

  return (
    <div className="subject-card">
      <div className="subject-header">
        <div className="subject-info">
          <div 
            className="subject-color" 
            style={{ backgroundColor: subject.color }}
          />
          <div>
            <h3>{subject.name}</h3>
            {subject.code && <p className="subject-code">{subject.code}</p>}
          </div>
        </div>
        <div className="subject-percentage">
          <span 
            className={`percentage-badge ${isAtRisk ? 'danger' : 'success'}`}
          >
            {subject.percentage}%
          </span>
        </div>
      </div>

      <div className="subject-stats">
        <div className="stat-item">
          <CheckCircle size={16} />
          <span>{subject.attendedClasses} attended</span>
        </div>
        <div className="stat-item">
          <XCircle size={16} />
          <span>{subject.totalClasses - subject.attendedClasses} missed</span>
        </div>
        <div className="stat-item">
          <BookOpen size={16} />
          <span>{subject.totalClasses} total</span>
        </div>
      </div>

      <div className="subject-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${Math.min(subject.percentage, 100)}%`,
              backgroundColor: isAtRisk ? 'var(--danger)' : 'var(--success)'
            }}
          />
        </div>
        <span className="progress-label">
          {isAtRisk ? 'Below Target' : 'On Track'}
        </span>
      </div>

      {/* Smart Suggestions */}
      <div className={`subject-suggestions ${isAtRisk ? 'warning' : 'success'}`}>
        {isAtRisk ? (
          <>
            <AlertTriangle size={18} />
            <div>
              <strong>Action needed:</strong> Attend the next{' '}
              <strong>{classesNeeded}</strong> class{classesNeeded !== 1 ? 'es' : ''} 
              {' '}to reach {targetPercentage}%
            </div>
          </>
        ) : (
          <>
            <CheckCircle size={18} />
            <div>
              <strong>You're doing great!</strong> You can miss up to{' '}
              <strong>{classesCanMiss}</strong> class{classesCanMiss !== 1 ? 'es' : ''} 
              {' '}and still maintain {targetPercentage}%
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
