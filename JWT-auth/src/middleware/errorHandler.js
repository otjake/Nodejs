const {CustomError} = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')
const error = (err,req,res) => {
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({ msg : err.message})
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg : err.message})
}

module.exports = error