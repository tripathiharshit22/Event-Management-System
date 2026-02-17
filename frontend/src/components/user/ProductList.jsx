import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProductList = () => {
    const { vendorId } = useParams();
    const [products, setProducts] = useState([]);

    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`/api/users/products/${vendorId}`, config);
                setProducts(res.data);
            } catch (err) { console.error(err); }
        };
        fetchProducts();
    }, [vendorId]);

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        // Check if item exists
        const existingItem = cart.find(item => item._id === product._id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to Cart');
    };

    return (
        <div>
            <h2>Products</h2>
            <div className="product-grid">
                {products.map(p => (
                    <div key={p._id} className="product-card">
                        <img src={p.image} alt={p.productName} />
                        <h3>{p.productName}</h3>
                        <p>${p.price}</p>
                        <button className="btn-action" onClick={() => addToCart(p)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <br />
            <Link to="/user/cart"><button className="btn-primary">Go to Cart</button></Link>
        </div>
    );
};

export default ProductList;
