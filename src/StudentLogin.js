import React, { useState } from 'react';
import './Admin.css'; // Reusing admin styles for consistency
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './App';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate Student login
      if (email === 'student@example.com' && password === 'password') {
        login('student');
        navigate('/student/dashboard');
      } else {
        setErrors({ general: 'Invalid email or password' });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>Student Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prevErrors => { delete prevErrors.email; return { ...prevErrors }; });
                if (errors.general) setErrors(prevErrors => { delete prevErrors.general; return { ...prevErrors }; });
              }}
              required
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prevErrors => { delete prevErrors.password; return { ...prevErrors }; });
                  if (errors.general) setErrors(prevErrors => { delete prevErrors.general; return { ...prevErrors }; });
                }}
                required
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
                role="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <span id="password-error" className="error-message">{errors.password}</span>}
          </div>
          {errors.general && <span className="error-message">{errors.general}</span>}
          <button type="submit" className="admin-button">Login</button>
        </form>
        <p className="admin-switch-link">
          Don't have an account? <Link to="/student/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
