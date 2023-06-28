const mongoose = require('mongoose')
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*password).{8,}$/;
const UserModel = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        match : [emailRegex,'Please provide a valid email']
    },
    password: {
        type: String,
        required: true,
        match: [passwordRegex, 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.']
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
})

module.exports = mongoose.model('User',UserModel)