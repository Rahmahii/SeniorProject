const express = require('express')
const invoiceController = require('../controllers/invoice.controller')
const middleware = require('../middleware/auth')
const router = express.Router();

router.post("/AddInvoice", invoiceController.create)
router.post("/GetInvoices", invoiceController.getUserInvoices)
router.post("/getUserStoreInvoices", middleware.checkAuth ,invoiceController.getUserStoreInvoices)
router.post("/getStoreInvoices",middleware.checkAuth ,invoiceController.getStoreInvoices)
router.post("/dashboard", middleware.checkAuth,invoiceController.dashboard)
router.post("/dashboard2", middleware.checkAuth, invoiceController.dashboard_2)
module.exports = router