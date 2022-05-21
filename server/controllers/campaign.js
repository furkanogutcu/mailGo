const Repository = require("./repository/repository");
const CampaignService = require("../services/campaign");
const SubscriberService = require("../services/subscriber");
const ApiDataSuccess = require("../responses/success/apiDataSuccess");
const httpStatus = require("http-status");
const ApiError = require("../responses/error/apiError");
const service = new CampaignService();
const subscriberService = new SubscriberService();
const emailHelper = require("../helpers/email");
const mongoose = require('mongoose');

class Campaign extends Repository {
    async increaseTotalClick(req, res, next) {
        const campaignId = req.params.id;
        const campaignResult = await service.increaseTotalClick(campaignId).catch(() => { });
        if (!campaignResult) {
            return next(new ApiError());
        }

        // Kullanıcının toplam tıklama sayısını bir arttır
        const subscriberResult = await subscriberService.increaseTotalClick(req.subscriber._id).catch(() => { });
        if (!subscriberResult) {
            return next(new ApiError());
        }

        return ApiDataSuccess.send(res, campaignResult, 'Campaign total click increased', httpStatus.OK);
    }

    async getEmailList(req, res, next) {
        const campaignId = req.params.id;

        //Kampanyayı getir
        const campaign = await service.getById(campaignId).catch(() => { });
        if (!campaign) {
            return next(new ApiError("Campaign not found", httpStatus.NOT_FOUND));
        }

        //Kampanya kategorisine abone olan tüm aboneleri getir          
        const subscribers = await subscriberService.getAllWithQuery({
            subscribedCategories: {
                $elemMatch: {
                    category: campaign.category
                }
            }
        }).catch(() => { });
        if (!subscribers) {
            return next(new ApiError("No subscribers to the category of the campaign were found", httpStatus.NOT_FOUND));
        }

        //Abonelerin mail adreslerini hazırla ve döndür
        const emailList = {
            emails: subscribers.map(subscriber => subscriber.email)
        };
        return ApiDataSuccess.send(res, emailList, 'Campaign email list created successfully', httpStatus.OK);
    }

    async sendEmailSubscribers(req, res, next) {
        const campaignId = req.params.id;

        // Email konfigürasyonu doğru mu kontrol et
        const isVerify = await emailHelper.isVerify();
        if (!isVerify) {
            return next(new ApiError("This service is currently disabled", httpStatus.INTERNAL_SERVER_ERROR));
        }

        // Kampanyayı getir
        const campaign = await service.getById(campaignId).catch(() => { });
        if (!campaign) {
            return next(new ApiError("Campaign not found", httpStatus.NOT_FOUND));
        }

        // Kampanyayı kategorisine abone olan tüm aboneleri getir
        const subscriberList = await subscriberService.getAllWithQuery({
            subscribedCategories: {
                $elemMatch: {
                    category: campaign.category
                }
            }
        }).catch(() => { });
        if (!subscriberList) {
            return next(new ApiError("Campaign subscribers not found", httpStatus.NOT_FOUND));
        }

        // Kampanya için herkese mail gönder
        let sended = 0;
        for (const subscriber of subscriberList) {

            // Kampanya için mail içeriği oluştur
            const emailContent = emailHelper.createCampaignEmailContent(campaign, subscriber);

            const result = emailHelper.sendHtmlEmail(subscriber.email, `${campaign.name} Kampanya Bilgilendirmesi`, emailContent).catch(() => { });
            if (result) {
                sended++;

                // Kullanıcının mail alma sayısını bir arttır
                await subscriberService.increaseNumberOfEmailSent(subscriber._id).catch(() => { });
            }
        }

        // Kampanyanın toplam gönderilme sayisini arttır
        await service.increaseTotalSend(campaignId, sended);

        return ApiDataSuccess.send(res, sended, `Campaign Email was successfully sent to ${sended} email addresses`, httpStatus.OK);
    }

    async emailRedirect(req, res, next) {
        // Eğer ki isteğin parametrelerinde sid doğrulanmazsa
        if (!mongoose.Types.ObjectId.isValid(req.params?.sid)) {
            return next(new ApiError('Invalid Id', httpStatus.BAD_REQUEST));
        }

        const campaignId = req.params.id;
        const subscriberId = req.params.sid;

        // Kampanyayı getir
        const campaign = await service.getById(campaignId).catch(() => { });
        if (!campaign) {
            return next(new ApiError("Campaign not found", httpStatus.NOT_FOUND));
        }

        // Kampanya linkini oluştur
        const link = (campaign.targetLink.includes('http://') || campaign.targetLink.includes('https://')) ? campaign.targetLink : `http://${campaign.targetLink}`;

        // Kampanyanın email tıklama sayısını bir arttır
        await service.increaseEmailClick(campaignId).catch(() => { });

        // Kampanyanın toplam tıklama sayısını bir arttır
        await service.increaseTotalClick(campaignId).catch(() => { });

        // Kullanıcının tıklama sayısını bir arttır
        await subscriberService.increaseTotalClick(subscriberId).catch(() => { });

        return res.redirect(link);
    }
}

module.exports = new Campaign(new CampaignService());