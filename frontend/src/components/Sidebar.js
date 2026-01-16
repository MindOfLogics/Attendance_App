import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar,
  CalendarCheck, 
  User, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/daily', icon: CalendarCheck, label: 'Daily Attendance' },
    { path: '/subjects', icon: BookOpen, label: 'Subjects' },
    { path: '/timetable', icon: Calendar, label: 'Timetable' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">📚</div>
            <span className="logo-text">Attendance</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => window.innerWidth < 768 && setIsOpen(false)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-item logout-btn" onClick={logout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
