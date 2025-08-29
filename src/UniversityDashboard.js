import React from 'react';
import './Admin.css'; // Reusing admin styles for now, can be separated later

const UniversityDashboard = () => {
  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>University Dashboard</h2>
        <p>Welcome to the University Dashboard!</p>
        {/* University specific content will go here */}
      </div>
    </div>
  );
};

export default UniversityDashboard;
