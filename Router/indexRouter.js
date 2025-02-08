const express = require('express')
const Product =  require('./ProductRouter')
const Cart = require("./CartRouter")
const Order = require("./OrderRouter")
const Category = require("./CategoryRouter")
const Wishlist = require("./WhishListRouter")
const User =  require("./UserRouter")
const Middleware =  require("../Middleware/auth.midleware")

const Router = (app)=>{

    app.use("/Product",Product)
    app.use("/Cart",Middleware.auth,Cart)
    app.use("/Order",Middleware.auth,Order)
    app.use("/Category",Category)
    app.use("/Wishlist",Middleware.auth,Wishlist)
    app.use("/User",User)

}

module.exports = Router