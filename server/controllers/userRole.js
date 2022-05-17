const Repository = require("./repository/repository");
const UserRoleService = require("../services/userRole");

class UserRole extends Repository { }

module.exports = new UserRole(new UserRoleService());