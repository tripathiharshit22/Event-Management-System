const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addProduct, getVendorProducts, updateProduct, deleteProduct, getVendorOrders, updateOrderStatus } = require('../controllers/vendorController');

const vendorCheck = (req, res, next) => {
    if (req.user && req.user.role === 'Vendor') {
        next();
    } else {
        res.status(403).json({ msg: 'Vendor access only' });
    }
};

router.use(auth, vendorCheck);

// Product Management
router.post('/products', addProduct);
router.get('/products', getVendorProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Order Management
router.get('/orders', getVendorOrders);
router.put('/orders/:id/status', updateOrderStatus);

module.exports = router;
