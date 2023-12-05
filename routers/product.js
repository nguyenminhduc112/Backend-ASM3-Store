const express = require('express')
// const multer = require('multer');
const router = express.Router()
// const configs = require('../config/multer')

const feedController = require('../controllers/product')
const middlewareToken = require('../middlewares/middlewareToken')
// const upload = multer({ storage: configs.storageMulter, fileFilter: configs.fileFilter });
// GET - /product/getList
router.get('/getList', feedController.getProducts)

// GET - /product/admin/getList
router.get('/admin/getList', middlewareToken.verifyTokenAdmin, feedController.getProducts)

// GET - /product/:productId
router.get('/getOne/:productId', feedController.getProduct)


module.exports = router