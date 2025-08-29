import React from 'react';
import './Admin.css';
import { useAuth } from './App';

const AdminDashboard = () => {
  const { logout } = useAuth(); // Use generic logout function

  const handleLogout = () => {
    logout();
    // Optionally redirect to login page after logout, PrivateRoute will handle this automatically
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>Admin Dashboard</h2>
        <p>Welcome to the Admin Dashboard!</p>
        <button onClick={handleLogout} className="admin-button">Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
