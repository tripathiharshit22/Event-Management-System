import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', number: '', address: '', city: '', state: '', pinCode: '', paymentMethod: 'Cash'
    });
    const navigate = useNavigate();
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare order data
        const products = cart.map(item => ({
            productId: item._id,
            quantity: item.quantity,
            vendorId: item.vendorId 
        }));

        const orderData = {
            products,
            totalAmount,
            paymentMethod: formData.paymentMethod,
            deliveryAddress: {
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pinCode: formData.pinCode
            }
        };

        try {
            await axios.post('/api/users/orders', orderData, config);
            // Clear cart
            localStorage.removeItem('cart');
            // Navigate to Success
            navigate('/user/success', { state: { orderData, formData } });
        } catch (err) {
            alert('Error placing order: ' + (err.response?.data?.msg || err.message));
        }
    };

    return (
        <div className="main-container">
            <div className="header-bar">Checkout Summary</div>
            <div className="card">
                <h3>Total Amount: ${totalAmount}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group"><label>Name</label><input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required /></div>
                    <div className="form-group"><label>Email</label><input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required /></div>
                    <div className="form-group"><label>Number</label><input type="number" value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value })} required /></div>
                    <div className="form-group"><label>Address</label><input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} required /></div>
                    <div className="form-group"><label>City</label><input value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} required /></div>
                    <div className="form-group"><label>State</label><input value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} required /></div>
                    <div className="form-group"><label>Pin Code</label><input value={formData.pinCode} onChange={e => setFormData({ ...formData, pinCode: e.target.value })} required /></div>

                    <div className="form-group"><label>Payment Method</label>
                        <select value={formData.paymentMethod} onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}>
                            <option>Cash</option>
                            <option>UPI</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-primary">Order Now</button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
