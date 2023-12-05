const express = require('express')
// const multer = require('multer');
const router = express.Router()
// const configs = require('../config/multer')
const middlewareToken = require('../middlewares/middlewareToken')
const orderController = require('../controllers/order')

// POST - /order/get/:userId
router.get('/get/:userId', middlewareToken.verifyTokenAreYou, orderController.getOrders)

// POST - /order/getOne/:orderId
router.get('/getOne/:orderId', middlewareToken.verifyTokenAreYou, orderController.getOrder)

// POST - /order/add
router.post('/add', orderController.addOrder)



module.exports = router