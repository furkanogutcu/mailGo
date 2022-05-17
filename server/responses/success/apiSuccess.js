const httpStatus = require("http-status");

class ApiSuccess {
    static send(res, message, statusCode) {
        return res.status(statusCode || httpStatus.OK).json({
            'message': message,
            'success': true,
            'code': statusCode || httpStatus.OK
        });
    }
}

module.exports = ApiSuccess;