const CustomAPIError = require('./custom-error')
const {StatusCodes} = require('http-status-codes')

class Unauthenticated extends CustomAPIError {
    constructor(message, statusCode = null) {
        super(message)
        this.statusCode = statusCode?? StatusCodes.UNAUTHORIZED
    }
}

module.exports = Unauthenticated