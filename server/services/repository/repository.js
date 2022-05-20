class Repository {
    constructor(model, populate) {
        this.Model = model;
        this.populate = populate;
    }

    getAll() {
        return this.populate ? this.Model.find({}).populate(this.populate) : this.Model.find({});
    }

    getAllWithSelect(select) {
        return this.populate ? this.Model.find({}).populate(this.populate).select(select) : this.Model.find({}).select(select);
    }

    getAllWithQuery(query) {
        return this.populate ? this.Model.find(query).populate(this.populate) : this.Model.find({});
    }

    getById(id) {
        return this.populate ? this.Model.findById(id).populate(this.populate) : this.Model.findById(id);
    }

    getByQuery(query) {
        return this.populate ? this.Model.findOne(query).populate(this.populate) : this.Model.findOne(query);
    }

    create(item) {
        const entity = new this.Model(item);
        return this.populate ? entity.save().then(e => e.populate(this.populate)) : entity.save();
    }

    update(id, item) {
        return this.populate ? this.Model.findByIdAndUpdate(id, item, { new: true }).populate(this.populate) : this.Model.findByIdAndUpdate(id, item, { new: true });
    }

    delete(id) {
        return this.populate ? this.Model.findByIdAndRemove(id).populate(this.populate) : this.Model.findByIdAndRemove(id);
    }
}

module.exports = Repository;