// //excuting a custom error class if you dont eant to use the normal one
// class CustomError extends Error{
//     constructor(message,statusCode) {
//         console.log("the message",message)
//         super(message);//this invokes the constructor of the Error class (parent class)
//         this.statusCode = statusCode // creates a statusCode
//     }
// }
//
// const createCustomError = (msg, statusCode) => {
//     return new CustomError(msg, statusCode)
// }
//
// module.exports = { createCustomError , CustomError }

class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

module.exports = CustomAPIError