const express = require('express')
const categoryController = require('../controllers/category.controller')
const middleware = require('../middleware/auth')
const router = express.Router();

router.get("/getAllCategories",categoryController.index)

module.exports = router