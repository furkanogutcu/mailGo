const httpStatus = require("http-status");
const JWT = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];
    if (token == null) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Access denied' });

    JWT.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (err) return res.status(httpStatus.FORBIDDEN).send({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

module.exports = authentication;