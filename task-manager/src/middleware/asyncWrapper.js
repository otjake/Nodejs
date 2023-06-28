//it take the function as a arguent processs and returns errors from one place
//reducing the need to add try catch all over our controllrt logics
const asyncWrapper = (fn) => {
   return async (req, res, next) => {
        try {
            await fn(req,res,next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper