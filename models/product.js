const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    img1: {
        type: String,
        required: true,
    },
    img2: {
        type: String,
    },
    img3: {
        type: String,
    },
    img4: {
        type: String,
    },
    long_desc: {
        type: String,
        required: true,
    },
    short_desc: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

// Tạo model từ schema
const productModel = mongoose.model('Product', productSchema);

// Xuất model để sử dụng trong ứng dụng của bạn
module.exports = productModel;