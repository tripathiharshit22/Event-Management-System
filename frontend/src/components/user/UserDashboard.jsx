import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import VendorList from './VendorList';
import Cart from './Cart';
import GuestList from './GuestList';
import OrderStatus from './OrderStatus';
import ProductList from './ProductList';
import Checkout from './Checkout';
import Success from './Success';
import Transactions from '../admin/Transactions'; 

const UserDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="main-container">
            <div className="header-bar">User Portal</div>
            <div className="navbar">
                <Link to="/user/vendors"><button className="btn-primary">Vendor</button></Link>
                <Link to="/user/cart"><button className="btn-primary">Cart</button></Link>
                <Link to="/user/guest-list"><button className="btn-primary">Guest List</button></Link>
                <Link to="/user/order-status"><button className="btn-primary">Order Status</button></Link>
                <button onClick={handleLogout} className="btn-action">Logout</button>
            </div>

            <Routes>
                <Route path="vendors" element={<VendorList />} />
                <Route path="products/:vendorId" element={<ProductList />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="success" element={<Success />} />
                <Route path="guest-list" element={<GuestList />} />
                <Route path="order-status" element={<OrderStatus />} />
                <Route path="/" element={<div style={{ textAlign: 'center', marginTop: '50px' }}>Select an option from the menu</div>} />
            </Routes>
        </div>
    );
};

export default UserDashboard;
