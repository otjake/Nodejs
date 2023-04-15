const mongoose = require('mongoose')
//create connection to mongoose DB
// import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/youtube-express')
    .then(() => console.log("connected to Db"))
    .catch((err) => console.log(err))