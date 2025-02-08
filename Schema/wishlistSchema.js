const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    description: String,
    price: Number,
    discount: Number,
    imageUrl: String,
   
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
