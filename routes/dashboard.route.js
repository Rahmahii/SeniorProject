const express = require('express')
const dashboardController = require('../controllers/dashboard.controller')
const middleware = require('../middleware/auth')
const router = express.Router();

router.post("/dashboard", middleware.checkAuth, dashboardController.countInvoiceInfo)
router.post("/dashboard2", middleware.checkAuth, dashboardController.bestProductForStore)

router.post("/dashboard3", middleware.checkAuth, dashboardController.CountProductsforStore)

router.post("/dashboard4", dashboardController.countInvoicesDate)
router.post("/dashboard5", dashboardController.bestMethod)

module.exports = router

