import React, { useState, createContext, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import RoleSelection from './RoleSelection';
import AdminLogin from './AdminLogin';
import AdminRegister from './AdminRegister';
import AdminDashboard from './AdminDashboard';
import UniversityLogin from './UniversityLogin'; // Will create these soon
import UniversityRegister from './UniversityRegister';
import UniversityDashboard from './UniversityDashboard';
import StudentLogin from './StudentLogin'; // Import new Student components
import StudentRegister from './StudentRegister';
import StudentDashboard from './StudentDashboard';
import CompanyLogin from './CompanyLogin'; // Import new Company components
import CompanyRegister from './CompanyRegister';
import CompanyDashboard from './CompanyDashboard';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const login = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated || (requiredRole && userRole !== requiredRole)) {
      // Redirect to specific login based on required role, or a generic one
      if (requiredRole === 'admin') {
        navigate('/admin/login', { replace: true });
      } else if (requiredRole === 'university') {
        navigate('/university/login', { replace: true });
      } else if (requiredRole === 'student') {
        navigate('/student/login', { replace: true });
      } else if (requiredRole === 'company') { // Add company redirection
        navigate('/company/login', { replace: true });
      } else {
        // Default redirect if no specific role login is defined
        navigate('/admin/login', { replace: true }); // Fallback to admin login
      }
    }
  }, [isAuthenticated, userRole, requiredRole, navigate]);

  return isAuthenticated && (!requiredRole || userRole === requiredRole) ? children : null;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<RoleSelection />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute requiredRole="admin">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            {/* University Routes */}
            <Route path="/university/login" element={<UniversityLogin />} />
            <Route path="/university/register" element={<UniversityRegister />} />
            <Route
              path="/university/dashboard"
              element={
                <PrivateRoute requiredRole="university">
                  <UniversityDashboard />
                </PrivateRoute>
              }
            />
            {/* Student Routes */}
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/register" element={<StudentRegister />} />
            <Route
              path="/student/dashboard"
              element={
                <PrivateRoute requiredRole="student">
                  <StudentDashboard />
                </PrivateRoute>
              }
            />
            {/* Company Routes */}
            <Route path="/company/login" element={<CompanyLogin />} />
            <Route path="/company/register" element={<CompanyRegister />} />
            <Route
              path="/company/dashboard"
              element={
                <PrivateRoute requiredRole="company">
                  <CompanyDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
