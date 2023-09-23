// customErrorMiddleware.js

function handleErrors(err, req, res, next) {
    if (err.name === 'ValidationError') {
        const errorMessages = Object.values(err.errors).map((error) => error.message);
        return res.status(400).json({ errors: errorMessages });
    }
    next(err); // Pass the error to the next error-handling middleware
}

module.exports = { handleErrors };
