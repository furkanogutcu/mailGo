const Repository = require("./repository/repository");
const UserService = require("../services/user");

class User extends Repository { }

module.exports = new User(new UserService());