const httpStatus = require('http-status');
const UserRoleService = require('../services/userRole');
const service = new UserRoleService();
const ApiError = require('../responses/error/apiError');
const ApiDataSuccess = require('../responses/success/apiDataSuccess');

const getAll = (req, res, next) => {
    service.getAll()
        .then((result) => {
            return ApiDataSuccess.send(res, result, 'User roles successfully retrieved', httpStatus.OK);
        }).catch(() => {
            return next(new ApiError());
        });
};

const getById = (req, res, next) => {
    service.getById(req.params.id)
        .then((result) => {
            if (!result) {
                return next(new ApiError('User role not found', httpStatus.NOT_FOUND));
            }

            return ApiDataSuccess.send(res, result, 'User role successfully retrieved', httpStatus.OK);
        }).catch(() => {
            return next(new ApiError());
        });
};

const add = (req, res, next) => {
    service.create(req.body)
        .then((result) => {
            return ApiDataSuccess.send(res, result, 'User role successfully created', httpStatus.CREATED);
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

            return ApiDataSuccess.send(res, result, 'User role successfully updated', httpStatus.OK);
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

            return ApiDataSuccess.send(res, result, 'User role successfully deleted', httpStatus.OK);
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