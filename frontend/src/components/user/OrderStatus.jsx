import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderStatus = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('/api/users/orders', config);
                setOrders(res.data);
            } catch (err) { console.error(err); }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <h2>User Order Status</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            {/* User name/email 
                             */}
                            <td>{order.userId?.name || 'Me'}</td>
                            <td>{order.userId?.email || 'My Email'}</td>
                            {/* 
                            */}
                            <td>{order.deliveryAddress?.address}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderStatus;
