const {StatusCodes} = require("http-status-codes")
const { BadRequestError, UnauthenticatedError} = require('../errors')
const User = require('../models/User')
const register = async (req,res) => {
    const {name,password,email} = req.body
    //input validation, done by mongo and handled in errorhandler.js
    // if(!name || !password || !email){
    //     throw new BadRequestError("Username,email and password are required")
    // }
    //commented lines below are moved to the model pre
    // const salt = await bcrypt.genSalt(10);//generates random string used to enhance the security of the password
    // // hashing process.
    // // The function bcrypt.genSalt() generates a salt with a cost factor of 10,
    // // meaning it performs 2^10 iterations to generate the salt.
    // // The higher the cost factor, the more secure but slower the hashing process becomes.
    // const hashedPassword = await bcrypt.hash(password,salt)
    // const tempUser = {name,email,password:hashedPassword}
    const user = await User.create({...req.body})
    //moved to the user model method
    // const token = jwt.sign({userId:user._id,name:user.name}, process.env.JWT_SECRET,{expiresIn: '30d'})

    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user,
        token
    })

}

const login = async (req,res) => {
    const {email,password} = req.body
    //input validation
    if(!email || !password){
        throw new BadRequestError("Username and password required")
    }
    //Database validation
    const user = await User.findOne({ email })
    if(!user){
        throw new UnauthenticatedError("Invalid Credentials")
    }
    //compare Password

    const doesPasswordMatch = await user.comparePassword(password)
    if(!doesPasswordMatch){
        throw new UnauthenticatedError("Invalid Credentials")
    }
    //make jwt
    const token = user.createJWT()
    return res.status(StatusCodes.OK).json({
        user,
        token
    })
}

const dashboard = async (req,res) => {
    console.log(req.user);

    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
        msg:`Hello,${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    })

}

module.exports = {
    login,
    dashboard,
    register
}