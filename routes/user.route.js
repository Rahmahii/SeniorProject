const express=require('express')
const userController=require('../controllers/user.controller')
const SignUp=require('../controllers/SignUp.controller')
const Admin=require('../controllers/SubAdmin.controller')
const middleware = require('../middleware/auth')
const router=express.Router();



router.get("/:id",userController.show)//params
router.post("/getUserByPhone",userController.getUserByPhone)
router.post("/getUserByRole",userController.getUserByRole)
router.post("/getUserByStore",middleware.checkAuth,userController.getUserByStore)
router.get("/",userController.index)
router.put("/:id",userController.update)
router.delete("/:id",userController.destroy)


router.post("/signUpAdmin",Admin.signUpAdmin)
router.post("/loginAdmin",Admin.login)


router.post("/sendOTP",SignUp.sendOTP)
router.post("/verfiyOTP",SignUp.verfiyOTP)
router.post("/signUp",SignUp.signUp)
router.post("/login",SignUp.login)
router.post("/forgotPassword",SignUp.forgotPassword)

module.exports=router