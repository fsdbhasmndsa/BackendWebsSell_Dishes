const express = require('express')
const router = express.Router();
const ProductController =  require("../Controller/ProductController")


router.get("/getALL",ProductController.GET_ALL)
router.get("/getDetailProduct/:id",ProductController.GetDetailProduct)
router.get("/getProductSimilar/:id",ProductController.getProductSimilar)


module.exports = router