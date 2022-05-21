const SubscriberModel = require('../models/subscriber');
const Repository = require('./repository/repository');

class Subscriber extends Repository {
    constructor() {
        super(SubscriberModel, [{
            path: 'roles',
            select: 'name'
        }, {
            path: 'subscribedCategories',
            populate: {
                path: 'category'
            }
        }]);
    }

    increaseNumberOfEmailSent(id) {
        return SubscriberModel.findByIdAndUpdate(id, {
            $inc: {
                "analysis.totalNumberOfEmailSent": 1
            }
        }, { new: true }).populate([{
            path: 'roles',
            select: 'name'
        }, {
            path: 'subscribedCategories',
            populate: {
                path: 'category'
            }
        }]);
        // FIXME - Populate'i tek bir noktadan al
    }

    increaseTotalClick(id) {
        return SubscriberModel.findByIdAndUpdate(id, {
            $inc: {
                "analysis.totalCampaignClicks": 1
            }
        }, { new: true }).populate([{
            path: 'roles',
            select: 'name'
        }, {
            path: 'subscribedCategories',
            populate: {
                path: 'category'
            }
        }]);
        // FIXME - Populate'i tek bir noktadan al
    }

    bulkAddWithJson(json) {
        return SubscriberModel.insertMany(json, {
            ordered: false, // Hataları önemseme
            new: true
        });
    }
}

module.exports = Subscriber;