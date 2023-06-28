const CustomAPIError = require('./custom-error')
const {StatusCodes} = require('http-status-codes')
class NotFoundError extends CustomAPIError {
    constructor(message, statusCode = null) {
        super(message)
        this.statusCode = statusCode ?? StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError