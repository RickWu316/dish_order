const express = require('express')
const router = express.Router()
const foodController = require('../controllers/foodController.js')
const orderController = require('../controllers/orderController.js')
const adminController = require('../controllers/adminController.js')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })



//admin
router.get('/admin/foods/:id/create', adminController.editFood)
router.get('/admin/foods/create', adminController.editFood)
router.put('/admin/foods/:id', upload.single('image'), adminController.putFood)
router.delete('/admin/foods/:id', adminController.deleteFood)
router.post('/admin/foods', upload.single('image'), adminController.postFood)
router.get('/admin/foods', adminController.getFoods)

router.put('/admin/orders/:id', adminController.putOrder)
router.get('/admin/orders', adminController.getOrders)


// root
router.post('/order', orderController.postOrder)
router.get('/', foodController.getFoods)




module.exports = router