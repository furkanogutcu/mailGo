const Subscriber = require('../models/subscriber');
const passwordHelper = require('../helpers/password');
const httpStatus = require('http-status');

const register = (subscriber) => {
    return Subscriber.create(subscriber)
        .then(subscriber => {
            return Promise.resolve(subscriber);
        }).catch(err => {
            if (err.code === 11000) {
                return Promise.reject({ code: httpStatus.CONFLICT, message: 'Email already exists' });
            }
            return Promise.reject({ code: httpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' });
        });
};

const login = (email, password) => {
    return Subscriber.findOne({
        email: email
    }).then(subscriber => {
        if (!subscriber) {
            return Promise.reject({ code: httpStatus.BAD_REQUEST, message: 'Email or password is incorrect' });
        }
        if (!passwordHelper.validatePassword(password, subscriber.password)) {
            return Promise.reject({ code: httpStatus.BAD_REQUEST, message: 'Email or password is incorrect' });
        }
        return Promise.resolve(subscriber);
    });
};

module.exports = {
    register,
    login
};