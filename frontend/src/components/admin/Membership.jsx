import React, { useState } from 'react';
import axios from 'axios';

const Membership = () => {
    const [membershipNumber, setMembershipNumber] = useState('');
    const [userId, setUserId] = useState(''); 
    const [duration, setDuration] = useState('6 months');

    // For Update
    const [searchNum, setSearchNum] = useState('');
    const [foundMembership, setFoundMembership] = useState(null);

    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/memberships', { membershipNumber, userId, duration }, config);
            alert('Membership Added');
        } catch (err) {
            const errorMsg = err.response?.data?.msg || err.response?.data || err.message;
            alert('Error adding membership: ' + errorMsg);
        }
    };

    
    const handleSearch = async () => {
        
        alert('Search functionality requires backend update. Placeholder.');
    };

    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/api/admin/users', config);
                setUsers(res.data);
                
                if (res.data.length > 0 && !userId) setUserId(res.data[0]._id);
            } catch (err) { console.error(err); }
        };
        fetchUsers();
    }, []);

    // Also update form:
    return (
        <div>
            <h2>Membership Management</h2>
            <div className="card">
                <h3>Add Membership</h3>
                <form onSubmit={handleAdd}>
                    <div className="form-group"><label>Membership Number</label><input value={membershipNumber} onChange={e => setMembershipNumber(e.target.value)} required /></div>
                    <div className="form-group">
                        <label>Select User</label>
                        <select value={userId} onChange={e => setUserId(e.target.value)} required style={{ padding: '8px', borderRadius: '5px', width: '100%' }}>
                            <option value="">-- Select User --</option>
                            {users.map(u => (
                                <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group radio-group">
                        <label><input type="radio" name="dur" value="6 months" checked={duration === '6 months'} onChange={e => setDuration(e.target.value)} /> 6 months</label>
                        <label><input type="radio" name="dur" value="1 year" checked={duration === '1 year'} onChange={e => setDuration(e.target.value)} /> 1 year</label>
                        <label><input type="radio" name="dur" value="2 years" checked={duration === '2 years'} onChange={e => setDuration(e.target.value)} /> 2 years</label>
                    </div>
                    <button type="submit" className="btn-action">Add Membership</button>
                </form>
            </div>

            <div className="card">
                <h3>Update Membership</h3>
                <div className="form-group"><label>Membership Number</label><input value={searchNum} onChange={e => setSearchNum(e.target.value)} /></div>
                <button className="btn-primary" onClick={handleSearch}>Fetch Record</button>
                {foundMembership && (
                    <div>
                        {/* Update */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Membership;
