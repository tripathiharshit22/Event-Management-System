import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(storedCart);
    }, []);

    const updateQuantity = (id, newQty) => {
        const updatedCart = cart.map(item =>
            item._id === id ? { ...item, quantity: Number(newQty) } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeItem = (id) => {
        const updatedCart = cart.filter(item => item._id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item._id}>
                                    <td><img src={item.image} alt={item.productName} style={{ width: '50px' }} /></td>
                                    <td>{item.productName}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <select value={item.quantity} onChange={(e) => updateQuantity(item._id, e.target.value)}>
                                            {[...Array(10).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>${item.price * item.quantity}</td>
                                    <td><button className="btn-secondary" onClick={() => removeItem(item._id)}>Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Grand Total: ${calculateTotal()}</h3>
                    <button className="btn-action" onClick={clearCart}>Delete All</button>
                    <Link to="/user/checkout"><button className="btn-action">Proceed to Checkout</button></Link>
                </>
            )}
        </div>
    );
};

export default Cart;
