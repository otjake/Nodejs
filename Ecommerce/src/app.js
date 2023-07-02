// app.js
require('dotenv').config()
//async errors
require ('express-async-errors')
const connectDB = require("./db/connect");
const express = require('express');
const authRouter = require('./routes/auth')
const rolesRouter = require('./routes/roles')
const app = express();

// Add your routes and middleware here

//middleware
app.use(express.json())//used for post routes to acess body parameters

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/roles', rolesRouter)
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
