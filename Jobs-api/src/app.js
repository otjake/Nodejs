require('dotenv').config()
//async errors
require ('express-async-errors')

const express = require('express');
const app = express();
const connectDB = require("./db/connect");
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')
const notFoundMiddleware = require('./middleware/notFound')
const errorMiddleware = require('./middleware/errorHandler')
const authernticateUser = require("./middleware/auth")


//middleware
app.use(express.json())//used for post routes to acess body parameters

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authernticateUser,jobRouter)

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