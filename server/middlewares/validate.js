const httpStatus = require('http-status');

const validate = (schema) => (req, res, next) => {
    //https://stackoverflow.com/questions/58726874/removing-special-characters-from-hapi-joi-error-messages
    const options = {
        errors: { wrap: { label: '\'' } }
    };
    
    const { error } = schema.validate(req.body, options);
    if (error) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0]?.message });
    }

    return next();
};

module.exports = validate;