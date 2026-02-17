const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { placeOrder, getUserOrders, getAllVendors, getVendorProductsPublic } = require('../controllers/orderController');


router.use(auth);

router.get('/vendors', getAllVendors);
router.get('/products/:vendorId', getVendorProductsPublic);
router.post('/orders', placeOrder);
router.get('/orders', getUserOrders);

module.exports = router;
