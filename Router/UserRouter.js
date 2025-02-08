const express = require('express')
const router = express.Router();
const UserController = require("../Controller/UserController")
const auth = require("../Middleware/auth.midleware")

router.get("/test",UserController.test)
router.post("/login",UserController.Login)
router.post("/register",UserController.Register)
router.get("/forgotpassword",UserController.Fogotpassword)
router.get("/changepassword",UserController.Changepassword)
router.put("/UpdateUser",auth.auth,UserController.UpdateUser)
router.get("/viewUser",auth.auth,UserController.ViewUser)
router.post("/loginWithGoogle",UserController.LoginWithGoogle)

module.exports = router