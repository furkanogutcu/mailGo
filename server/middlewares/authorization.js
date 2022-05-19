const httpStatus = require('http-status');
const ApiError = require('../responses/error/apiError');

const authorization = (...roles) => (req, res, next) => {
    const userRoles = req.subscriber.roles.map(role => role.toLowerCase());
    const acceptedRoles = roles.map(roleName => roleName.toLowerCase());

    //Kullanıcı rollerinde hiç kabul edilen rollerden birisi var mı?
    const isAuthorized = userRoles.some(role => acceptedRoles.includes(role));
    if (isAuthorized) {
        next();
    } else {
        return next(new ApiError('Not authorized', httpStatus.FORBIDDEN));
    }
};

module.exports = authorization;