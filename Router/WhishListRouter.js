const express = require('express')
const router = express.Router();
const wishlist =  require("../Controller/WhishlistController")


router.get("/viewWishlist",wishlist.viewWishlist)
router.post("/addWishlist",wishlist.addWishlist)
router.delete("/deleteWishlist/:id",wishlist.deleteWishlist)
router.get("/CheckWishList/:id",wishlist.CheckWishList)



module.exports = router