const jwt = require('jsonwebtoken');

const authenticateUserMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new Error("unauthenticated")
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {userId, name, email} = decoded
        //put the decoded data into the request
        req.user = {userId, name, email}
        next();
    } catch (error){
        throw new Error("Not Authorized to access this route")
    }
}

module.exports = authenticateUserMiddleware