const express=require('express')
const productController=require('../controllers/product.controller')
const router=express.Router();

router.post("/StoreProducts",productController.getProductsBySore)
router.post("/FindProductByBarcode",productController.FindProductByBarcode)


module.exports=router