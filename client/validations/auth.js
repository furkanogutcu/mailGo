/* eslint-disable prefer-regex-literals */
const Joi = require('joi');

export const registerSchema = Joi.object({
    firstName: Joi.string().required().min(3).max(50),
    lastName: Joi.string().required().min(3).max(50),
    // https://github.com/hapijs/hapi/issues/4059
    email: Joi.string().required().email({ tlds: { allow: false } }).min(6).max(255),
    password: Joi.string().required().min(6).max(100),
    repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password');

export const loginSchema = Joi.object({
    // https://github.com/hapijs/hapi/issues/4059
    email: Joi.string().required().email({ tlds: { allow: false } }).min(6).max(255),
    password: Joi.string().required().min(6).max(100),
});
