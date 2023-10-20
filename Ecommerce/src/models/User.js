const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
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
    verification_code: {
        type: String,
        required: false,
        minLength: 5,
        maxLength: 5,
    },
    verified: {
        type: Boolean,
        default: false
    },
})

UserModel.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);//generates random string used to enhance the security of the password
    this.password = await bcrypt.hash(this.password,salt)
    next()
})


UserModel.methods.createJWT = function (){
    return jwt.sign({userId:this._id,name:this.name,email:this.email}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_LIFETIME
    })
}

UserModel.methods.comparePassword = async function (enteredpassword){
    //compare user db password with enterd password
    const isMatch = await bcrypt.compare(enteredpassword,this.password)
    return isMatch;

}
module.exports = mongoose.model('User',UserModel)