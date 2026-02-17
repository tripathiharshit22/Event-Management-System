import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import MaintainUser from './MaintainUser';
import MaintainVendor from './MaintainVendor';
import Membership from './Membership';
import Reports from './Reports';
import Transactions from './Transactions'; 

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="main-container">
            <div className="header-bar">Admin Dashboard</div>
            <div className="navbar">
                <Link to="/admin/maintain-user"><button className="btn-primary">Maintain User</button></Link>
                <Link to="/admin/maintain-vendor"><button className="btn-primary">Maintain Vendor</button></Link>
                <Link to="/admin/membership"><button className="btn-primary">Membership</button></Link>
                <Link to="/admin/reports"><button className="btn-primary">Reports</button></Link>
                <Link to="/admin/transactions"><button className="btn-primary">Transactions</button></Link>
                <button onClick={handleLogout} className="btn-action">Logout</button>
            </div>

            <Routes> // Nested Routes for Admin
                <Route path="maintain-user" element={<MaintainUser />} />
                <Route path="maintain-vendor" element={<MaintainVendor />} />
                <Route path="membership" element={<Membership />} />
                <Route path="reports" element={<Reports />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="/" element={<div style={{ textAlign: 'center', marginTop: '50px' }}>Select an option from the menu</div>} />
            </Routes>
        </div>
    );
};

export default AdminDashboard;
