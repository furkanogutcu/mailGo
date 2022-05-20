const Repository = require("./repository/repository");
const CampaignService = require("../services/campaign");
const ApiDataSuccess = require("../responses/success/apiDataSuccess");
const httpStatus = require("http-status");
const ApiError = require("../responses/error/apiError");
const service = new CampaignService();

class Campaign extends Repository {
    increaseTotalClick = (req, res, next) => {
        const campaignId = req.params.id;
        service.increaseTotalClick(campaignId)
            .then((campaign) => {
                return ApiDataSuccess.send(res, campaign, 'Campaign total click increased', httpStatus.OK);
            })
            .catch((error) => {
                return next(new ApiError(error.message, error.code));
            });
    };
}

module.exports = new Campaign(new CampaignService());