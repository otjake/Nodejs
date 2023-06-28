require('dotenv').config()
//async errors
require ('express-async-errors')
const express = require('express');
const app = express();
const connectDB = require("./db/connect");
const productRoutes = require('./routes/product')
const notFoundMiddleware = require('./middleware/notFound')
const errorMiddleware = require('./middleware/errorHandler')


//middleware
app.use(express.json())

//routes
// app.get('/',(req,res) => {
//     res.send('<h1>store api tetstsisssg</h1>')
// })

//product routes
app.use('/api/v1/products',productRoutes)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI).then(() => console.log("connected to Db")).catch((err) => console.log(err))
        app.listen(port,()=> console.log("run express on port 3000")) //express listens to actions via the port

    } catch (error){
        console.log(error)
    }
}

start()