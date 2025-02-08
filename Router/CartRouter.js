const express = require('express')
const router = express.Router();
const CartController =  require("../Controller/CartController")


router.get("/viewCart",CartController.viewCart)
router.post("/AddtoCart",CartController.AddtoCart)
router.put("/decreaseCart",CartController.decreasetoCart)
router.put("/increaseCart",CartController.increasetoCart)
router.delete("/deleteToCart",CartController.ReducetoCart)
router.get("/clearCart",CartController.clearCart)
router.post("/addalot/:id",CartController.AddALotWhenLogin)



module.exports = router