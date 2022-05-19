const Joi = require('joi');

const addValidation = Joi.object({
    firstName: Joi.string().required().min(3).max(50),
    lastName: Joi.string().required().min(3).max(50),
    email: Joi.string().required().email().min(3).max(50),
    password: Joi.string().required().min(6).max(100)
        //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,100}$')),
    analysis: Joi.object({
        totalCampaignClicks: Joi.number().min(0),
        totalNumberOfEmailSent: Joi.number().min(0)
    }),
    subscribedCategories: Joi.array().items(Joi.object().keys({
        category: Joi.string().required(),
        subscriptionDate: Joi.date().required()
    })),
    roles: Joi.array().items(Joi.string().required())
});

const updateValidation = Joi.object({
    _id: Joi.string().required(),
    firstName: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string().min(3).email().max(50),
    password: Joi.string().min(6).max(100)
        //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,100}$')),
    analysis: Joi.object({
        totalCampaignClicks: Joi.number().min(0),
        totalNumberOfEmailSent: Joi.number().min(0)
    }),
    subscribedCategories: Joi.array().items(Joi.object().keys({
        category: Joi.string().required(),
        subscriptionDate: Joi.date().required()
    })),
    roles: Joi.array().items(Joi.string().required())
});

const deleteValidation = Joi.object({
    _id: Joi.string().required()
});

const subscribeValidation = Joi.object({
    categories: Joi.array().items(Joi.string().required()).required()
});

const unSubscribeValidation = Joi.object({
    categories: Joi.array().items(Joi.string().required()).required()
});

module.exports = {
    addValidation,
    updateValidation,
    deleteValidation,
    subscribeValidation,
    unSubscribeValidation
};