const {CustomAPIError} = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')
// const error = (err,req,res) => {
//     if(err instanceof CustomAPIError){
//         return res.status(err.statusCode).json({ msg : err.message})
//     }
//
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg : err.message})
// }

const error = (err,req,res,next) => {
    console.log("errr",err)
    let customError = {
        // set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
        customError.statusCode = 400
    }
    //11000 is the code send by mongo for duplicate error
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`
        customError.statusCode = 400
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = 404
    }

    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = error