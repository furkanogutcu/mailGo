const CampaignModel = require('../models/campaign');
const Repository = require('./repository/repository');

class Campaign extends Repository {
    constructor() {
        super(CampaignModel);
    }
}

module.exports = Campaign;