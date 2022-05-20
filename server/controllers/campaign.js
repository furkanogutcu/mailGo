const Repository = require("./repository/repository");
const CampaignService = require("../services/campaign");
const SubscriberService = require("../services/subscriber");
const ApiDataSuccess = require("../responses/success/apiDataSuccess");
const httpStatus = require("http-status");
const ApiError = require("../responses/error/apiError");
const service = new CampaignService();
const subscriberService = new SubscriberService();

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

    getEmailList = (req, res, next) => {
        const campaignId = req.params.id;

        //Kampanyayı getir
        service.getById(campaignId)
            .then((campaign) => {
                //Kampanya kategorisine abone olan tüm aboneleri getir          
                return subscriberService.getAllWithQuery({
                    subscribedCategories: {
                        $elemMatch: {
                            category: campaign.category
                        }
                    }
                });
            })
            .then((subscriberList) => {
                const emailList = {
                    emails: subscriberList.map(subscriber => subscriber.email)
                };
                return ApiDataSuccess.send(res, emailList, 'Campaign email list created successfully', httpStatus.OK);
            })
            .catch((error) => {
                return next(new ApiError(error.message, error.code));
            });
    };
}

module.exports = new Campaign(new CampaignService());