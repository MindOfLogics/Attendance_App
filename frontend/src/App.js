import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DailyAttendance from './pages/DailyAttendance';
import Subjects from './pages/Subjects';
import Timetable from './pages/Timetable';
import Profile from './pages/Profile';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/daily" element={<PrivateRoute><DailyAttendance /></PrivateRoute>} />
            <Route path="/subjects" element={<PrivateRoute><Subjects /></PrivateRoute>} />
            <Route path="/timetable" element={<PrivateRoute><Timetable /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
