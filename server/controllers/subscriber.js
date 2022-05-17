const Repository = require("./repository/repository");
const SubscriberService = require("../services/subscriber");

class Subscriber extends Repository { }

module.exports = new Subscriber(new SubscriberService());