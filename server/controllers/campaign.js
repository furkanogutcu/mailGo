const Repository = require("./repository/repository");
const CampaignService = require("../services/campaign");

class Campaign extends Repository { }

module.exports = new Campaign(new CampaignService());