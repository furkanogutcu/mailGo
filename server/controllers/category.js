const Repository = require("./repository/repository");
const CategoryService = require("../services/category");

class Category extends Repository { }

module.exports = new Category(new CategoryService());