const express = require('express')
const router = express.Router();
const CategoyController =  require("../Controller/CategoryController")
const Middleware =  require("../Middleware/auth.midleware")


router.get("/getALL",CategoyController.GetAll)
router.get("/FindByIdCategory/:id",CategoyController.FindByIdCategory)


module.exports = router