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

    create(item) {      //FIXME POPULATE
        return this.Model.create(item);
    }

    update(id, item) {  //FIXME POPULATE
        return this.Model.findByIdAndUpdate(id, item, { new: true });
    }

    delete(id) {        //FIXME POPULATE
        return this.Model.findByIdAndRemove(id);
    }
}

module.exports = Repository;