const express = require('express')
const invoiceController = require('../controllers/invoice.controller')
const router = express.Router();

router.post("/AddInvoice", invoiceController.create)
router.post("/GetInvoices", invoiceController.getUserInvoices)
module.exports = router