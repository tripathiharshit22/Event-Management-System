import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaintainVendor = () => {
    const [vendors, setVendors] = useState([]);
    const [view, setView] = useState('list');
    const [formData, setFormData] = useState({ name: '', email: '', category: 'Catering', password: '' });

    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const res = await axios.get('/api/admin/vendors', config);
            setVendors(res.data);
        } catch (err) { console.error(err); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete Vendor?')) {
            try {
                await axios.delete(`/api/admin/vendors/${id}`, config);
                fetchVendors();
            } catch (err) { console.error(err); }
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/vendors', formData, config);
            setView('list');
            fetchVendors();
        } catch (err) {
            console.error(err);
            alert('Error adding vendor: ' + (err.response?.data?.msg || err.message));
        }
    };

   
    return (
        <div>
            <h2>Vendor Management</h2>
            {view === 'list' && (
                <>
                    <button className="btn-action" onClick={() => { setView('add'); setFormData({ name: '', email: '', category: 'Catering', password: '' }); }}>Add Vendor</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendors.map(v => (
                                <tr key={v._id}>
                                    <td>{v.name}</td>
                                    <td>{v.category}</td>
                                    <td>{v.email}</td>
                                    <td>
                                        <button className="btn-action">Update</button> {/* Placeholder */}
                                        <button className="btn-action" onClick={() => handleDelete(v._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {view === 'add' && (
                <div className="card">
                    <h3>Add Vendor</h3>
                    <form onSubmit={handleAdd}>
                        <div className="form-group"><label>Name</label><input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required /></div>
                        <div className="form-group"><label>Email</label><input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required /></div>
                        <div className="form-group"><label>Category</label>
                            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                <option>Catering</option>
                                <option>Florist</option>
                                <option>Decoration</option>
                                <option>Lighting</option>
                            </select>
                        </div>
                        <div className="form-group"><label>Password</label><input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required /></div>
                        <button type="submit" className="btn-primary">Add</button>
                        <button type="button" className="btn-secondary" onClick={() => setView('list')}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MaintainVendor;
