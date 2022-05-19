const httpStatus = require('http-status');
const authService = require('../services/auth');
const Subscriber = require('../models/subscriber');
const passwordHelper = require('../helpers/password');
const jwtHelper = require('../helpers/jwt');
const UserRole = require('../models/userRole');
const ApiError = require('../responses/error/apiError');
const ApiDataSuccess = require('../responses/success/apiDataSuccess');

const register = (req, res, next) => {
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
    authService.register(subscriber)
        .then((subscriber) => {
            return createReturnSubscriber(subscriber)
                .then((subscriber) => {
                    return ApiDataSuccess.send(res, subscriber, 'Subscriber successfully registered', httpStatus.CREATED);
                });
        }).catch((err) => {
            return next(new ApiError(err?.message, err?.code));   //FIXME: Sistemle alakalı bilgi dönülüyor mu
        });
};

const login = (req, res, next) => {
    //Kullanıcıyı bul
    authService.login(req.body.email, req.body.password)
        .then((subscriber) => {
            return createReturnSubscriber(subscriber)
                .then((subscriber) => {
                    return ApiDataSuccess.send(res, subscriber, 'Subscriber successfully logged in', httpStatus.OK);
                });
        }).catch((err) => {
            return next(new ApiError(err?.message, err?.code));
        });
};

const createReturnSubscriber = (subscriber) => {
    const tokenSubscriberObject = {
        ...subscriber.toObject()
    };
    delete tokenSubscriberObject.password;
    //Tüm kullanıcı rollerini getir ve token içerisine rol adlarını ekle
    return UserRole.find({ '_id': { $in: subscriber.roles } })
        .then((roles) => {
            tokenSubscriberObject.roles = roles.map((role) => role.name);
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
        });
};

module.exports = {
    register,
    login
};