const User = require('../models/User')
const {StatusCodes} = require("http-status-codes");
const register = async (req,res) => {
    const {name,password,email,role} = req.body
    const user = await User.create({...req.body})
    res.status(201).json({user})
}