import React, { useState, createContext, useContext, useEffect } from 'react';

// --- 1. Authentication Context ---
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        console.log("User logged in:", userData);
        setUser(userData);
    };

    const logout = () => {
        console.log('User logged out');
        setUser(null);
    };

    const authValue = { user, login, logout };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};


// --- 2. SVG Icons ---
const FaEye = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 144 144 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>
);
const FaEyeSlash = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-144.92 35.1l-46.63-35.91a16 16 0 0 0-22.46-1.85L39.58 84.46a16 16 0 0 0-1.85 22.46l588.36 454.73a16 16 0 0 0 22.46 1.85l54.33-41.84a16 16 0 0 0 1.85-22.46zM121.34 121.34L155 148.87A144.13 144.13 0 0 1 176 160a144 144 0 0 1 211.36 122.64l45.42 35.09A331.25 331.25 0 0 0 494.1 241.4C440.29 135.59 332.93 64 209.82 64a308.15 308.15 0 0 0-88.48 16.25z"></path></svg>
);

// --- 3. Role Selection Component ---
const RoleSelection = ({ setView }) => {
    const styles = `
        .role-selection-container { display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; background-color: #f0f2f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; padding: 1rem; }
        .role-selection-container h1 { margin-bottom: 2rem; color: #333; font-size: 2rem; text-align: center; }
        .role-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; width: 100%; max-width: 900px; }
        .role-card { background: #fff; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); text-align: center; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .role-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); }
        .role-card h2 { margin-top: 0; margin-bottom: 0.5rem; color: #007bff; }
        .role-card p { color: #555; font-size: 0.9rem; }
    `;

    return (
        <>
            <style>{styles}</style>
            <div className="role-selection-container">
                <h1>Select Your Role</h1>
                <div className="role-grid">
                    <div className="role-card" onClick={() => setView('studentLogin')}>
                        <h2>Student</h2>
                        <p>Access your profile and opportunities.</p>
                    </div>
                    <div className="role-card" onClick={() => setView('universityLogin')}>
                        <h2>University</h2>
                        <p>Manage student data and institution profile.</p>
                    </div>
                    <div className="role-card" onClick={() => setView('companyLogin')}>
                        <h2>Company</h2>
                        <p>Post jobs and connect with talent.</p>
                    </div>
                    <div className="role-card" onClick={() => setView('adminLogin')}>
                        <h2>Admin</h2>
                        <p>Oversee the platform and manage users.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

// --- 4. Admin Dashboard ---
const AdminDashboard = () => {
    const { logout } = useAuth();
    const [view, setView] = useState('home'); // home, universities, companies, students
    const [modal, setModal] = useState({ isOpen: false, type: null, data: null });

    // --- DUMMY DATA ---
    const [universities, setUniversities] = useState([
        { _id: 'uni1', name: 'Maharaja Sayajirao University', email: 'contact@msu.ac.in', status: 'Verified' },
        { _id: 'uni2', name: 'Gujarat University', email: 'info@gujaratuniversity.ac.in', status: 'Verified' },
        { _id: 'uni3', name: 'Nirma University', email: 'admissions@nirmauni.ac.in', status: 'Suspended' },
    ]);
    const [companies, setCompanies] = useState([
        { _id: 'com1', name: 'Tech Solutions Inc.', email: 'hr@techsolutions.com', status: 'Verified' },
        { _id: 'com2', name: 'Innovate Hub', email: 'careers@innovatehub.com', status: 'Pending' },
        { _id: 'com3', name: 'Data Insights LLC', email: 'jobs@datainsights.com', status: 'Verified' },
    ]);
    const [students, setStudents] = useState([
        { _id: 'stu1', name: 'Aarav Patel', email: 'aarav.p@msu.ac.in', university: { name: 'Maharaja Sayajirao University' }, status: 'Verified' },
        { _id: 'stu2', name: 'Priya Sharma', email: 'priya.s@gujaratuniversity.ac.in', university: { name: 'Gujarat University' }, status: 'Verified' },
        { _id: 'stu3', name: 'Rohan Mehta', email: 'rohan.m@nirmauni.ac.in', university: { name: 'Nirma University' }, status: 'Verified' },
    ]);
    
    // --- Modal Handler ---
    const openModal = (type, data = null) => setModal({ isOpen: true, type, data });
    const closeModal = () => setModal({ isOpen: false, type: null, data: null });

    // --- Data Handlers ---
    const addUniversity = (name, email) => {
        const newUniversity = { _id: `uni${Date.now()}`, name, email, status: 'Verified' };
        setUniversities([...universities, newUniversity]);
        closeModal();
    };

    const addCompany = (name, email) => {
        const newCompany = { _id: `com${Date.now()}`, name, email, status: 'Pending' };
        setCompanies([...companies, newCompany]);
        closeModal();
    };
    
    const toggleSuspend = (id, type) => {
        if (type === 'university') {
            setUniversities(universities.map(u => u._id === id ? { ...u, status: u.status === 'Suspended' ? 'Verified' : 'Suspended' } : u));
        } else {
            setCompanies(companies.map(c => c._id === id ? { ...c, status: c.status === 'Suspended' ? 'Verified' : 'Suspended' } : c));
        }
        closeModal();
    };

    const approveCompany = (id) => {
        setCompanies(companies.map(c => c._id === id ? { ...c, status: 'Verified' } : c));
        closeModal();
    };


    // --- Sub-components for different views ---
    const DashboardHome = () => (
        <div>
            <h2>Dashboard Overview</h2>
            <div className="stats-container">
                <div className="stat-card"><h3>Total Universities</h3><p>{universities.length}</p></div>
                <div className="stat-card"><h3>Total Companies</h3><p>{companies.length}</p></div>
                <div className="stat-card"><h3>Total Students</h3><p>{students.length}</p></div>
            </div>
        </div>
    );

    const ManageUniversities = () => (
        <div>
            <h2>Manage Universities</h2>
            <button className="add-new-button" onClick={() => openModal('addUniversity')}>Add New University</button>
            <table className="data-table">
                <thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                    {universities.map(uni => (
                        <tr key={uni._id}>
                            <td>{uni.name}</td>
                            <td>{uni.email}</td>
                            <td><span className={`status-${uni.status.toLowerCase()}`}>{uni.status}</span></td>
                            <td><button className="action-button" onClick={() => openModal('suspend', { type: 'university', ...uni })}>{uni.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

     const ManageCompanies = () => (
        <div>
            <h2>Manage Companies</h2>
            <button className="add-new-button" onClick={() => openModal('addCompany')}>Add New Company</button>
            <table className="data-table">
                <thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                    {companies.map(comp => (
                        <tr key={comp._id}>
                            <td>{comp.name}</td>
                            <td>{comp.email}</td>
                            <td><span className={`status-${comp.status.toLowerCase()}`}>{comp.status}</span></td>
                            <td>
                                {comp.status === 'Pending' && <button className="action-button approve" onClick={() => openModal('approve', comp)}>Approve</button>}
                                <button className="action-button" onClick={() => openModal('suspend', { type: 'company', ...comp })}>{comp.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const ViewStudents = () => (
         <div>
            <h2>All Students</h2>
            <table className="data-table">
                <thead><tr><th>Name</th><th>Email</th><th>University</th><th>Verification</th></tr></thead>
                <tbody>
                    {students.map(stu => (
                        <tr key={stu._id}>
                            <td>{stu.name}</td>
                            <td>{stu.email}</td>
                            <td>{stu.university?.name || 'N/A'}</td>
                             <td><span className="status-verified">Verified</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // --- Main Dashboard Styles & Layout ---
    const styles = `
        .admin-dashboard { display: flex; min-height: 100vh; font-family: sans-serif; background: #f7f9fc; }
        .sidebar { width: 250px; background: #2c3e50; color: white; padding: 1.5rem; display: flex; flex-direction: column; }
        .sidebar h2 { margin: 0 0 2rem 0; font-size: 1.5rem; }
        .sidebar-nav { flex-grow: 1; }
        .sidebar-nav button { background: none; border: none; color: #bdc3c7; display: block; width: 100%; text-align: left; padding: 1rem; font-size: 1rem; border-radius: 5px; cursor: pointer; transition: background 0.2s, color 0.2s; }
        .sidebar-nav button.active, .sidebar-nav button:hover { background: #34495e; color: white; }
        .logout-button { background: #e74c3c; border: none; color: white; padding: 0.75rem; border-radius: 5px; cursor: pointer; }
        .main-content { flex-grow: 1; padding: 2rem; position: relative; }
        .main-content h2 { font-size: 2rem; color: #333; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
        .stats-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
        .stat-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .stat-card h3 { margin: 0 0 0.5rem 0; color: #007bff; }
        .stat-card p { font-size: 2rem; font-weight: bold; margin: 0; }
        .data-table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-radius: 8px; overflow: hidden; }
        .data-table th, .data-table td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
        .data-table th { background: #f1f3f5; }
        .status-verified { background: #d4edda; color: #155724; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.8rem; font-weight: 500;}
        .status-pending { background: #fff3cd; color: #856404; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.8rem; font-weight: 500;}
        .status-suspended { background: #f8d7da; color: #721c24; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.8rem; font-weight: 500;}
        .action-button { background: #e74c3c; color: white; border: none; border-radius: 4px; padding: 0.5rem 0.75rem; cursor: pointer; margin-right: 5px; font-weight: 500; }
        .action-button.approve { background: #28a745; }
        .add-new-button { background: #007bff; color: white; border: none; padding: 0.75rem 1.25rem; border-radius: 5px; font-size: 1rem; cursor: pointer; margin-bottom: 1.5rem; font-weight: bold; }
        
        // Modal Styles
        .modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
        .modal-content { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); width: 100%; max-width: 500px; }
        .modal-content h3 { margin-top: 0; }
        .modal-actions { margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.5rem; }
    `;

    // --- Modal Component ---
    const Modal = ({ show, type, data, onClose }) => {
        if (!show) return null;

        const AddForm = ({ onAdd, type }) => {
            const [name, setName] = useState('');
            const [email, setEmail] = useState('');
            return (
                <div>
                    <h3>Add New {type}</h3>
                    <div className="form-group">
                        <label>{type} Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="modal-actions">
                        <button className="action-button approve" onClick={() => onAdd(name, email)}>Add</button>
                        <button className="action-button" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            );
        };

        const Confirmation = ({ onConfirm, message }) => (
            <div>
                <h3>Confirm Action</h3>
                <p>{message}</p>
                <div className="modal-actions">
                    <button className="action-button approve" onClick={onConfirm}>Confirm</button>
                    <button className="action-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        );
        
        let content;
        switch(type) {
            case 'addUniversity':
                content = <AddForm onAdd={addUniversity} type="University" />;
                break;
            case 'addCompany':
                content = <AddForm onAdd={addCompany} type="Company" />;
                break;
            case 'suspend':
                const actionText = data.status === 'Suspended' ? 'Unsuspend' : 'Suspend';
                content = <Confirmation onConfirm={() => toggleSuspend(data._id, data.type)} message={`Are you sure you want to ${actionText.toLowerCase()} ${data.name}?`} />;
                break;
            case 'approve':
                content = <Confirmation onConfirm={() => approveCompany(data._id)} message={`Are you sure you want to approve ${data.name}?`} />;
                break;
            default:
                content = null;
        }

        return (
            <div className="modal-backdrop" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    {content}
                </div>
            </div>
        );
    };

    const renderView = () => {
        switch(view) {
            case 'universities': return <ManageUniversities />;
            case 'companies': return <ManageCompanies />;
            case 'students': return <ViewStudents />;
            case 'home':
            default:
                return <DashboardHome />;
        }
    }

    return (
        <>
            <style>{styles}</style>
            <div className="admin-dashboard">
                <aside className="sidebar">
                    <h2>UniNest Admin</h2>
                    <nav className="sidebar-nav">
                        <button onClick={() => setView('home')} className={view === 'home' ? 'active' : ''}>Dashboard</button>
                        <button onClick={() => setView('universities')} className={view === 'universities' ? 'active' : ''}>Universities</button>
                        <button onClick={() => setView('companies')} className={view === 'companies' ? 'active' : ''}>Companies</button>
                        <button onClick={() => setView('students')} className={view === 'students' ? 'active' : ''}>Students</button>
                    </nav>
                    <button onClick={logout} className="logout-button">Logout</button>
                </aside>
                <main className="main-content">
                    {renderView()}
                </main>
                <Modal show={modal.isOpen} type={modal.type} data={modal.data} onClose={closeModal} />
            </div>
        </>
    );
};

// ... (rest of the components: StudentLogin, StudentRegister, AdminLogin etc. remain the same)
// --- 5. Student Components (No Change) ---
const StudentLogin = ({ setView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }
        setIsLoading(true);
        // This is a placeholder for actual student login logic
        if (email === 'student@example.com' && password === 'password') {
             login({ email, role: 'student' });
        } else {
             setError('Invalid email or password.');
        }
        setIsLoading(false);
    };

    return (
        <>
            <style>{formStyles}</style>
            <div className="form-container">
                <div className="form-card">
                    <h2>Student Login</h2>
                    <form onSubmit={handleSubmit} noValidate>
                        {error && <div className="general-error-message">{error}</div>}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-container">
                                <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="form-button" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="switch-link">
                        Don't have an account? <button type="button" onClick={() => setView('studentRegister')}>Register here</button>
                    </p>
                </div>
                 <button className="back-button" onClick={() => setView('roleSelection')}>Back to Role Selection</button>
            </div>
        </>
    );
};
const StudentRegister = ({ setView }) => {
    const [studentName, setStudentName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!studentName || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }
        
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: studentName, 
                    email, 
                    password,
                    role: 'student' 
                }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                alert("Registration successful! Please login.");
                setView('studentLogin');
            } else {
                setError(data.error || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Server error. Please ensure your backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <style>{formStyles}</style>
            <div className="form-container">
                <div className="form-card">
                    <h2>Student Registration</h2>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="general-error-message">{error}</div>}
                        <div className="form-group">
                            <label htmlFor="studentName">Full Name</label>
                            <input id="studentName" type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-container">
                                <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="password-input-container">
                                <input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                <span className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="form-button" disabled={isLoading}>
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                    <p className="switch-link">
                        Already have an account? <button type="button" onClick={() => setView('studentLogin')}>Login here</button>
                    </p>
                </div>
                <button className="back-button" onClick={() => setView('roleSelection')}>Back to Role Selection</button>
            </div>
        </>
    );
};
const StudentDashboard = () => {
    const { user, logout } = useAuth();
    const styles = `
        .dashboard-container { padding: 2rem; font-family: sans-serif; }
        .dashboard-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
        .dashboard-header h1 { margin: 0; }
        .logout-button { padding: 0.5rem 1rem; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .logout-button:hover { background-color: #c82333; }
        .welcome-message { margin-top: 2rem; }
    `;

    return (
        <>
            <style>{styles}</style>
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h1>Student Dashboard</h1>
                    <button onClick={logout} className="logout-button">Logout</button>
                </header>
                <main>
                    <p className="welcome-message">
                        Welcome, <strong>{user?.email || 'Student'}</strong>!
                    </p>
                </main>
            </div>
        </>
    );
};
const AdminLogin = ({ setView }) => {
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('password123');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                login({ email, role: 'admin' });
            } else {
                setError(data.error || 'Invalid email or password.');
            }
        } catch (err) {
            setError('Server error. Please ensure your backend is running.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <style>{formStyles}</style>
            <div className="form-container">
                <div className="form-card">
                    <h2>Admin Login</h2>
                    <form onSubmit={handleSubmit} noValidate>
                         {error && <div className="general-error-message">{error}</div>}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-container">
                                <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="form-button" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="switch-link">
                        Don't have an account? <button type="button">Register here</button>
                    </p>
                </div>
                <button className="back-button" onClick={() => setView('roleSelection')}>Back to Role Selection</button>
            </div>
        </>
    );
};
const GenericLogin = ({ role, setView }) => (
    <div style={{ textAlign: 'center', paddingTop: '50px', fontFamily: 'sans-serif' }}>
        <h2>{role} Login</h2>
        <p>Login form for {role} would go here.</p>
        <button onClick={() => setView('roleSelection')}>Back to Role Selection</button>
    </div>
);
const formStyles = `
    .form-container { display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; background-color: #f0f2f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; padding: 1rem; }
    .form-card { background: #fff; padding: 2.5rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); width: 100%; max-width: 450px; text-align: center; }
    .form-card h2 { margin-bottom: 1.5rem; color: #333; font-size: 1.75rem; }
    .form-group { margin-bottom: 1.25rem; text-align: left; }
    .form-group label { display: block; margin-bottom: 0.5rem; color: #555; font-weight: 500; }
    .form-group input { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; box-sizing: border-box; transition: border-color 0.2s; }
    .form-group input:focus { border-color: #007bff; outline: none; box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25); }
    .password-input-container { position: relative; display: flex; align-items: center; }
    .password-input-container input { padding-right: 40px; }
    .password-toggle-icon { position: absolute; right: 10px; cursor: pointer; color: #888; }
    .error-message { color: #dc3545; font-size: 0.875rem; text-align: left; margin-top: 0.25rem; }
    .general-error-message { color: #dc3545; background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 0.75rem; border-radius: 4px; margin-bottom: 1rem; text-align: center; }
    .form-button { width: 100%; padding: 0.75rem; background-color: #007bff; color: white; border: none; border-radius: 4px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: background-color 0.2s; margin-top: 0.5rem; }
    .form-button:hover { background-color: #0056b3; }
    .form-button:disabled { background-color: #a0c7ff; cursor: not-allowed; }
    .switch-link { margin-top: 1.5rem; font-size: 0.9rem; color: #555; }
    .switch-link button { color: #007bff; text-decoration: none; font-weight: bold; background: none; border: none; padding: 0; cursor: pointer; font-family: inherit; font-size: inherit; }
    .switch-link button:hover { text-decoration: underline; }
    .back-button { background: none; border: none; color: #007bff; cursor: pointer; font-size: 0.9rem; margin-top: 1rem; padding: 0.5rem; }
    .back-button:hover { text-decoration: underline; }
`;

// --- 8. Main App Component & Controller ---
function App() {
    return (
        <AuthProvider>
            <PageController />
        </AuthProvider>
    );
}

function PageController() {
    const { user, logout } = useAuth();
    const [view, setView] = useState('roleSelection');

    if (user) {
        switch(user.role) {
            case 'admin':
                return <AdminDashboard />;
            case 'student':
                return <StudentDashboard />;
            default:
                 return (
                    <div>
                        <h2>Welcome {user.email}</h2>
                        <button onClick={logout}>Logout</button>
                    </div>
                );
        }
    }

    switch(view) {
        case 'adminLogin':
            return <AdminLogin setView={setView} />;
        case 'studentLogin':
            return <StudentLogin setView={setView} />;
        case 'studentRegister':
            return <StudentRegister setView={setView} />;
        case 'universityLogin':
            return <GenericLogin role="University" setView={setView} />;
        case 'companyLogin':
            return <GenericLogin role="Company" setView={setView} />;
        case 'roleSelection':
        default:
            return <RoleSelection setView={setView} />;
    }
}

export default App;

