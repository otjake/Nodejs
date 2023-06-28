const jwt = require("jsonwebtoken")
const { UnauthenticatedError } = require("../errors");
const User = require('../models/User')

const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError("Invalid authentication")
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {userId,name} = decoded
        //put the decoded data into the request
        req.user = {userId, name}
        next();
    } catch (error){
        throw new UnauthenticatedError("Not Authorized to access this route")
    }
}

module.exports = authenticationMiddleware