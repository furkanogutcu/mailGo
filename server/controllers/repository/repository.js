const ApiError = require('../../responses/error/apiError');
const ApiDataSuccess = require('../../responses/success/apiDataSuccess');
const httpStatus = require('http-status');

class Repository {
    constructor(service) {
        this.service = service;
        //API yanıtlarında model adını çoğul ve tekil olarak kullanabilmek için gelen servis içerisinden alıyoruz
        const collectionName = String(service.Model.collection.collectionName);
        this.singularModelName = service.Model.modelName;
        this.pluralModelName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);    //Capitalize
    }

    getAll = (req, res, next) => {
        this.service.getAll()
            .then((result) => {
                return ApiDataSuccess.send(res, result, `${this.pluralModelName} successfully retrieved`, httpStatus.OK);
            }).catch(() => {
                return next(new ApiError());
            });
    };

    getById = (req, res, next) => {
        this.service.getById(req.params.id)
            .then((result) => {
                if (!result) {
                    return next(new ApiError(`${this.singularModelName} not found`, httpStatus.NOT_FOUND));
                }

                return ApiDataSuccess.send(res, result, `${this.singularModelName} successfully retrieved`, httpStatus.OK);
            }).catch(() => {
                return next(new ApiError());
            });
    };

    add = (req, res, next) => {
        this.service.create(req.body)
            .then((result) => {
                return ApiDataSuccess.send(res, result, `${this.singularModelName} successfully created`, httpStatus.CREATED);
            }).catch(() => {
                return next(new ApiError());
            });
    };

    update = (req, res, next) => {
        this.service.update(req.body._id, req.body)
            .then((result) => {
                if (!result) {
                    return next(new ApiError(`${this.singularModelName} not found`, httpStatus.NOT_FOUND));
                }

                return ApiDataSuccess.send(res, result, `${this.singularModelName} successfully updated`, httpStatus.OK);
            }).catch(() => {
                return next(new ApiError());
            });
    };

    deleteById = (req, res, next) => {
        this.service.delete(req.body._id)
            .then((result) => {
                if (!result) {
                    return next(new ApiError(`${this.singularModelName} not found`, httpStatus.NOT_FOUND));
                }

                return ApiDataSuccess.send(res, result, `${this.singularModelName} successfully deleted`, httpStatus.OK);
            }).catch(() => {
                return next(new ApiError());
            });
    };
}

module.exports = Repository;