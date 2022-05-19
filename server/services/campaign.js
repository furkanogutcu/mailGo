const CampaignModel = require('../models/campaign');
const Repository = require('./repository/repository');

class Campaign extends Repository {
    constructor() {
        super(CampaignModel, {
            path: 'category',
            select: 'name description'
        });
    }
}

module.exports = Campaign;