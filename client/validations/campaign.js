const Joi = require('joi');

const addValidation = Joi.object({
    name: Joi.string().required().min(3).max(50),
    description: Joi.string().min(3).max(600),
    totalSent: Joi.number().min(0),
    totalClicks: Joi.number().min(0),
    emailClicks: Joi.number().min(0),
    targetLink: Joi.string().required().min(3).max(200),
    category: Joi.string().required()
});

const updateValidation = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().min(3).max(50),
    description: Joi.string().min(3).max(600),
    totalSent: Joi.number().min(0),
    totalClicks: Joi.number().min(0),
    emailClicks: Joi.number().min(0),
    targetLink: Joi.string().min(3).max(200),
    category: Joi.string()
});

const deleteValidation = Joi.object({
    _id: Joi.string().required()
});

module.exports = {
    addValidation,
    updateValidation,
    deleteValidation
};
