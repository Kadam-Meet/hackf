import React, { useState } from 'react';
import './Admin.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminRegister1 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ✅ Use env variable for API URL
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // ✅ Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!adminCode) newErrors.adminCode = 'Admin Code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch(`${API_URL}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'admin', name, email, password, adminCode })
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setMessage('OTP sent to your email. Please verify it.');
        setShowOtp(true); // ✅ show OTP input
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch (error) {
      setMessage(error.message || 'Something went wrong. Try again.');
    }
  };

  // ✅ OTP Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setErrors({ otp: 'OTP is required' });
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/user/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setMessage('Admin registration complete!');
        setShowOtp(false);
        navigate('/admin/login');
      } else {
        setMessage(data.error || 'OTP verification failed');
      }
    } catch (error) {
      setMessage(error.message || 'Something went wrong. Try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>Admin Registration</h2>

        {/* Registration Form */}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(({ name, ...rest }) => rest);
              }}
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
            />
            {errors.name && <span id="name-error" className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(({ email, ...rest }) => rest);
              }}
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(({ password, ...rest }) => rest);
                }}
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

          <div className="form-group">
            <label htmlFor="adminCode">Admin Code:</label>
            <input
              type="text"
              id="adminCode"
              value={adminCode}
              onChange={(e) => {
                setAdminCode(e.target.value);
                if (errors.adminCode) setErrors(({ adminCode, ...rest }) => rest);
              }}
              aria-invalid={!!errors.adminCode}
              aria-describedby="adminCode-error"
            />
            {errors.adminCode && <span id="adminCode-error" className="error-message">{errors.adminCode}</span>}
          </div>

          <button type="submit" className="admin-button">Register</button>
        </form>

        {/* OTP Form (shown after register success) */}
        {showOtp && (
          <form onSubmit={handleVerifyOtp}>
            <div className="form-group">
              <label htmlFor="otp">Enter OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  if (errors.otp) setErrors(({ otp, ...rest }) => rest);
                }}
                aria-invalid={!!errors.otp}
                aria-describedby="otp-error"
              />
              {errors.otp && <span id="otp-error" className="error-message">{errors.otp}</span>}
              <button type="submit" className="admin-button otp-verify-button">Verify OTP</button>
            </div>
          </form>
        )}

        {/* Status Message */}
        <div className="status-message">{message}</div>

        <p className="admin-switch-link">
          Already have an account? <Link to="/admin/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister1;
