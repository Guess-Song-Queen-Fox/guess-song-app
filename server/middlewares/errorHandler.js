function errorHandler (err, req, res, next) {

    let statusCode = null
    let errorCode = null
    let message = null

    switch (err.name) {
        // case "NOT_FOUND_ERROR":
        //     statusCode = err.name
        //     errorCode = err.code || 404
        //     message = err.message || "Not found error"
        //     break
        default:
            statusCode = "INTERNAL_SERVER_ERROR"
            errorCode = 500
            message = "Internal Server Error"
            break;
    }

    res.status(errorCode).json({statusCode, message})

}

module.exports = errorHandler