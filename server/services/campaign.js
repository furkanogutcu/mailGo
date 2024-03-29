const CampaignModel = require('../models/campaign');
const Repository = require('./repository/repository');

class Campaign extends Repository {
    constructor() {
        super(CampaignModel, {
            path: 'category',
            select: 'name description'
        });
    }

    increaseTotalClick(id) {
        return CampaignModel.findByIdAndUpdate(id, {
            $inc: {
                totalClicks: 1
            }
        }, { new: true }).populate({
            path: 'category',
            select: 'name description'
        });
        // FIXME - Populate'i tek bir noktadan al
    }

    increaseEmailClick(id) {
        return CampaignModel.findByIdAndUpdate(id, {
            $inc: {
                emailClicks: 1
            }
        }, { new: true }).populate({
            path: 'category',
            select: 'name description'
        });
        // FIXME - Populate'i tek bir noktadan al
    }

    increaseTotalSend(id, sended) {
        return CampaignModel.findByIdAndUpdate(id, {
            $inc: {
                totalSent: sended
            }
        }, { new: true }).populate({
            path: 'category',
            select: 'name description'
        });
        // FIXME - Populate'i tek bir noktadan al
    }
}

module.exports = Campaign;