const httpStatus = require('http-status');
const SubscriberService = require('../services/subscriber');
const service = new SubscriberService();

const getAll = (req, res) => {
    service.getAll()
        .then((result) => {
            res.status(httpStatus.OK).json(result);
        }).catch(() => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        });
};

const getById = (req, res) => {
    if (!req.params.subscriberId) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: 'Subscriber id is required' });
    }

    service.getById(req.params.subscriberId)
        .then((result) => {
            if (!result) {
                return res.status(httpStatus.OK).json({});
            }

            res.status(httpStatus.OK).json(result);
        }).catch(() => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        });
};

const add = (req, res) => {
    service.create(req.body)
        .then((result) => {
            res.status(httpStatus.OK).json(result);
        }).catch(() => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        });
};

const update = (req, res) => {
    service.update(req.body._id, req.body)
        .then((result) => {
            if (!result) {
                return res.status(httpStatus.NOT_FOUND).json({ message: 'Subscriber not found' });
            }

            res.status(httpStatus.OK).json(result);
        }).catch(() => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        });
};

const deleteById = (req, res) => {
    service.delete(req.body._id)
        .then((result) => {
            if (!result) {
                return res.status(httpStatus.NOT_FOUND).json({ message: 'Subscriber not found' });
            }

            res.status(httpStatus.OK).json({ message: 'Subscriber deleted' });
        }).catch(() => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        });
};

module.exports = {
    getAll,
    getById,
    add,
    update,
    deleteById
};