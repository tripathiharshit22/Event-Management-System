import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductStatus = () => {
    

    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null); 
    const [statusOption, setStatusOption] = useState('');

    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('/api/vendor/orders', config);
            setOrders(res.data);
        } catch (err) { console.error(err); }
    };

    const handleUpdateClick = (order) => {
        setEditingOrder(order._id);
        setStatusOption(order.status);
    };

    const saveStatus = async (id) => {
        try {
            await axios.put(`/api/vendor/orders/${id}/status`, { status: statusOption }, config);
            setEditingOrder(null);
            fetchOrders();
        } catch (err) {
            alert('Error updating status');
        }
    };

    return (
        <div>
            <h2>Product Status (Orders)</h2>
            {editingOrder ? (
                <div className="card">
                    <h3>Update Status</h3>
                    <div className="radio-group">
                        <label><input type="radio" name="status" value="Received" checked={statusOption === 'Received'} onChange={e => setStatusOption(e.target.value)} /> Received</label>
                        <label><input type="radio" name="status" value="Ready for Shipping" checked={statusOption === 'Ready for Shipping'} onChange={e => setStatusOption(e.target.value)} /> Ready for Shipping</label>
                        <label><input type="radio" name="status" value="Out for Delivery" checked={statusOption === 'Out for Delivery'} onChange={e => setStatusOption(e.target.value)} /> Out for Delivery</label>
                    </div>
                    <button className="btn-primary" onClick={() => saveStatus(editingOrder)}>Update Status</button>
                    <button className="btn-secondary" onClick={() => setEditingOrder(null)}>Cancel</button>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order.userId?.name}</td>
                                <td>{order.userId?.email}</td>
                                <td>{order.deliveryAddress?.address}, {order.deliveryAddress?.city}</td>
                                <td>{order.status}</td>
                                <td>
                                    <button className="btn-action" onClick={() => handleUpdateClick(order)}>Update</button>
                                    <button className="btn-action">Delete</button> {/* Delete order */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductStatus;
