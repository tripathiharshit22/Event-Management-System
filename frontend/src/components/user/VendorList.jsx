import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VendorList = () => {
    const [vendors, setVendors] = useState([]);
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const res = await axios.get('/api/users/vendors', config);
                setVendors(res.data);
            } catch (err) { console.error(err); }
        };
        fetchVendors();
    }, []);

    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Catering', 'Florist', 'Decoration', 'Lighting'];

    const filteredVendors = filter === 'All'
        ? vendors
        : vendors.filter(v => v.category === filter);

    return (
        <div>
            <h2>Select Vendor</h2>
            <div className="filter-section" style={{ marginBottom: '20px', textAlign: 'center' }}>
                <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Filter by Category:</label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ padding: '8px', borderRadius: '5px' }}
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="product-grid">
                {filteredVendors.length > 0 ? (
                    filteredVendors.map(v => (
                        <div key={v._id} className="card" style={{ display: 'block', textAlign: 'center' }}>
                            <h3>{v.name}</h3>
                            <p style={{ color: '#007bff', fontWeight: 'bold' }}>{v.category}</p>
                            <p>{v.email}</p>
                            <Link to={`/user/products/${v._id}`}><button className="btn-action">Shop Item</button></Link>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', width: '100%' }}>No vendors found for this category.</p>
                )}
            </div>
        </div>
    );
};

export default VendorList;
