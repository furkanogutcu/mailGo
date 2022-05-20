const Repository = require("./repository/repository");
const CategoryService = require("../services/category");
const service = new CategoryService();
const ApiError = require("../responses/error/apiError");
const ApiDataSuccess = require("../responses/success/apiDataSuccess");
const httpStatus = require("http-status");

class Category extends Repository {
    getSubscriberCount = (req, res, next) => {
        const id = req.params.id;
        service.getSubscriberCount(id)
            .then(count => {
                return ApiDataSuccess.send(res, count, 'Number of subscribers subscribed to category successfully received', httpStatus.OK);
            })
            .catch(error => {
                return next(new ApiError(error.message, error.code));
            });
    };

    getCampaignCount = (req, res, next) => {
        const id = req.params.id;
        service.getCampaignCount(id)
            .then(count => {
                return ApiDataSuccess.send(res, count, 'Number of campaigns belonging to the category was successfully received', httpStatus.OK);
            })
            .catch(error => {
                return next(new ApiError(error.message, error.code));
            });
    };
}

module.exports = new Category(new CategoryService());