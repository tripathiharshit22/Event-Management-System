import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GuestList = () => {
    const [guests, setGuests] = useState([]);
    const [formData, setFormData] = useState({ guestName: '', email: '', phone: '', status: 'Invited' });
    const [view, setView] = useState('list');
    const [editingId, setEditingId] = useState(null);

    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    useEffect(() => {
        fetchGuests();
    }, []);

    const fetchGuests = async () => {
        try {
            const res = await axios.get('/api/guests', config);
            setGuests(res.data);
        } catch (err) { console.error(err); }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/guests', formData, config);
            setView('list');
            setFormData({ guestName: '', email: '', phone: '', status: 'Invited' });
            fetchGuests();
        } catch (err) {
            alert('Error adding guest');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete guest?')) {
            try {
                await axios.delete(`/api/guests/${id}`, config);
                fetchGuests();
            } catch (err) { console.error(err); }
        }
    };

    const startEdit = (guest) => {
        setFormData({ guestName: guest.guestName, email: guest.email, phone: guest.phone, status: guest.status });
        setEditingId(guest._id);
        setView('edit');
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/guests/${editingId}`, formData, config);
            setView('list');
            setEditingId(null);
            setFormData({ guestName: '', email: '', phone: '', status: 'Invited' });
            fetchGuests();
        } catch (err) {
            alert('Error updating guest');
        }
    };

    return (
        <div>
            <h2>Guest List</h2>
            {view === 'list' && (
                <>
                    <button className="btn-action" onClick={() => setView('add')}>Add Guest</button>
                    <table>
                        <thead>
                            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {guests.map(g => (
                                <tr key={g._id}>
                                    <td>{g.guestName}</td>
                                    <td>{g.email}</td>
                                    <td>{g.phone}</td>
                                    <td>{g.status}</td>
                                    <td>
                                        <button className="btn-action" onClick={() => startEdit(g)}>Update</button>
                                        <button className="btn-action" onClick={() => handleDelete(g._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {(view === 'add' || view === 'edit') && (
                <div className="card">
                    <h3>{view === 'add' ? 'Add Guest' : 'Update Guest'}</h3>
                    <form onSubmit={view === 'add' ? handleAdd : handleUpdate}>
                        <div className="form-group"><label>Name</label><input value={formData.guestName} onChange={e => setFormData({ ...formData, guestName: e.target.value })} required /></div>
                        <div className="form-group"><label>Email</label><input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required /></div>
                        <div className="form-group"><label>Phone</label><input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required /></div>
                        {view === 'edit' && (
                            <div className="form-group"><label>Status</label>
                                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                    <option>Invited</option>
                                    <option>Confirmed</option>
                                </select>
                            </div>
                        )}
                        <button className="btn-primary">{view === 'add' ? 'Save' : 'Update'}</button>
                        <button type="button" className="btn-secondary" onClick={() => { setView('list'); setFormData({ guestName: '', email: '', phone: '', status: 'Invited' }); }}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default GuestList;
