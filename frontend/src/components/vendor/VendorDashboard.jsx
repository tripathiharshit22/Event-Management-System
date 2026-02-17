import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AddItem from './AddItem';
import ProductStatus from './ProductStatus';
import Transactions from '../admin/Transactions'; 

const VendorDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="main-container">
            <div className="header-bar">Vendor Dashboard</div>
            <div className="navbar">
                <Link to="/vendor/add-item"><button className="btn-primary">Add New Item</button></Link>
                <Link to="/vendor/product-status"><button className="btn-primary">Your Item (Product Status)</button></Link>
                <Link to="/vendor/transactions"><button className="btn-primary">Transaction</button></Link>
                <button onClick={handleLogout} className="btn-action">Logout</button>
            </div>

            <Routes>
                <Route path="add-item" element={<AddItem />} />
                <Route path="product-status" element={<ProductStatus />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="/" element={<div style={{ textAlign: 'center', marginTop: '50px' }}>Select an option from the menu</div>} />
            </Routes>
        </div>
    );
};

export default VendorDashboard;
