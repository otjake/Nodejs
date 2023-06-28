// import mongoose from "mongoose";
const mongoose = require('mongoose')
//create connection to mongoose DB

const connectDB = (url) => {
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB;