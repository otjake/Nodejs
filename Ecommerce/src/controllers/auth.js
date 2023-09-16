const { validationResult } = require('express-validator');
const User = require('../models/User')
const Product = require('../models/Product')
const {sendTestEmail} = require("../middleware/mail");
const path = require("path");
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Handling validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Creating a new user using the validated request body
        const { email } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(402).json({ error:'Email already exist' });
        }

        const user = await User.create({ ...req.body });
        //mail user on reg, could also hold email verification token
        const templatePath = path.join(__dirname, '..', '..' , 'views', 'mailTemplate/welcomeMail.ejs');
        await sendTestEmail(user,templatePath);
        // Sending the response with the created user
        return res.status(201).json({ user });
    } catch (error) {
        // Handling database or server errors
        return res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
}

const login = async (req,res) => {
    //input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Handling validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body
    //Database validation
    const user = await User.findOne({ email }).populate('role')
    if(!user){
        throw new Error("Invalid Credentials")
    }
    //compare Password

    const doesPasswordMatch = await user.comparePassword(password)
    if(!doesPasswordMatch){
        throw new Error("Invalid Credentials")
    }
    //make jwt
    const token = user.createJWT()
    return res.status(200).json({
        user,
        token
    })
}

const dashboard = async (req,res) => {
    const products = await Product.find()
    return res.status(200).json({
        products
    })

}

module.exports = {
    login,
    dashboard,
    register
}