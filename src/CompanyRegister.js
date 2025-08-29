import React, { useState } from 'react';
import './Admin.css'; // Reusing admin styles for consistency
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CompanyRegister = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyLicense, setCompanyLicense] = useState(null); // Specific for Company
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = (step) => {
    const newErrors = {};
    // Validation for initial registration fields
    if (step === 'registration' || step === 'sendOtp') {
      if (!companyName) newErrors.companyName = 'Company Name is required';
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!companyLicense) newErrors.companyLicense = 'Company License is required';
    }

    // Validation for OTP
    if (step === 'verifyOtp') {
      if (!otp) newErrors.otp = 'OTP is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (validateForm('sendOtp')) {
      console.log(`Sending OTP to ${email} (Company)`);
      alert('OTP sent to your company email (simulated).');
      setOtpSent(true);
      // API call to send OTP
    }
  };

  const handleVerifyOtp = async () => {
    if (validateForm('verifyOtp')) {
      if (otp === '456789') { // Hardcoded for demo, replace with backend verification
        setOtpVerified(true);
        alert('OTP verified successfully!');
      } else {
        setErrors(prevErrors => ({ ...prevErrors, otp: 'Invalid OTP' }));
        alert('Invalid OTP. Please try again.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpVerified && validateForm('registration')) {
      console.log({
        companyName,
        email,
        password,
        companyLicense,
      });
      alert('Company Registration successful!');
      navigate('/company/login');
    } else if (!otpVerified) {
      alert('Please verify OTP first.');
    } else {
      alert('Please correct the errors in the form.');
    }
  };

  const handleFileChange = (e) => {
    setCompanyLicense(e.target.files[0]);
    if (errors.companyLicense) {
      setErrors(prevErrors => { delete prevErrors.companyLicense; return { ...prevErrors }; });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>Company Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                if (errors.companyName) setErrors(prevErrors => { delete prevErrors.companyName; return { ...prevErrors }; });
              }}
              aria-invalid={!!errors.companyName}
              aria-describedby="companyName-error"
            />
            {errors.companyName && <span id="companyName-error" className="error-message">{errors.companyName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Company Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prevErrors => { delete prevErrors.email; return { ...prevErrors }; });
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
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prevErrors => { delete prevErrors.password; return { ...prevErrors }; });
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors(prevErrors => { delete prevErrors.confirmPassword; return { ...prevErrors }; });
                }}
                required
                aria-invalid={!!errors.confirmPassword}
                aria-describedby="confirmPassword-error"
              />
              <span
                className="password-toggle-icon"
                onClick={toggleConfirmPasswordVisibility}
                role="button"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && <span id="confirmPassword-error" className="error-message">{errors.confirmPassword}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="companyLicense">Company License (PDF):</label>
            <input
              type="file"
              id="companyLicense"
              name="companyLicense"
              accept=".pdf"
              onChange={handleFileChange}
              required
              aria-invalid={!!errors.companyLicense}
              aria-describedby="companyLicense-error"
            />
            {errors.companyLicense && <span id="companyLicense-error" className="error-message">{errors.companyLicense}</span>}
          </div>

          {!otpSent && (
            <button type="button" onClick={handleSendOtp} className="admin-button">Send OTP</button>
          )}

          {otpSent && !otpVerified && (
            <div className="form-group otp-group">
              <label htmlFor="otp">Enter OTP:</label>
              <div className="otp-input-container">
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    if (errors.otp) setErrors(prevErrors => { delete prevErrors.otp; return { ...prevErrors }; });
                  }}
                  required
                  aria-invalid={!!errors.otp}
                  aria-describedby="otp-error"
                />
                <button type="button" onClick={handleVerifyOtp} className="admin-button otp-verify-button">Verify OTP</button>
              </div>
              {errors.otp && <span id="otp-error" className="error-message">{errors.otp}</span>}
            </div>
          )}

          {otpVerified && (
            <button type="submit" className="admin-button">Register</button>
          )}
        </form>
        <p className="admin-switch-link">
          Already have an account? <Link to="/company/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default CompanyRegister;
