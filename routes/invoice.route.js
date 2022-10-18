const express = require('express')
const invoiceController = require('../controllers/invoice.controller')
const router = express.Router();

router.post("/AddInvoice", invoiceController.create)
router.post("/GetInvoices", invoiceController.getUserInvoices)
router.post("/getStoreInvoices", invoiceController.getStoreInvoices)
router.post("/dashboard", invoiceController.dashboard)
router.post("/dashboard2", invoiceController.dashboard_2)
module.exports = router