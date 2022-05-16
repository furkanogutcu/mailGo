const Joi = require('joi');

const addValidation = Joi.object({
    name: Joi.string().required().min(3).max(50),
    description: Joi.string().min(3).max(600),
});

const updateValidation = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().min(3).max(50),
    description: Joi.string().min(3).max(600)
});

const deleteValidation = Joi.object({
    _id: Joi.string().required()
});

module.exports = {
    addValidation,
    updateValidation,
    deleteValidation
};