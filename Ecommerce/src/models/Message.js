const mongoose = require('mongoose')

const MessageModel = new mongoose.Schema({
    name:{
        type: String,
        minLength: 3,
        maxlength: 50
    },
    message:{
        type: String
    },
})

module.exports = mongoose.model('Message',MessageModel)