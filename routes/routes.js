const express = require('express')
const router = express.Router()
const foodController = require('../controllers/foodController.js')

// root
router.get('/', foodController.getfoods)

module.exports = router