const Joi = require('joi');

const addValidation = Joi.object({
    firstName: Joi.string().required().min(3).max(50),
    lastName: Joi.string().required().min(3).max(50),
    email: Joi.string().required().min(3).max(50),
    isSubscribed: Joi.boolean(),
    analysis: Joi.object({
        totalCampaignClicks: Joi.number().min(0),
        totalNumberOfEmailSSent: Joi.number().min(0)
    }),
    subscribedCategories: Joi.array().items(Joi.string())
});

const updateValidation = Joi.object({
    _id: Joi.string().required(),
    firstName: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string().min(3).max(50),
    isSubscribed: Joi.boolean(),
    unSubscribedAt: Joi.boolean().min(Joi.ref('createdAt')).max(Date.now()),
    analysis: Joi.object({
        totalCampaignClicks: Joi.number().min(0),
        totalNumberOfEmailSSent: Joi.number().min(0)
    }),
    subscribedCategories: Joi.array().items(Joi.string())
});

const deleteValidation = Joi.object({
    _id: Joi.string().required()
});

module.exports = {
    addValidation,
    updateValidation,
    deleteValidation
};