const Repository = require("./repository/repository");
const SubscriberService = require("../services/subscriber");
const service = new SubscriberService();
const CategoryService = new require("../services/category");
const categoryService = new CategoryService();
const ApiError = require("../responses/error/apiError");
const ApiDataSuccess = require("../responses/success/apiDataSuccess");
const httpStatus = require("http-status");

class Subscriber extends Repository {
    getWithToken = (req, res, next) => {
        const subscriber = req.subscriber;
        service.getById(subscriber._id)
            .then((subscriber) => {
                //FIXME
                const response = {
                    ...subscriber.toObject()
                };
                delete response.password;
                return ApiDataSuccess.send(res, response, 'Subscriber successfully retrieved', httpStatus.OK);
            })
            .catch((error) => {
                return next(new ApiError(error.message, error.code));
            });
    };

    subscribeCategoriesWithToken = (req, res, next) => {
        //İstenen kategorileri uygunluğunu kontrol etmek için veritabanından tüm kategorileri getir.
        categoryService.getAllWithSelect('_id').then((categories) => {
            if (!categories) {
                return next(new ApiError('There is no category in the database', httpStatus.NOT_FOUND));
            }

            //İstenen kategorileri kontrol et.
            let error = 0;
            req.body.categories.forEach(category => {
                if (!categories.some(c => c._id.toString() === category)) {
                    error++;
                    return; //Break loop
                }
            });
            if (error > 0) {
                return next(new ApiError('Category not found', httpStatus.NOT_FOUND));
            }

            //Abone olunmak istenen tüm kategoriler veritabanında varsa aboneyi veritabanından getir
            service.getById(req.subscriber._id).then((subscriber) => {

                //Abonenin sadece abone olduğu kategorileri al
                const updatedSubscriber = {
                    subscribedCategories: subscriber.subscribedCategories
                };

                //İstekteki kategorileri al
                const categories = req.body.categories;

                //Kullanıcı abone olmak istediği kategorilere daha önce abone olmuş mu kontrol et. Uygunsa abonelik için listeye ekle
                categories.forEach(category => {
                    if (!updatedSubscriber.subscribedCategories.some(subscribedCategory => subscribedCategory.category.toString() === category)) {
                        updatedSubscriber.subscribedCategories.push({
                            category: category,
                            subscriptionDate: Date.now()
                        });
                    }
                });

                //Kullanıcının abonelik listesini güncelle
                service.update(req.subscriber._id, updatedSubscriber)
                    .then((subscriber) => {
                        return ApiDataSuccess.send(res, subscriber, 'Subscriber successfully subscribed', httpStatus.OK);
                    })
                    .catch((error) => {
                        console.log('GİRDİ');
                        return next(new ApiError(error.message, error.code));
                    });
            })
                .catch(() => {
                    return next(new ApiError());
                });
        }).catch(() => {
            return next(new ApiError());
        });
    };
}

module.exports = new Subscriber(service);