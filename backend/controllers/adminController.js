const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Membership = require('../models/Membership');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'Admin' } }).select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add User
exports.addUser = async (req, res) => {
    // Admin adds user
    
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password, role });
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update User (Generic)
exports.updateUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Vendor Management
exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('userId', 'name email');
        res.json(vendors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.addVendor = async (req, res) => {
    const { name, email, category, password } = req.body; // Use password to create User account for vendor
    try {
        // Create User account first
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password, role: 'Vendor' });
        await user.save();

        // Create Vendor profile
        const vendor = new Vendor({
            name,
            email,
            category,
            userId: user.id
        });
        await vendor.save();
        res.json(vendor);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) return res.status(404).json({ msg: 'Vendor not found' });

        // Remove associated User account
        await User.findByIdAndDelete(vendor.userId);
        await Vendor.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Vendor removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Membership Management
exports.addMembership = async (req, res) => {
    const { membershipNumber, userId, duration } = req.body;

    if (!membershipNumber || !userId) {
        return res.status(400).json({ msg: 'Please provide Membership Number and User' });
    }

    try {
        const startDate = new Date();
        let expiryDate = new Date();
        if (duration === '6 months') expiryDate.setMonth(expiryDate.getMonth() + 6);
        else if (duration === '1 year') expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        else if (duration === '2 years') expiryDate.setFullYear(expiryDate.getFullYear() + 2);

        const membership = new Membership({
            membershipNumber,
            userId,
            duration,
            startDate,
            expiryDate,
            status: 'Active'
        });

        await membership.save();
        res.json(membership);
    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) {
            return res.status(400).json({ msg: 'Membership Number already exists' });
        }
        res.status(500).json({ msg: 'Server Error: ' + err.message });
    }
};
