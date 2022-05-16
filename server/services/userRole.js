const UserRoleModel = require('../models/userRole');
const Repository = require('./repository/repository');

class UserRole extends Repository {
    constructor() {
        super(UserRoleModel);
    }
}

module.exports = UserRole;