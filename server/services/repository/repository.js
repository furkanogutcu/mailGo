class Repository {
    constructor(model) {
        this.Model = model;
    }
    
    getAll() {
        return this.Model.find({});
    }

    getById(id) {
        return this.Model.findById(id);
    }

    create(item) {
        return this.Model.create(item);
    }

    update(id, item) {
        return this.Model.findByIdAndUpdate(id, item, { new: true });
    }
    
    delete(id) {
        return this.Model.findByIdAndRemove(id);
    }
}

module.exports = Repository;