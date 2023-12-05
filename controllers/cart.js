const userModel = require("../models/user")

exports.getCart = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const cart = await userModel.findById(userId).select('cart')
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.updateCart = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const productId = req.body.productId
        const quantity = req.body.quantity
        const cart = await userModel.findById(userId)
        await cart.updatedToCart(productId, quantity)
        res.status(200).json({ message: 'Updated cart!' })
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deleteCart = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const productId = req.body.productId
        const cart = await userModel.findById(userId)
        await cart.deleteCart(productId)
        res.status(200).json({ message: 'Deleted cart!' })
    } catch (error) {
        res.status(500).json(error)
    }
}