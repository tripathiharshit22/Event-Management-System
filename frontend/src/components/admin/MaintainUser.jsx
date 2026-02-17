import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaintainUser = () => {
    const [users, setUsers] = useState([]);
    const [view, setView] = useState('list'); 
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'User' });
    const [selectedId, setSelectedId] = useState(null);

    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/api/admin/users', config);
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete User?')) {
            try {
                await axios.delete(`/api/admin/users/${id}`, config);
                fetchUsers();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/users', formData, config);
            setView('list');
            fetchUsers();
        } catch (err) {
            console.error(err);
            alert('Error adding user: ' + (err.response?.data?.msg || err.message));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/admin/users/${selectedId}`, { name: formData.name, email: formData.email }, config);
            setView('list');
            fetchUsers();
        } catch (err) {
            console.error(err);
            alert('Error updating user: ' + (err.response?.data?.msg || err.message));
        }
    };

    const startUpdate = (user) => {
        setFormData({ name: user.name, email: user.email, password: '', role: user.role });
        setSelectedId(user._id);
        setView('update');
    };

    return (
        <div>
            <h2>User Management</h2>
            {view === 'list' && (
                <>
                    <button className="btn-action" onClick={() => { setView('add'); setFormData({ name: '', email: '', password: '', role: 'User' }); }}>Add User</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn-action" onClick={() => startUpdate(user)}>Update</button>
                                        <button className="btn-action" onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {view === 'add' && (
                <div className="card">
                    <h3>Add User</h3>
                    <form onSubmit={handleAdd}>
                        <div className="form-group"><label>Name</label><input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required /></div>
                        <div className="form-group"><label>Email</label><input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required /></div>
                        <div className="form-group"><label>Password</label><input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required /></div>
                        <div className="form-group"><label>Role</label>
                            <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                                <option>User</option>
                                <option>Vendor</option>
                                {/* .......*/}
                                <option>Admin</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-primary">Add</button>
                        <button type="button" className="btn-secondary" onClick={() => setView('list')}>Cancel</button>
                    </form>
                </div>
            )}

            {view === 'update' && (
                <div className="card">
                    <h3>Update User</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-group"><label>Name</label><input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required /></div>
                        <div className="form-group"><label>Email</label><input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required /></div>
                        {/* Password update usually separate or optional. Prompt doesn't specify. */}
                        <button type="submit" className="btn-primary">Update</button>
                        <button type="button" className="btn-secondary" onClick={() => setView('list')}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MaintainUser;
