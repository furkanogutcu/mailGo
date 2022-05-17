const httpStatus = require('http-status');
const SubscriberService = require('../services/subscriber');
const service = new SubscriberService();
const ApiError = require('../responses/error/apiError');
const ApiDataSuccess = require('../responses/success/apiDataSuccess');

const getAll = (req, res, next) => {
    service.getAll()
        .then((result) => {
            return ApiDataSuccess.send(res, result, 'Subscribers successfully retrieved', httpStatus.OK);
        }).catch(() => {
            return next(new ApiError());
        });
};

const getById = (req, res, next) => {
    if (!req.params.subscriberId) {
        return next(new ApiError('Subscriber id is required', httpStatus.BAD_REQUEST));
    }

    service.getById(req.params.subscriberId)
        .then((result) => {
            if (!result) {
                return next(new ApiError('Subscriber not found', httpStatus.NOT_FOUND));
            }

            return ApiDataSuccess.send(res, result, 'Subscriber successfully retrieved', httpStatus.OK);
        }).catch(() => {
            return next(new ApiError());
        });
};

const add = (req, res, next) => {
    service.create(req.body)
        .then((result) => {
            return ApiDataSuccess.send(res, result, 'Subscriber successfully created', httpStatus.CREATED);
        }).catch(() => {
            return next(new ApiError());
        });
};

const update = (req, res, next) => {
    service.update(req.body._id, req.body)
        .then((result) => {
            if (!result) {
                return next(new ApiError('Subscriber not found', httpStatus.NOT_FOUND));
            }

            return ApiDataSuccess.send(res, result, 'Subscriber successfully updated', httpStatus.OK);
        }).catch(() => {
            return next(new ApiError());
        });
};

const deleteById = (req, res, next) => {
    service.delete(req.body._id)
        .then((result) => {
            if (!result) {
                return next(new ApiError('Subscriber not found', httpStatus.NOT_FOUND));
            }

            return ApiDataSuccess.send(res, result, 'Subscriber successfully deleted', httpStatus.OK);
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