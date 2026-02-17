const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Membership = require('../models/Membership');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getReports = async (req, res) => {
    try {
        // Total Memberships
        const totalMemberships = await Membership.countDocuments();
        const activeMemberships = await Membership.countDocuments({ status: 'Active' });
        const cancelledMemberships = await Membership.countDocuments({ status: 'Cancelled' });

        // Total Orders
        const totalOrders = await Order.countDocuments();

       
        const vendorSales = await Order.aggregate([
            { $unwind: "$products" },
            {
                $lookup: {
                    from: "products",
                    localField: "products.productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" },
            {
                $group: {
                    _id: "$productDetails.vendorId",
                    totalSales: { $sum: { $multiply: ["$products.quantity", "$productDetails.price"] } }
                }
            },
            {
                $lookup: {
                    from: "vendors",
                    localField: "_id",
                    foreignField: "_id",
                    as: "vendorInfo"
                }
            },
            { $unwind: "$vendorInfo" },
            {
                $project: {
                    vendorName: "$vendorInfo.name",
                    totalSales: 1
                }
            }
        ]);

        // Total Revenue (System wide)
        const totalRevenue = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" }
                }
            }
        ]);

        res.json({
            membershipStats: {
                total: totalMemberships,
                active: activeMemberships,
                cancelled: cancelledMemberships
            },
            totalOrders,
            vendorSales,
            totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
