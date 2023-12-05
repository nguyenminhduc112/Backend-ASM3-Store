const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    cart: {
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true }
            }
        ]
    },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

// Add and Update Cart
userSchema.methods.updatedToCart = function (productID, quantity = 1) {
    // Find index product in cart
    const index = this.cart.items.findIndex(productCart => {
        return productCart.productId.toString() === productID.toString()
    })
    // Init quantity and cartItems
    let newQuantity = quantity
    const updatedCartItems = [...this.cart.items]
    // Check index product in cart have insset
    if (index >= 0) {
        newQuantity = this.cart.items[index].quantity + quantity
        updatedCartItems[index].quantity = newQuantity
    } else {
        updatedCartItems.push({ productId: productID, quantity: newQuantity })
    }
    // Updated items in cart
    const updatedCart = { items: updatedCartItems };
    // Updated on mongoDB
    this.cart = updatedCart
    return this.save()

}
// Delete Cart
userSchema.methods.deleteCart = function (prodId) {
    const updatedCartItems = this.cart.items.filter(productCart => {
        return productCart.productId.toString() !== prodId.toString()
    })
    const updatedCart = { items: updatedCartItems }
    return this.updateOne({ cart: updatedCart }).then((result) => {
        return result
    }).catch(err => console.log(err))
}

// Tạo model từ schema
const userModel = mongoose.model('User', userSchema);

// Xuất model để sử dụng trong ứng dụng của bạn
module.exports = userModel;