import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import AdminDashboard from './components/admin/AdminDashboard';
import VendorDashboard from './components/vendor/VendorDashboard';
import UserDashboard from './components/user/UserDashboard';

const Login = ({ role, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role })
            }); 
            const data = await response.json();
            if (response.ok) {
                onLogin(data);
            } else {
                alert(data.msg);
            }
        } catch (err) {
            console.error(err);
            alert('Login error');
        }
    };

    return (
        <div className="main-container">
            <div className="header-bar">{role} Login</div>
            <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn-secondary">Login</button>
                <div style={{ marginTop: '10px' }}>
                    <Link to="/">Back to Home</Link>
                </div>
            </form>
        </div>
    );
};

const Home = () => (
    <div className="main-container" style={{ textAlign: 'center' }}>
        <div className="header-bar">Event Management System</div>
        <h1>Welcome</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '50px' }}>
            <Link to="/login/admin"><button className="btn-primary">Admin Login</button></Link>
            <Link to="/login/vendor"><button className="btn-primary">Vendor Login</button></Link>
            <Link to="/login/user"><button className="btn-primary">User Login</button></Link>
        </div>
        <div style={{ marginTop: '20px' }}>
            <Link to="/signup"><button className="btn-primary">Sign Up</button></Link>
        </div>
    </div>
);

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'User' }); // Default User
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                alert('Registration Successful');
                navigate('/login/' + formData.role.toLowerCase());
            } else {
                alert(data.msg);
            }
        } catch (err) {
            alert('Error registering');
        }
    };

    return (
        <div className="main-container">
            <div className="header-bar">Sign Up</div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="form-group">
                    <label>Name</label>
                    <input onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                        <option value="User">User</option>
                        <option value="Vendor">Vendor</option>
                        <option value="Admin">Admin</option>
                        {/* Admin*/}
                    </select>
                </div>
                <button type="submit" className="btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

// Main App Component
function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const handleLogin = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // contains role
        setUser(data.user);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/login/admin" element={user?.role === 'Admin' ? <Navigate to="/admin" /> : <Login role="Admin" onLogin={handleLogin} />} />
                <Route path="/login/vendor" element={user?.role === 'Vendor' ? <Navigate to="/vendor" /> : <Login role="Vendor" onLogin={handleLogin} />} />
                <Route path="/login/user" element={user?.role === 'User' ? <Navigate to="/user" /> : <Login role="User" onLogin={handleLogin} />} />

                {/* Dashboard Routes */}
                <Route path="/admin/*" element={user?.role === 'Admin' ? <AdminDashboard /> : <Navigate to="/login/admin" />} />
                <Route path="/vendor/*" element={user?.role === 'Vendor' ? <VendorDashboard /> : <Navigate to="/login/vendor" />} />
                <Route path="/user/*" element={user?.role === 'User' ? <UserDashboard /> : <Navigate to="/login/user" />} />
            </Routes>
        </Router>
    );
}

export default App;
