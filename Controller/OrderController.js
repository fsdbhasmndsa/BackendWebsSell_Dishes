const Order =  require("../Schema/orderSchema")
const User = require("../Schema/userSchema")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart = require("../Schema/cartSchema")

module.exports.CreateOrder = async(req,res)=>{
    const id =  req.user._id
    const {address,items,total} =  req.body

    const order =  new Order({
        userId:id,
        items:items,
        totalAmount:total,
        address:address,
        status:"Pending"
    })

    try {
       await order.save()
       await Cart.updateOne({userId:id,items:[]})

        res.json({code:200,message:"Order successful"})
    } catch (error) {
        res.json({code:400,message:"Order failed"})
    }


}

module.exports.ViewOrder = async(req,res)=>{
    const id = req.user._id

   try {
    const ListOrder = await Order.find({userId:id});

    res.json({code:200,message:"Get Order Successful",ListOrder:ListOrder})
   } catch (error) {
    res.json({code:400,message:"Get Order Failed"})
   }
}

module.exports.DeleteOrder = async (req,res)=>{
    const id =  req.params.id

    try {
       await Order.deleteOne({_id:id}) 
       res.json({code:200,message:"Delete Successful"})
    } catch (error) {
        res.json({code:400,message:"Delete Failed"})
    }
}

module.exports.CheckoutOnline =async (req, res) => {
    const products = req.body
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: products.map(item => ({
        price_data: {
          currency: "usd",
          product_data: { 
            name: item.name,
            images: [item.imageUrl] // Truyền ảnh sản phẩm từ request
          },
          unit_amount: item.price * 100, // Chuyển từ USD sang cents
        },
        quantity: item.quantity,
      })),
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
  
    res.json({ url: session.url });
  }