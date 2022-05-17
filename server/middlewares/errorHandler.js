const httpStatus = require("http-status");

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR);
    res.json({
        error: {
            message: error.message || "Internal server error",
            code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        }
    });
};

module.exports = errorHandler;