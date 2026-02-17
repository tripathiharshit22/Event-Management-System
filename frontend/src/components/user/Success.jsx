import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Success = () => {
    const location = useLocation();
    const { orderData, formData } = location.state || {};

    if (!orderData) return <div>No order details found.</div>;

    return (
        <div className="main-container">
            <div className="header-bar">Order Status</div>
            <h1>Thank You</h1>
            <div className="card" style={{ display: 'block' }}>
                <p><strong>Total Amount:</strong> ${orderData.totalAmount}</p>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Number:</strong> {formData.number}</p>
                <p><strong>Address:</strong> {orderData.deliveryAddress.address}, {orderData.deliveryAddress.city}, {orderData.deliveryAddress.state} - {orderData.deliveryAddress.pinCode}</p>
                <p><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
            </div>
            <Link to="/user/vendors"><button className="btn-action">Continue Shopping</button></Link>
        </div>
    );
};

export default Success;
