const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
      
          _id: mongoose.Schema.Types.ObjectId,
          name: String,
          description: String,
          price: Number,
          discount: Number,
          imageUrl: String,
          quantity: Number,
        
      
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
