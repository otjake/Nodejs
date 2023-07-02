const User = require('../models/User')
const register = async (req,res) => {
    const {name,password,email,role} = req.body
    const user = await User.create({...req.body})
    res.status(201).json({user})
}

const login = async (req,res) => {
    console.log("login")
}

const dashboard = async (req,res) => {
    console.log("dashboard")

}

module.exports = {
    login,
    dashboard,
    register
}