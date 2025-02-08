const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    discount: Number,
    imageUrl: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },

}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);