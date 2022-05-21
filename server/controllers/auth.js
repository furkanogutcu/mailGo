const httpStatus = require('http-status');
const authService = require('../services/auth');
const Subscriber = require('../models/subscriber');
const passwordHelper = require('../helpers/password');
const jwtHelper = require('../helpers/jwt');
const UserRole = require('../models/userRole');
const ApiError = require('../responses/error/apiError');
const ApiDataSuccess = require('../responses/success/apiDataSuccess');

const register = async (req, res, next) => {
    //Kullanıcı parolasını hashle
    req.body.password = passwordHelper.passwordToHash(req.body.password);

    //Kullanıcıyı oluştur
    const subscriber = new Subscriber({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    //Kullanıcıyı kaydet
    const registerResult = await authService.register(subscriber).catch((error) => {
        return next(new ApiError(error.message, error.statusCode));
    });
    if (!registerResult) {
        return next(new ApiError('There was a problem registering the user', httpStatus.INTERNAL_SERVER_ERROR));
    }

    const returnSubscriber = await createReturnSubscriber(registerResult).catch(() => { });
    if (!returnSubscriber) {
        return next(new ApiError());
    }

    return ApiDataSuccess.send(res, returnSubscriber, 'Subscriber successfully registered', httpStatus.CREATED);
};

const login = async (req, res, next) => {
    //Kullanıcıyı bul
    const subscriber = await authService.login(req.body.email, req.body.password).catch((error) => {
        return next(new ApiError(error.message, error.statusCode));
    });
    if (!subscriber) {
        return next(new ApiError('There was a problem logging in', httpStatus.INTERNAL_SERVER_ERROR));
    }

    const returnSubscriber = await createReturnSubscriber(subscriber).catch(() => { });
    if (!returnSubscriber) {
        return next(new ApiError());
    }

    return ApiDataSuccess.send(res, returnSubscriber, 'Subscriber successfully logged in', httpStatus.OK);
};

const createReturnSubscriber = async (subscriber) => {
    // Kullanıcıyı yeni bir objeye aktar
    const tokenSubscriberObject = {
        ...subscriber.toObject()
    };

    // Kullanıcının şifresini yeni objeden sil
    delete tokenSubscriberObject.password;

    // Tüm kullanıcı rollerini getir ve token içerisine rol adlarını ekle
    const roles = await UserRole.find({ '_id': { $in: subscriber.roles } }).catch(() => { });
    if (!roles) {
        return null;
    }

    // Kullanıcı rollerini token objesi içerisine ekle
    tokenSubscriberObject.roles = roles.map((role) => role.name);

    // Tokenle birlikte sonucu oluştur ve döndür
    return {
        subscriber: {
            ...tokenSubscriberObject,
            roles: tokenSubscriberObject.roles,
        },
        tokens: {
            access_token: jwtHelper.generateAccessToken(tokenSubscriberObject),
            refresh_token: jwtHelper.generateRefreshToken(tokenSubscriberObject)
        }
    };
};

module.exports = {
    register,
    login
};