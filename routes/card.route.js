const express = require('express')
const cardController = require('../controllers/card.controller')
const middleware = require('../middleware/auth')
const router = express.Router();

router.post("/addCard",cardController.create)
router.post("/getUserCards",cardController.getUserCards)
router.delete("/deleteCard",cardController.destroy)

module.exports = router