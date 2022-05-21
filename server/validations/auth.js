const Joi = require('joi');

const registerValidation = Joi.object({
    firstName: Joi.string().required().min(3).max(50),
    lastName: Joi.string().required().min(3).max(50),
    email: Joi.string().required().email().min(6).max(255),
    password: Joi.string().required().min(6).max(100),
    repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password');

const loginValidation = Joi.object({
    email: Joi.string().required().email().min(6).max(255),
    password: Joi.string().required().min(6).max(100),
});

module.exports = {
    registerValidation,
    loginValidation
};