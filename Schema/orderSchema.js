const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: String,
            description: String,
            price: Number,
            discount: Number,
            imageUrl: String,
            quantity: Number
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    address:String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
