const httpStatus = require('http-status');
const UserService = require('../services/user');
const service = new UserService();
const ApiError = require('../responses/error/apiError');

const getAll = (req, res, next) => {
    service.getAll()
        .then((result) => {
            res.status(httpStatus.OK).json(result);
        }).catch(() => {
            return next(new ApiError());
        });
};

const getById = (req, res, next) => {
    if (!req.params.userId) {
        return next(new ApiError('User id is required', httpStatus.BAD_REQUEST));
    }

    service.getById(req.params.userId)
        .then((result) => {
            if (!result) {
                return res.status(httpStatus.OK).json({});
            }

            res.status(httpStatus.OK).json(result);
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

            res.status(httpStatus.OK).json(result);
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

            res.status(httpStatus.OK).json({ message: 'User deleted' });
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