const express = require('express')
const cardController = require('../controllers/card.controller')
const middleware = require('../middleware/auth')
const router = express.Router();

router.post("/addCard",middleware.checkAuth ,cardController.create)
router.post("/getUserCards",middleware.checkAuth ,cardController.getUserCards)
router.delete("/deleteCard",middleware.checkAuth ,cardController.destroy)

module.exports = router