import React from 'react';
import './Admin.css'; // Reusing admin styles for now
import { useAuth } from './App';

const StudentDashboard = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>Student Dashboard</h2>
        <p>Welcome to the Student Dashboard!</p>
        <button onClick={handleLogout} className="admin-button">Logout</button>
      </div>
    </div>
  );
};

export default StudentDashboard;
