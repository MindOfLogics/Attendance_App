import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar({ toggleSidebar }) {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h2 className="navbar-title">Attendance Tracker</h2>
      </div>
      
      <div className="navbar-right">
        <button className="icon-btn">
          <Bell size={20} />
        </button>
        <div className="user-info">
          <div className="user-avatar">
            <User size={20} />
          </div>
          <span className="user-name">{user?.name}</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
