const UserModel = require('../models/user');
const Repository = require('./repository/repository');

class User extends Repository {
    constructor() {
        super(UserModel);
    }
}

module.exports = User;