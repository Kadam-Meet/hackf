import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AdminLogin'; // Assuming useAuth is exported from AdminLogin.js

const AdminDashboard = () => {
  const navigate = useNavigate();
  // If the auth context is not available, provide a fallback to prevent crashes.
  const { logout } = useAuth() || { logout: () => navigate('/admin/login') };

  // State for the form inputs
  const [institutionName, setInstitutionName] = useState('');
  const [companyName, setCompanyName] = useState('');

  // State to hold the lists of items (using mock data for now)
  const [institutions, setInstitutions] = useState([
      { id: 1, name: 'Gujarat University' },
      { id: 2, name: 'Maharaja Sayajirao University' },
  ]);
  const [companies, setCompanies] = useState([
      { id: 1, name: 'Tech Solutions Inc.' },
      { id: 2, name: 'Innovate Hub' },
  ]);

  // State for user feedback messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Helper function to show a success message for 3 seconds
  const showSuccessMessage = (message) => {
      setSuccess(message);
      setTimeout(() => setSuccess(''), 3000);
  }

  // Form submission handler for adding a new institution
  const handleAddInstitution = (e) => {
    e.preventDefault();
    if (!institutionName.trim()) {
        setError('Institution name cannot be empty.');
        return;
    }
    setInstitutions([...institutions, { id: Date.now(), name: institutionName.trim() }]);
    setInstitutionName('');
    showSuccessMessage('Institution added successfully!');
    setError('');
  };

  // Form submission handler for adding a new company
  const handleAddCompany = (e) => {
    e.preventDefault();
    if (!companyName.trim()) {
        setError('Company name cannot be empty.');
        return;
    }
    setCompanies([...companies, { id: Date.now(), name: companyName.trim() }]);
    setCompanyName('');
    showSuccessMessage('Company added successfully!');
    setError('');
  };

  // --- Inline CSS Styles for the component ---
  const styles = `
    .admin-dashboard-container { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f0f2f5; min-height: 100vh; padding: 2rem; box-sizing: border-box; }
    .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #ddd; }
    .dashboard-header h1 { color: #333; font-size: 2rem; margin: 0; }
    .logout-button { background-color: #dc3545; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 5px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: background-color 0.2s; }
    .logout-button:hover { background-color: #c82333; }
    .dashboard-content { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    @media (max-width: 900px) { .dashboard-content { grid-template-columns: 1fr; } }
    .content-card { background: #fff; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
    .content-card h2 { margin-top: 0; margin-bottom: 1.5rem; color: #333; border-bottom: 2px solid #007bff; padding-bottom: 0.5rem;}
    .add-form { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
    .form-input { flex-grow: 1; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; }
    .add-button { background-color: #007bff; color: white; border: none; padding: 0.75rem 1.25rem; border-radius: 4px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: background-color 0.2s; }
    .add-button:hover { background-color: #0056b3; }
    .item-list { list-style: none; padding: 0; margin: 0; max-height: 300px; overflow-y: auto; }
    .item-list li { padding: 0.75rem; border-bottom: 1px solid #eee; color: #555; font-size: 1rem; }
    .item-list li:last-child { border-bottom: none; }
    .message { text-align: center; margin: 0 auto 1rem auto; padding: 0.75rem; border-radius: 4px; max-width: 800px; }
    .error-message-dash { color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb;}
    .success-message-dash { color: #155724; background-color: #d4edda; border: 1px solid #c3e6cb;}
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="admin-dashboard-container">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </header>

        {error && <p className="message error-message-dash">{error}</p>}
        {success && <p className="message success-message-dash">{success}</p>}

        <main className="dashboard-content">
          <div className="content-card">
            <h2>Manage Institutions</h2>
            <form onSubmit={handleAddInstitution} className="add-form">
              <input type="text" className="form-input" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} placeholder="Enter institution name" />
              <button type="submit" className="add-button">Add</button>
            </form>
            <ul className="item-list">
              {institutions.map(inst => <li key={inst.id}>{inst.name}</li>)}
            </ul>
          </div>

          <div className="content-card">
            <h2>Manage Companies</h2>
            <form onSubmit={handleAddCompany} className="add-form">
              <input type="text" className="form-input" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter company name" />
              <button type="submit" className="add-button">Add</button>
            </form>
            <ul className="item-list">
              {companies.map(comp => <li key={comp.id}>{comp.name}</li>)}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;

