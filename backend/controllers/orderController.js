const Order = require('../models/Order');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

// Place Order
exports.placeOrder = async (req, res) => {
    const { products, totalAmount, paymentMethod, deliveryAddress } = req.body;
    try {
       

        const newOrder = new Order({
            userId: req.user.id,
            products,
            totalAmount,
            paymentMethod,
            deliveryAddress
        });

        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all orders for Admin
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get User Orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id })
            .populate('products.productId', 'productName price image');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// GetAllVendors for User
exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.json(vendors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Products by Vendor
exports.getVendorProductsPublic = async (req, res) => {
    try {
        const products = await Product.find({ vendorId: req.params.vendorId });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
