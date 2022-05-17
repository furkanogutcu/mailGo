const httpStatus = require('http-status');
const authService = require('../services/auth');
const User = require('../models/user');
const passwordHelper = require('../helpers/password');
const jwtHelper = require('../helpers/jwt');
const UserRole = require('../models/userRole');
const ApiError = require('../responses/error/apiError');

const register = (req, res, next) => {
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
            return createReturnUser(user)
                .then((user) => {
                    return res.status(httpStatus.CREATED).json(user);
                });
        }).catch((err) => {
            return next(new ApiError(err?.message, err?.code));   //FIXME: Sistemle alakalı bilgi dönülüyor mu
        });
};

const login = (req, res, next) => {
    //Kullanıcıyı bul
    authService.login(req.body.email, req.body.password)
        .then((user) => {
            return createReturnUser(user)
                .then((user) => {
                    return res.status(httpStatus.OK).json(user);
                });
        }).catch((err) => {
            return next(new ApiError(err?.message, err?.code));
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