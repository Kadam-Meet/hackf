import React from 'react';
import './RoleSelection.css'; // Import component-specific CSS
import { FaUserShield, FaGraduationCap, FaUniversity, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleClick = (role) => {
    if (role === 'Admin') {
      navigate('/admin/login');
    } else if (role === 'University') {
      navigate('/university/login');
    } else if (role === 'Student') {
      navigate('/student/login');
    } else if (role === 'Company') {
      navigate('/company/login');
    } else {
      // Handle other roles or show a message for Company
      alert(`You selected ${role}. Functionality for this role is not yet implemented.`);
    }
  };

  return (
    <div className="role-selection-container">
      <h1>Select Your Role</h1>
      <div className="role-buttons">
        <div
          className="role-card"
          onClick={() => handleRoleClick('Admin')}
          tabIndex="0" // Make the div focusable
          role="button" // Indicate it's a button for screen readers
          onKeyPress={(e) => { // Enable keyboard interaction
            if (e.key === 'Enter' || e.key === ' ') {
              handleRoleClick('Admin');
            }
          }}
        >
          <FaUserShield className="role-card-icon" />
          <h2>Admin</h2>
          <p>Manage users, content, and system settings.</p>
        </div>
        <div className="role-card" onClick={() => handleRoleClick('Student')}>
          <FaGraduationCap className="role-card-icon" />
          <h2>Student</h2>
          <p>Access courses, assignments, and academic resources.</p>
        </div>
        <div
          className="role-card"
          onClick={() => handleRoleClick('University')}
          tabIndex="0"
          role="button"
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleRoleClick('University');
            }
          }}
        >
          <FaUniversity className="role-card-icon" />
          <h2>University</h2>
          <p>Oversee departments, faculty, and student admissions.</p>
        </div>
        <div
          className="role-card"
          onClick={() => handleRoleClick('Company')}
          tabIndex="0"
          role="button"
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleRoleClick('Company');
            }
          }}
        >
          <FaBuilding className="role-card-icon" />
          <h2>Company</h2>
          <p>Explore partnership opportunities and recruit talent.</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
