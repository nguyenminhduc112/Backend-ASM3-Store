// Import Modal 
const productModel = require('../models/product')

exports.getProducts = async (req, res, next) => {
    try {
        const products = await productModel.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const product = await productModel.findById(productId)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

