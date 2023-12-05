const orderModel = require("../models/order")
const productModel = require("../models/product");
const { covertPriceVND } = require("../utils/covertPrice");

const { sendEmail } = require("../utils/sendEmail");

exports.getOrders = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const orders = await orderModel.find({ userId: userId })
        // Ch
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId
        const order = await orderModel.findById(orderId).populate('items.productId')
        // Ch
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.addOrder = async (req, res, next) => {
    try {
        // Add order vào database
        const data = req.body
        const order = await orderModel(data)
        await order.save()
        // Chức năng email
        const renderTrHtml = await Promise.all(data.items.map(async p => {
            const product = await productModel.findById(p.productId)
            return `<tr>
            <td>${product.name}</td>
            <td><img src='${product.img1}' width='100' /></td>
            <td>${covertPriceVND(product.price)}</td>
            <td>${p.quantity}</td>
            <td>${covertPriceVND(product.price * p.quantity)}</td>
        </tr>`
        }))
        const html = `
            <p>Phone: ${data.user.phone}</p>
            <p>Address: ${data.user.address}</p>
            <table border="1">
                <thead>
                    <th>Tên Sản Phẩm</th>
                    <th>Hình Ảnh</th>
                    <th>Giá</th>
                    <th>Số Lượng</th>
                    <th>Thanh tiền</th>
                </thead>
                <tbody>
                    ${renderTrHtml.join('')}
                </tbody>
            </table>
            <h2>Tổng Thanh Toán: <br>
            ${covertPriceVND(data.total_price)}
            </h2>
            <h2>Cảm ơn bạn đã mua sản phẩm!</h2>
        `
        sendEmail(data.user.email, `Xin chào ${data.user.fullname}`, html)
            .then(result => {
                res.status(200).json({ message: 'Send Email Susscess' })
            })
            .catch(err => {
                res.status(400).json({ message: 'Send Email Not Susscess' })
            })

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
        console.log(error)
    }
}