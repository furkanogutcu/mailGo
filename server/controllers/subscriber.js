const Repository = require("./repository/repository");
const SubscriberService = require("../services/subscriber");
const service = new SubscriberService();
const CategoryService = new require("../services/category");
const categoryService = new CategoryService();
const ApiError = require("../responses/error/apiError");
const ApiDataSuccess = require("../responses/success/apiDataSuccess");
const httpStatus = require("http-status");
const csvtojson = require("csvtojson");
const schemas = require('../validations/subscriber');
var generator = require('generate-password');
const passwordHelper = require('../helpers/password');
const emailHelper = require('../helpers/email');

class Subscriber extends Repository {
    async getWithToken(req, res, next) {
        const subscriber = req.subscriber;

        const resultSubscriber = await service.getById(subscriber._id).catch(() => { });
        if (!resultSubscriber) {
            return next(new ApiError("There was a problem getting the subscriber", httpStatus.INTERNAL_SERVER_ERROR));
        }

        // Kullanıcının şifresini yeni objeden sil
        const response = {
            ...resultSubscriber.toObject()
        };
        delete response.password;

        return ApiDataSuccess.send(res, response, 'Subscriber successfully retrieved', httpStatus.OK);
    }

    async subscribeCategoriesWithToken(req, res, next) {
        // İstenen kategorileri uygunluğunu kontrol etmek için veritabanından tüm kategorileri getir.
        const currentCategories = await categoryService.getAllWithSelect('_id').catch(() => { });
        if (!currentCategories) {
            return next(new ApiError("There was a problem getting the categories", httpStatus.INTERNAL_SERVER_ERROR));
        }

        // Abone olunmak istenen tüm kategoriler veritabanında var mı kontrol et.
        let error = 0;
        req.body.categories.forEach(category => {
            if (!currentCategories.some(c => c._id.toString() === category)) {
                error++;
                return; //Break loop
            }
        });
        if (error > 0) {
            return next(new ApiError('Category not found', httpStatus.NOT_FOUND));
        }

        // Aboneyi veritabanından getir
        const subscriber = await service.getById(req.subscriber._id).catch(() => { });
        if (!subscriber) {
            return next(new ApiError("There was a problem getting the subscriber", httpStatus.INTERNAL_SERVER_ERROR));
        }

        // Abonenin sadece abone olduğu kategorileri al
        const updatedSubscriber = {
            subscribedCategories: subscriber.subscribedCategories
        };

        // İstekteki kategorileri al
        const categories = req.body.categories;

        // Kullanıcı abone olmak istediği kategorilere daha önce abone olmuş mu kontrol et. Uygunsa abonelik için listeye ekle
        categories.forEach(category => {
            if (!updatedSubscriber.subscribedCategories.some(subscribedCategory => subscribedCategory.category.toString() === category)) {
                updatedSubscriber.subscribedCategories.push({
                    category: category,
                    subscriptionDate: Date.now()
                });
            }
        });

        //Kullanıcının abonelik listesini güncelle
        const result = await service.update(req.subscriber._id, updatedSubscriber).catch(() => { });
        if (!result) {
            return next(new ApiError("There was a problem updating the subscriber", httpStatus.INTERNAL_SERVER_ERROR));
        }

        return ApiDataSuccess.send(res, result, 'Subscriber successfully subscribed', httpStatus.OK);
    }

    async unSubscribeCategoriesWithToken(req, res, next) {
        //Aboneyi veritabanından getir
        const subscriber = await service.getById(req.subscriber._id).catch(() => { });
        if (!subscriber) {
            return next(new ApiError("There was a problem getting the subscriber", httpStatus.INTERNAL_SERVER_ERROR));
        }

        const unSubscribeCategories = req.body.categories;

        //Kullanıcının abonelik listesini yeni obje haline getir
        const updatedSubscriber = {
            subscribedCategories: subscriber.subscribedCategories
        };

        //Kullanıcının abonelik listesinden istenen kategorileri sil
        unSubscribeCategories.forEach(unSubscribeCategory => {
            const index = updatedSubscriber.subscribedCategories.findIndex(s => s.category._id.toString() === unSubscribeCategory);
            if (index !== -1) {
                updatedSubscriber.subscribedCategories.splice(index, 1);
            }
        });

        //Kullanıcının abonelik listesini güncelle
        const result = await service.update(req.subscriber._id, updatedSubscriber).catch(() => { });
        if (!result) {
            return next(new ApiError("There was a problem updating the subscriber", httpStatus.INTERNAL_SERVER_ERROR));
        }

        return ApiDataSuccess.send(res, result, 'Subscriber successfully unsubscribed', httpStatus.OK);
    }

    async bulkAdd(req, res, next) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new ApiError('No files were uploaded', httpStatus.BAD_REQUEST));
        }

        const file = req.files.file;

        // Eğer csv dosyası ise
        if (file.mimetype === 'text/csv') {
            const jsonData = await csvtojson().fromString(file.data.toString());
            await Subscriber.#bulkAddWithJson(res, jsonData);
        }
    }

    static async #bulkAddWithJson(res, json) {
        // Hata olmayan kayıtları al
        const validRows = [];
        const emailPasswordList = [];
        for (const row of json) {
            // Rastgele bir şifre oluştur
            const password = generator.generate({
                length: 20,
                numbers: true,
                uppercase: true,
                lowercase: true,
                strict: true,
            });

            // Şifreyi hashle ve kayıta ekle                
            row.password = passwordHelper.passwordToHash(password);

            // Kayıtı kontrol et
            const validationResult = schemas.bulkAddValidation.validate(row);
            if (!validationResult.error) {
                validRows.push(row);
                emailPasswordList.push({ email: row.email, password: password });
            }
        }

        const addedEmails = [];
        // Veritabanına kaydet
        await service.bulkAddWithJson(validRows).then(result => {
            // Kayıt işlemi başarılı olanları listeye ekle
            for (const record of result) {
                addedEmails.push(record.email);
            }
        }).catch(error => {
            for (const record of error.insertedDocs) {
                addedEmails.push(record.email);
            }
        });

        // Sisteme eklenmiş olan yeni abonelere şifrelerini mail olarak gönder
        if (emailPasswordList.length > 0 && addedEmails.length > 0) {
            for (const email of addedEmails) {
                const subscriber = emailPasswordList.find(s => s.email === email);
                if (subscriber) {
                    const content = emailHelper.createRegisterEmailContent(subscriber.email, subscriber.password);
                    emailHelper.sendHtmlEmail(email, 'mailGo Hesabınız Oluşturuldu', content);
                }
            }
        }

        return ApiDataSuccess.send(res, addedEmails, `${addedEmails.length} of ${validRows.length} subscribers successfully added`, httpStatus.OK);
    }
}

module.exports = new Subscriber(service);