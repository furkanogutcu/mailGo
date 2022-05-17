const httpStatus = require('http-status');
const ApiError = require('../responses/error/apiError');

const validate = (schema) => (req, res, next) => {
    //https://stackoverflow.com/questions/58726874/removing-special-characters-from-hapi-joi-error-messages
    const options = {
        errors: { wrap: { label: '\'' } }
    };

    const { error } = schema.validate(req.body, options);
    if (error) {
        return next(new ApiError(error.details[0]?.message, httpStatus.BAD_REQUEST));
    }

    next();
};

module.exports = validate;