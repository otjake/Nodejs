// import mongoose from "mongoose";
const mongoose = require('mongoose')
//create connection to mongoose DB
const connectString = 'mongodb+srv://nodeClasses:12345@cluster0.r1tfh.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority'
// 12345
mongoose.connect(connectString)
    .then(() => console.log("connected to Db"))
    .catch((err) => console.log(err))