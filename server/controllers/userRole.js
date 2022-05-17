const httpStatus = require('http-status');
const UserRoleService = require('../services/userRole');
const service = new UserRoleService();
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
    if (!req.params.userRoleId) {
        return next(new ApiError('User role id is required', httpStatus.BAD_REQUEST));
    }

    service.getById(req.params.userRoleId)
        .then((result) => {
            if (!result) {
                return res.status(httpStatus.OK).json({});
            }

            res.status(httpStatus.OK).json(result);
        }).catch(() => {
            return next(new ApiError());
        });
};

const add = (req, res, next) => {
    service.create(req.body)
        .then((result) => {
            res.status(httpStatus.OK).json(result);
        }).catch(() => {
            return next(new ApiError());
        });
};

const update = (req, res, next) => {
    service.update(req.body._id, req.body)
        .then((result) => {
            if (!result) {
                return next(new ApiError('User role not found', httpStatus.NOT_FOUND));
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
                return next(new ApiError('User role not found', httpStatus.NOT_FOUND));
            }

            res.status(httpStatus.OK).json({ message: 'User role deleted' });
        }).catch(() => {
            return next(new ApiError());
        });
};

module.exports = {
    getAll,
    getById,
    add,
    update,
    deleteById
};