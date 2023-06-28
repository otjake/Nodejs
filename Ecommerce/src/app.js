// app.js
require('dotenv').config()
//async errors
require ('express-async-errors')
const connectDB = require("./db/connect");
const express = require('express');
const app = express();

// Add your routes and middleware here

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI).then(() => console.log("connected to Db")).catch((err) => console.log(err))
        app.listen(port,()=> console.log("run express on port 3000")) //express listens to actions via the port

    } catch (error){
        console.log(error)
    }
}

start();
