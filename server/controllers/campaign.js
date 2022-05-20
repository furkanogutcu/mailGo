const Repository = require("./repository/repository");
const CampaignService = require("../services/campaign");
const SubscriberService = require("../services/subscriber");
const ApiDataSuccess = require("../responses/success/apiDataSuccess");
const httpStatus = require("http-status");
const ApiError = require("../responses/error/apiError");
const service = new CampaignService();
const subscriberService = new SubscriberService();
const emailHelper = require("../helpers/email");

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

    sendEmailSubscribers = (req, res, next) => {
        const campaignId = req.params.id;

        emailHelper.isVerify().then(() => {
            //Kampanyayı getir
            service.getById(campaignId).then((campaign) => {
                //Kampanyayı kategorisine abone olan tüm aboneleri getir
                subscriberService.getAllWithQuery({
                    subscribedCategories: {
                        $elemMatch: {
                            category: campaign.category
                        }
                    }
                }).then((subscriberList) => {
                    // Kampanya için mail içeriği oluştur
                    const emailContent = emailHelper.createCampaignEmailContent(campaign);

                    //Kampanya için herkese mail gönder
                    let sended = 0;
                    subscriberList.forEach(subscriber => {
                        try {
                            sended++;
                            emailHelper.sendHtmlEmail(subscriber.email, `${campaign.name} Kampanya Bilgilendirmesi`, emailContent);
                        } catch {
                            sended--;
                            // FIXME - Loglama eklenebilir
                        }
                    });
                    return ApiDataSuccess.send(res, sended, `Campaign Email was successfully sent to ${sended} email addresses`, httpStatus.OK);
                }).catch(() => {
                    return next(new ApiError());
                });
            }).catch(() => {
                return next(new ApiError('Campaign not found', httpStatus.NOT_FOUND));
            });
        }).catch(() => {
            return next(new ApiError("Bu hizmet suanda devre disi", httpStatus.INTERNAL_SERVER_ERROR));
        });
    };
}

module.exports = new Campaign(new CampaignService());