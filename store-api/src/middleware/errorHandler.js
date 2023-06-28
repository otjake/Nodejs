const {CustomError} = require('../errors/custom-error')
const error = (err,req,res) => {
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({ msg : err.message})
    }

    return res.status(err.status).json({ msg : err.message})
}

module.exports = error