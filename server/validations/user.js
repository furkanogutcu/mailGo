const Joi = require('joi');

const updateValidation = Joi.object({
    firstName: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string().email().min(6).max(255),
    password: Joi.string().min(6).max(100),
    roles: Joi.array().items(Joi.string().required())
});

const deleteValidation = Joi.object({
    _id: Joi.string().required()
});

module.exports = {
    updateValidation,
    deleteValidation
};