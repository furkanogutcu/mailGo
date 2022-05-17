const httpStatus = require('http-status');
const mongoose = require('mongoose');
const ApiError = require('../responses/error/apiError');

const mongoDbIdChecker = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params?.id)) {
        return next(new ApiError('Invalid Id', httpStatus.BAD_REQUEST));
    }
    next();
};

module.exports = mongoDbIdChecker;