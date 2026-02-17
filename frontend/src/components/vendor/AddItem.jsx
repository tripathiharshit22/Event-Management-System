import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddItem = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ productName: '', price: '', image: '' });

    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/api/vendor/products', config);
            setProducts(res.data);
        } catch (err) { console.error(err); }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/vendor/products', formData, config);
            setFormData({ productName: '', price: '', image: '' });
            fetchProducts();
        } catch (err) {
            alert('Error adding product: ' + (err.response?.data?.msg || err.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete Product?')) {
            try {
                await axios.delete(`/api/vendor/products/${id}`, config);
                fetchProducts();
            } catch (err) { console.error(err); }
        }
    };

    const handleUpdate = async (id) => {
        
        alert('Update functionality implementation required: Open Modal with current data.');
    };

    return (
        <div>
            <h2>Add Item</h2>
            <div className="card">
                <form onSubmit={handleAdd}>
                    <div className="form-group"><label>Product Name</label><input value={formData.productName} onChange={e => setFormData({ ...formData, productName: e.target.value })} required /></div>
                    <div className="form-group"><label>Product Price</label><input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required /></div>
                    <div className="form-group">
                        <label>Product Image URL</label>
                        <input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required />
                        <small style={{ color: '#666', fontSize: '0.8rem' }}>Enter a direct image link (e.g., ends in .jpg, .png or starts with images.unsplash.com)</small>
                    </div>
                    <button type="submit" className="btn-primary">Add Item</button>
                </form>
            </div>

            <h3>Product List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p._id}>
                            <td>
                                <img
                                    src={p.image}
                                    alt={p.productName}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/50?text=No+Img'; }}
                                />
                            </td>
                            <td>{p.productName}</td>
                            <td>${p.price}</td>
                            <td>
                                <button className="btn-action" onClick={() => handleUpdate(p._id)}>Update</button>
                                <button className="btn-action" onClick={() => handleDelete(p._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddItem;
