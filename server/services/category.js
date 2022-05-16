const CategoryModel = require('../models/category');
const Repository = require('./repository/repository');

class Category extends Repository {
    constructor() {
        super(CategoryModel);
    }
}

module.exports = Category;