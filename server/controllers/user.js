const httpStatus = require('http-status');
const UserService = require('../services/user');
const service = new UserService();
const ApiError = require('../responses/error/apiError');
const ApiDataSuccess = require('../responses/success/apiDataSuccess');

const getAll = (req, res, next) => {
    service.getAll()
        .then((result) => {
            return ApiDataSuccess.send(res, result, 'Users successfully retrieved', httpStatus.OK);
        }).catch(() => {
            return next(new ApiError());
        });
};

const getById = (req, res, next) => {
    service.getById(req.params.id)
        .then((result) => {
            if (!result) {
                return next(new ApiError('User not found', httpStatus.NOT_FOUND));
            }

            return ApiDataSuccess.send(res, result, 'User successfully retrieved', httpStatus.OK);
        }).catch(() => {
            return next(new ApiError());
        });
};

const update = (req, res, next) => {
    service.update(req.body._id, req.body)
        .then((result) => {
            if (!result) {
                return next(new ApiError('User not found', httpStatus.NOT_FOUND));
            }

            return ApiDataSuccess.send(res, result, 'User successfully updated', httpStatus.OK);
        }).catch(() => {
            return next(new ApiError());
        });
};

const deleteById = (req, res, next) => {
    service.delete(req.body._id)
        .then((result) => {
            if (!result) {
                return next(new ApiError('User not found', httpStatus.NOT_FOUND));
            }

            return ApiDataSuccess.send(res, result, 'User successfully deleted', httpStatus.OK);
        }).catch(() => {
            return next(new ApiError());
        });
};

module.exports = {
    getAll,
    getById,
    update,
    deleteById
};