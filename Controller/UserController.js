const User = require("../Schema/userSchema")
const Helper = require("../Helper/GenerateToken")
const Cart = require("../Schema/cartSchema")
const wishlist = require("../Schema/wishlistSchema")

module.exports.test = async(req, res)=>{
    res.json({message:"Running"})
}
module.exports.Login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
        if (password != user.password) {
            res.json({ code: 400, message: "Login failed" })
        }
        const cartluu = await Cart.findOne({userId:user._id}).select("_id")
        if(!cartluu)
        {
            const cart = new Cart({ userId: user._id, items: [] })
            const cartsave = await cart.save()
            res.json({ code: 200, message: "Login failed", Token: user.Token, IDCART: cartsave._id })
        }
        else{
            res.json({ code: 200, message: "Login failed", Token: user.Token, IDCART: cartluu._id })
        }
       
    }
    else {
        res.json({ code: 400, message: "Login failed" })
    }
}

module.exports.Register = async (req, res) => {
    const { fullname, username, password, phonenumber } = req.body

    const user = await User.findOne({ username: username }).select("username");
    const Token = Helper.GenerateToken(8)
    if (user) {
        res.json({ code: 400, message: "Username exitst" })
    }
    else {
        const userCreate = new User({
            fullname: fullname,
            password: password,
            username: username,
            phonenumber: phonenumber,
            role: "User",
            Token: Token,
            address: ""
        })


        const user = await userCreate.save();

        res.json({ code: 200, message: "Create successful" })


    }
}

module.exports.UpdateUser = async (req, res) => {
    const { phonenumber, fullname, address } = req.body
    console.log("address", address)
    const id = req.user._id
    try {
        await User.updateOne({ _id: id, phonenumber: phonenumber, fullname: fullname, address: address })
        res.json({ code: 200, message: "Update successful" })
    } catch (error) {
        res.json({ code: 400, message: "Update failed" })
    }
}

module.exports.ViewUser = async (req, res) => {
    const id = req.user._id
    try {
        const user = await User.findOne({ _id: id }).select("phonenumber fullname address")
        res.json({ code: 200, message: "GET successful", User: user })
    } catch (error) {
        res.json({ code: 400, message: "GET failed" })
    }
}
module.exports.LoginWithGoogle = async (req, res) => {
    const { fullname, username } = req.body
    console.log("fullname",fullname)
    console.log("username",username)
    try {
        const user = await User.findOne({ username: username })
        if (!user) {
            const Token = Helper.GenerateToken(8)
            const newUser = new User({ username: username, fullname: fullname, Token: Token })
            const createduser =  await newUser.save()
            const cartluu = await Cart.findOne({userId:createduser._id}).select("_id")
        if(!cartluu)
        {
            const cart = new Cart({ userId: createduser._id, items: [] })
            const cartsave = await cart.save()
            res.json({ code: 200, message: "Login failed", Token: createduser.Token, IDCART: cartsave._id })
        }
        else{
            res.json({ code: 200, message: "Login failed", Token: createduser.Token, IDCART: cartluu._id })
        }


        }
        else
        {
            res.json({ code: 200, message: "GET successful", Token: user.Token, IDCART: cartluu._id  })
        }
      
    } catch (error) {
        res.json({ code: 400, message: "GET successful" })
    }
}
module.exports.Fogotpassword = async (req, res) => {

}

module.exports.Changepassword = async (req, res) => {

}