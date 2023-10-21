// app.js
require('dotenv').config()
//async errors
require ('express-async-errors')
const connectDB = require("./db/connect");
const express = require('express');
const authRouter = require('./routes/auth')
const rolesRouter = require('./routes/roles')
const productsRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
const paystackRouter = require('./routes/paystack')
const categoryRouter = require('./routes/category')
const authenticateUserMiddleware = require("./middleware/auth");
const {handleErrors} = require("./middleware/customErrorMiddleware");
const app = express();

//middleware
app.use(express.json())//used for post routes to access body parameters
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/roles', rolesRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/paystack', paystackRouter)
app.use('/api/v1/products', authenticateUserMiddleware, productsRouter)
app.use('/api/v1/cart', authenticateUserMiddleware, cartRouter)
app.use('/api/v1/orders', authenticateUserMiddleware, orderRouter)
app.use(handleErrors);
const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI).then(() => console.log("connected to Db")).catch((err) => console.log(err))
        app.listen(port,()=> console.log("run express on port"+port)) //express listens to actions via the port
    } catch (error){
        console.log(error)
    }
}

start();
