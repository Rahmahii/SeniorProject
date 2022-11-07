const express = require('express')
const invoiceController = require('../controllers/invoice.controller')
const middleware = require('../middleware/auth')
const router = express.Router();

router.post("/AddInvoice",middleware.checkAuth , invoiceController.create)
router.post("/getUserInvoices",middleware.checkAuth , invoiceController.getUserInvoices)
router.post("/getUserStoreInvoices", middleware.checkAuth ,invoiceController.getUserStoreInvoices)
router.post("/getStoreInvoices",middleware.checkAuth ,invoiceController.getStoreInvoices)
router.post("/getInvoice",middleware.checkAuth ,invoiceController.getInvoice)
router.put("/cashIsPaid",invoiceController.cashIsPaid)


module.exports = router