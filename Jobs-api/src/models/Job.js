const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*password).{8,}$/;
const JobSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    position:{
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ['interview', 'Pending', 'Declined'],
        default: 'Pending'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true,'Please add user']
    }
},{timestamps:true})


module.exports = mongoose.model('Job',JobSchema)