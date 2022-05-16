const SubscriberModel = require('../models/subscriber');
const Repository = require('./repository/repository');

class Subscriber extends Repository {
    constructor() {
        super(SubscriberModel);
    }
}

module.exports = Subscriber;