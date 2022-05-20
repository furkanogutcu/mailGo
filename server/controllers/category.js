const Repository = require("./repository/repository");
const CategoryService = require("../services/category");
const service = new CategoryService();
const ApiError = require("../responses/error/apiError");
const ApiDataSuccess = require("../responses/success/apiDataSuccess");
const httpStatus = require("http-status");

class Category extends Repository {
    async getSubscriberCount(req, res, next) {
        const id = req.params.id;

        // Kategoriye abone olanların sayısını getir
        const count = await service.getSubscriberCount(id).catch(() => { });
        if (!count) {
            return next(new ApiError("There was a problem getting the subscriber count", httpStatus.INTERNAL_SERVER_ERROR));
        }

        return ApiDataSuccess.send(res, count, 'Number of subscribers subscribed to category successfully received', httpStatus.OK);
    }

    async getCampaignCount(req, res, next) {
        const id = req.params.id;

        // Kategoriye ait kampanya sayisini getir
        const count = await service.getCampaignCount(id).catch(() => { });
        if (!count) {
            return next(new ApiError("There was a problem getting the campaign count", httpStatus.INTERNAL_SERVER_ERROR));
        }

        return ApiDataSuccess.send(res, count, 'Number of campaigns belonging to the category was successfully received', httpStatus.OK);
    }
}

module.exports = new Category(new CategoryService());