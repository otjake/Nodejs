const jwt = require("jsonwebtoken")
const { UnauthenticatedError } = require("../errors");
const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError("No token provided")
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id,username} = decoded
        //put the decoded data into the request
        req.user = {id,username}
        next();
    } catch (error){
        throw new UnauthenticatedError("Not Authorized to access this route")
    }
}

module.exports = authenticationMiddleware