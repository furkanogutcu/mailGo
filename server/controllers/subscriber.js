const Repository = require("./repository/repository");
const SubscriberService = require("../services/subscriber");
const service = new SubscriberService();
const ApiError = require("../responses/error/apiError");
const ApiDataSuccess = require("../responses/success/apiDataSuccess");
const httpStatus = require("http-status");

class Subscriber extends Repository {
    getWithToken = (req, res, next) => {
        const subscriber = req.subscriber;
        service.getById(subscriber._id)
            .then((subscriber) => {
                //FIXME
                const response = {
                    ...subscriber.toObject()
                };
                delete response.password;
                return ApiDataSuccess.send(res, response, 'Subscriber successfully retrieved', httpStatus.OK);
            })
            .catch((error) => {
                return next(new ApiError(error.message, error.code));
            });
    };
}

module.exports = new Subscriber(service);