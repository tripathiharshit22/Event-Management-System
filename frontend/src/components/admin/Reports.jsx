import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
    const [stats, setStats] = useState(null);
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await axios.get('/api/reports', config);
                setStats(res.data);
            } catch (err) { console.error(err); }
        };
        fetchReports();
    }, []);

    if (!stats) return <div>Loading Reports...</div>;

    return (
        <div>
            <h2>Reports</h2>
            <div className="product-grid">
                <div className="card" style={{ display: 'block' }}>
                    <h3>Memberships</h3>
                    <p>Total: {stats.membershipStats.total}</p>
                    <p>Active: {stats.membershipStats.active}</p>
                    <p>Cancelled: {stats.membershipStats.cancelled}</p>
                </div>
                <div className="card" style={{ display: 'block' }}>
                    <h3>Orders</h3>
                    <p>Total Orders: {stats.totalOrders}</p>
                    <p>Total Revenue: ${stats.totalRevenue}</p>
                </div>
            </div>
            <h3>Vendor Sales</h3>
            <table>
                <thead>
                    <tr>
                        <th>Vendor Name</th>
                        <th>Total Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.vendorSales.map((v, i) => (
                        <tr key={i}>
                            <td>{v.vendorName}</td>
                            <td>${v.totalSales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;
