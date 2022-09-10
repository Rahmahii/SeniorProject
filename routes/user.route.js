const express=require('express')
const userController=require('../controllers/user.controller')
const SignUp=require('../controllers/SignUp.controller')
const router=express.Router();


router.get("/:id",userController.show)//params
router.post("/getUserByPhone",userController.getUserByPhone)
router.get("/",userController.index)
router.put("/:id",userController.update)
router.delete("/:id",userController.destroy)

router.post("/sendOTP",SignUp.sendOTP)
router.post("/verfiyOTP",SignUp.verfiyOTP)
router.post("/signUp",SignUp.signUp)
router.post("/login",SignUp.login)
router.post("/forgotPassword",SignUp.forgotPassword)

module.exports=router