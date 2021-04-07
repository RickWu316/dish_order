const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const foodController = require('../controllers/foodController.js')
const orderController = require('../controllers/orderController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })



// const authenticated = (req, res, next) => {
//     if (helpers.ensureAuthenticated(req)) {
//         return next()
//     }
//     res.redirect('/signin')
// }

const authenticatedAdmin = (req, res, next) => {
    if (req.user) {
        if (req.user.role === "admin") { return next() }
    }
    return res.redirect('/')
    // res.redirect('/signin')
}


//admin
router.get('/admin/foods/:id/create', authenticatedAdmin, adminController.editFood)
router.get('/admin/foods/create', authenticatedAdmin, adminController.editFood)
router.put('/admin/foods/:id', authenticatedAdmin, upload.single('image'), adminController.putFood)
router.delete('/admin/foods/:id', authenticatedAdmin, adminController.deleteFood)
router.post('/admin/foods', authenticatedAdmin, upload.single('image'), adminController.postFood)
router.get('/admin/foods', authenticatedAdmin, adminController.getFoods)

router.put('/admin/orders/:id', authenticatedAdmin, adminController.putOrder)
router.get('/admin/orders', authenticatedAdmin, adminController.getOrders)



router.get('/signin', userController.signInPage)
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

router.post('/orders', orderController.postOrder)
router.get('/orders', orderController.getOrders)
router.get('/', foodController.getFoods)




module.exports = router
