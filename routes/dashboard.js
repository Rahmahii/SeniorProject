const express = require('express')
const dashboardController = require('../controllers/dashboard.controller')
const middleware = require('../middleware/auth')
const router = express.Router();

router.post("/dashboard", dashboardController.countInvoiceInfo)
router.post("/dashboard2",dashboardController.BestProductForStore)

router.post("/dashboard3",  dashboardController.CountProductsforStore)

module.exports = router

