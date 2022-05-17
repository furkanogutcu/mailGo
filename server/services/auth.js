const User = require('../models/user');
const passwordHelper = require('../helpers/password');
const httpStatus = require('http-status');

const register = (user) => {
    return User.create(user)
        .then(user => {
            return Promise.resolve(user);
        }).catch(err => {
            if (err.code === 11000) {
                return Promise.reject({ code: httpStatus.CONFLICT, message: 'Email already exists' });
            }
            return Promise.reject({ code: httpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' });
        });
};

const login = (email, password) => {
    return User.findOne({
        email: email
    }).then(user => {
        if (!user) {
            return Promise.reject({ code: httpStatus.BAD_REQUEST, message: 'Email or password is incorrect' });
        }
        if (!passwordHelper.validatePassword(password, user.password)) {
            return Promise.reject({ code: httpStatus.BAD_REQUEST, message: 'Email or password is incorrect' });
        }
        return Promise.resolve(user);
    });
};

module.exports = {
    register,
    login
};