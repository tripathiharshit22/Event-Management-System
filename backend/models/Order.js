const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            vendorId: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Vendor'
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'UPI'],
        required: true
    },
    status: {
        type: String,
        enum: ['Received', 'Ready for Shipping', 'Out for Delivery'],
        default: 'Received'
    },
    deliveryAddress: { 
        address: String,
        city: String,
        state: String,
        pinCode: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
