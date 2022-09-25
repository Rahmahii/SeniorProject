const express=require('express')
const storeController=require('../controllers/store.controller')
const router=express.Router();

router.get("/",storeController.index)
router.post("/AddStore",storeController.create)
router.post("/findNearest",storeController.findNearest)

module.exports=router