const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
// const helmet = require('helmet')
// const compression = require('compression')
// const morgan = require('morgan')
// const fs = require('fs')
require('dotenv').config();
// Const
const URL_MONGODB = process.env.MONGODB_URL

// Import Router
const productRouters = require('./routers/product')
const authRouters = require('./routers/auth')
const cartRouters = require('./routers/cart')
const orderRouters = require('./routers/order')

// app.use(cookieParser());

// Fix Error CORS
app.use(cors())

// use helmet
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// use morgan
// const accessLogStream = fs.createWriteStream(
//     path.join(__dirname, 'access.log'),
//     { flags: 'a' }
// )
// app.use(morgan('combined', { stream: accessLogStream }))

// use asset compression
// app.use(compression());

// Tăng giới hạn kích thước của body lên 50MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Static
app.use('/images', express.static(path.join(__dirname, 'images')));



// Routers
app.use('/auth', authRouters)
app.use('/product', productRouters)
app.use('/cart', cartRouters)
app.use('/order', orderRouters)

app.use((error, req, res, next) => {
    res.status(500).json(error)
})


mongoose.connect(URL_MONGODB)
    .then((result) => {
        console.log("MongoDB Connect")
        app.listen(process.env.PORT_SERVER || 3001)
        // const server = 
        // const io = require('./config/socket').init(server)
        // io.on('connection', socket => {
        //     console.log("Client connected")
        // })
    })
    .catch(err => {
        throw new Error(err)
    })
