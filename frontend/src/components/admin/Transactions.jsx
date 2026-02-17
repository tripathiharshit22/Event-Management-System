import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
    // Shows Order history, Payment method, Amount, Status
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');
    const role = JSON.parse(localStorage.getItem('user'))?.role;

    
    useEffect(() => {
        const fetchTransactions = async () => {
            let endpoint = '';
            if (role === 'User') endpoint = '/api/users/orders';
            else if (role === 'Vendor') endpoint = '/api/vendor/orders';
            else if (role === 'Admin') endpoint = '/api/reports/transactions'; 

            
            if (role === 'Admin') {
                
                endpoint = '/api/admin/transactions';
            }

            try {
                const res = await axios.get(endpoint, { headers: { 'x-auth-token': token } });
                setOrders(res.data);
            } catch (err) { console.error(err); }
        };
        fetchTransactions();
    }, [role, token]);

    return (
        <div>
            <h2>Transactions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Order ID</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>{order._id}</td>
                            <td>${order.totalAmount}</td>
                            <td>{order.paymentMethod}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;
