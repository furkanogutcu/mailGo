const httpStatus = require("http-status");
const JWT = require('jsonwebtoken');
const ApiError = require('../responses/error/apiError');

const authentication = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];
    if (token == null) return next(new ApiError('Access denied', httpStatus.UNAUTHORIZED));

    JWT.verify(token, process.env.JWT_ACCESS_SECRET, (err, data) => {
        if (err) return next(new ApiError('Invalid token', httpStatus.FORBIDDEN));
        req.user = data.user;
        next();
    });
};

module.exports = authentication;