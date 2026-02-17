const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getUsers, addUser, updateUser, deleteUser, getVendors, addVendor, deleteVendor, addMembership } = require('../controllers/adminController');


// Middleware for Admin role check
const adminCheck = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ msg: 'Admin access only' });
    }
};

router.use(auth, adminCheck);

// User Management
router.get('/users', getUsers);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Vendor Management
router.get('/vendors', getVendors);
router.post('/vendors', addVendor);
router.delete('/vendors/:id', deleteVendor);

// Transactions
router.get('/transactions', require('../controllers/orderController').getAllOrders);

// Membership Management
router.post('/memberships', addMembership);

module.exports = router;
