const httpStatus = require('http-status');
const authService = require('../services/auth');
const User = require('../models/user');
const passwordHelper = require('../helpers/password');

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
        .then((result) => {
            res.status(httpStatus.CREATED).json(result);
        }).catch((err) => {
            return res.status(err.code).json({ message: err.message });
        });
};

const login = (req, res) => {
    //Kullanıcıyı bul
    authService.login(req.body.email, req.body.password)
        .then((result) => {
            return res.status(httpStatus.OK).json(result);
        }).catch((err) => {
            return res.status(err.code).json({ message: err.message });
        });
};

module.exports = {
    register,
    login
};