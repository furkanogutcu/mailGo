const httpStatus = require('http-status');
const UserService = require('../services/user');
const service = new UserService();

const getAll = (req, res) => {
    service.getAll()
        .then((result) => {
            res.status(httpStatus.OK).json(result);
        }).catch(() => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        });
};

const getById = (req, res) => {
    if (!req.params.userId) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: 'User id is required' });
    }

    service.getById(req.params.userId)
        .then((result) => {
            if (!result) {
                return res.status(httpStatus.OK).json({});
            }

            res.status(httpStatus.OK).json(result);
        }).catch(() => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        });
};

const update = (req, res) => {
    service.update(req.body._id, req.body)
        .then((result) => {
            if (!result) {
                return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
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
                return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
            }

            res.status(httpStatus.OK).json({ message: 'User deleted' });
        }).catch(() => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        });
};

module.exports = {
    getAll,
    getById,
    update,
    deleteById
};