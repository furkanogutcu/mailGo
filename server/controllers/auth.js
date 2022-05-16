const httpStatus = require('http-status');
const authService = require('../services/auth');
const User = require('../models/user');
const passwordHelper = require('../helpers/password');
const jwtHelper = require('../helpers/jwt');
const UserRole = require('../models/userRole');

const register = (req, res) => {
    //Kullanıcı parolasını hashle
    req.body.password = passwordHelper.passwordToHash(req.body.password);

    //Kullanıcıyı oluştur
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    //Kullanıcıyı kaydet
    authService.register(user)
        .then((user) => {
            createReturnUser(user)
                .then((user) => {
                    return res.status(httpStatus.CREATED).json(user);
                }).catch(() => {
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
                });
        }).catch((err) => {
            return res.status(err.code || httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message || 'Internal server error' });
        });
};

const login = (req, res) => {
    //Kullanıcıyı bul
    authService.login(req.body.email, req.body.password)
        .then((user) => {
            createReturnUser(user)
                .then((user) => {
                    return res.status(httpStatus.OK).json(user);
                }).catch(() => {
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
                });
        }).catch((err) => {
            return res.status(err.code || httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message || 'Internal server error' });
        });
};

const createReturnUser = (user) => {
    const tempUser = {
        ...user.toObject()
    };
    delete tempUser.password;

    //Tüm kullanıcı rollerini getir ve token içerisine rol adlarını ekle
    return UserRole.find({ '_id': { $in: user.roles } })
        .then((roles) => {
            tempUser.roles = roles.map((role) => role.name);
            return {
                ...tempUser,
                roles: tempUser.roles,
                tokens: {
                    access_token: jwtHelper.generateAccessToken(tempUser),
                    refresh_token: jwtHelper.generateRefreshToken(tempUser)
                }
            };
        });
};

module.exports = {
    register,
    login
};