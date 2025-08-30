import React, { useState, createContext, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// --- Mock Auth Context ---
// In a real app, this would be in its own file (e.g., AuthContext.js)
// We include it here to make the component self-contained and fix the import error.
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// A dummy AuthProvider to wrap your app in, to provide the 'login' function
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (role) => {
    // This is where you would handle setting user data, tokens, etc.
    console.log(`User logged in with role: ${role}`);
    setUser({ role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// --- SVG Icons to replace react-icons ---
const FaEye = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 144 144 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
  </svg>
);

const FaEyeSlash = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-144.92 35.1l-46.63-35.91a16 16 0 0 0-22.46-1.85L39.58 84.46a16 16 0 0 0-1.85 22.46l588.36 454.73a16 16 0 0 0 22.46 1.85l54.33-41.84a16 16 0 0 0 1.85-22.46zM121.34 121.34L155 148.87A144.13 144.13 0 0 1 176 160a144 144 0 0 1 211.36 122.64l45.42 35.09A331.25 331.25 0 0 0 494.1 241.4C440.29 135.59 332.93 64 209.82 64a308.15 308.15 0 0 0-88.48 16.25z"></path>
  </svg>
);

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // This will now work if the component is wrapped in AuthProvider
  const { login } = useAuth() || { login: () => console.log("Login function not available") };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        login('admin');
        navigate('/admin/dashboard');
      } else {
        setErrors({ general: data.error || 'Login failed. Please try again.' });
      }
    } catch (error) {
      console.error('Login fetch error:', error);
      setErrors({ general: 'Could not connect to the server. Please try again later.' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // --- CSS Styles to replace Admin.css ---
  const styles = `
    .admin-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f0f2f5;
      font-family: sans-serif;
    }
    .admin-card {
      background: #fff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }
    .admin-card h2 {
      margin-bottom: 1.5rem;
      text-align: center;
      color: #333;
    }
    .form-group {
      margin-bottom: 1.25rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: bold;
    }
    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box; /* Important for padding */
    }
    .password-input-container {
      position: relative;
    }
    .password-toggle-icon {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      cursor: pointer;
      color: #777;
    }
    .error-message {
      color: #d93025;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      display: block; /* To show message */
    }
    .admin-button {
      width: 100%;
      padding: 0.85rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .admin-button:hover {
      background-color: #0056b3;
    }
    .admin-switch-link {
      margin-top: 1.5rem;
      text-align: center;
      font-size: 0.9rem;
    }
    .admin-switch-link a {
      color: #007bff;
      text-decoration: none;
    }
    .admin-switch-link a:hover {
      text-decoration: underline;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="admin-container">
        <div className="admin-card">
          <h2>Admin Login</h2>
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
                  setErrors({});
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
                    setErrors({});
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
            {errors.general && <div className="error-message">{errors.general}</div>}
            <button type="submit" className="admin-button">Login</button>
          </form>
          <p className="admin-switch-link">
            Don't have an account? <Link to="/admin/register">Register here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;