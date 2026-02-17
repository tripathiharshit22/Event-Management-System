const Product = require('../models/Product');
const Order = require('../models/Order');

// Add Item
exports.addProduct = async (req, res) => {
    try {
        const { productName, price, image } = req.body;
        
        const Vendor = require('../models/Vendor');
        const vendor = await Vendor.findOne({ userId: req.user.id });
        if (!vendor) return res.status(404).json({ msg: 'Vendor profile not found' });

        const newProduct = new Product({
            vendorId: vendor.id,
            productName,
            price,
            image
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Vendor Items
exports.getVendorProducts = async (req, res) => {
    try {
        const Vendor = require('../models/Vendor');
        const vendor = await Vendor.findOne({ userId: req.user.id });
        if (!vendor) return res.status(404).json({ msg: 'Vendor profile not found' });

        const products = await Product.find({ vendorId: vendor.id });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update Order Status (Vendor side)

exports.getVendorOrders = async (req, res) => {
    try {
        const Vendor = require('../models/Vendor');
        const vendor = await Vendor.findOne({ userId: req.user.id });
        

        const orders = await Order.find({ 'products.vendorId': vendor.id })
            .populate('userId', 'name email')
            .populate('products.productId', 'productName price');

        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        // Status can be: Received, Ready for Shipping, Out for Delivery
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        order.status = status;
        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete Item
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // Verify ownership
        const Vendor = require('../models/Vendor');
        const vendor = await Vendor.findOne({ userId: req.user.id });
        if (product.vendorId.toString() !== vendor.id.toString()) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Product.findByIdAndDelete(req.params.id); 
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.updateProduct = async (req, res) => {
    const { productName, price, image } = req.body;
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // Verify ownership
        const Vendor = require('../models/Vendor');
        const vendor = await Vendor.findOne({ userId: req.user.id });
        if (product.vendorId.toString() !== vendor.id.toString()) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        product.productName = productName || product.productName;
        product.price = price || product.price; 
        product.image = image || product.image;

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
