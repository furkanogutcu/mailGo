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
}

module.exports = Subscriber;