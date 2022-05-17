const httpStatus = require("http-status");

class ApiDataSuccess {
    static send(res, data, message, statusCode) {
        return res.status(statusCode || httpStatus.OK).json({
            'data': data,
            'message': message,
            'success': true,
            'code': statusCode || httpStatus.OK
        });
    }
}

module.exports = ApiDataSuccess;