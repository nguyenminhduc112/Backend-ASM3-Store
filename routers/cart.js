const express = require('express')
// const multer = require('multer');
const router = express.Router()
// const configs = require('../config/multer')
const middlewareToken = require('../middlewares/middlewareToken')
const cartController = require('../controllers/cart')

// GET - /cart/get/:userId
router.get('/get/:userId', middlewareToken.verifyToken, cartController.getCart)

// POST - /cart/update/:userId
router.post('/update/:userId', middlewareToken.verifyToken, cartController.updateCart)

// DELETE - /cart/delete/:userId
router.delete('/delete/:userId', middlewareToken.verifyToken, cartController.deleteCart)


module.exports = router