const CategoryModel = require('../models/category');
const SubscriberModel = require('../models/subscriber');
const CampaignModel = require('../models/campaign');
const Repository = require('./repository/repository');

class Category extends Repository {
    constructor() {
        super(CategoryModel);
    }

    delete(id) {
        // Gelen id'ye ait kategorinin kampanyaları siliniyor
        return CampaignModel.find({ category: id }).then(campaigns => {
            return Promise.all(campaigns.map(campaign => {
                return campaign.remove();
            }));
        }).then(() => {
            // Gelen kategoriye abone olan tüm abonelerin abone oldukları kategoriler listesinden bu kategori silinir.
            // Sonrasında kategori silinir.
            return SubscriberModel.find({
                subscribedCategories: {
                    $elemMatch: {
                        category: id
                    }
                }
            }).then(subscribers => {
                const promises = [];
                subscribers.forEach(subscriber => {
                    const index = subscriber.subscribedCategories.findIndex(category => category.category.toString() === id.toString());
                    subscriber.subscribedCategories.splice(index, 1);
                    promises.push(subscriber.save());
                });
                return Promise.all(promises);
            }).then(() => {
                return super.delete(id);
            });
        });
    }

    getCampaignCount(id) {
        return CampaignModel.count({ category: id });
    }

    getSubscriberCount(id) {
        return SubscriberModel.count({
            subscribedCategories: {
                $elemMatch: {
                    category: id
                }
            }
        });
    }
}


module.exports = Category;

/*
const result = await SubscriberModel.find({
            subscribedCategories: {
                $elemMatch: {
                    category: id
                }
            }
        });
*/



/*
.then(subscribers => {
            return Promise.all(subscribers.map(subscriber => {
                subscriber.subscribedCategories.pull(id);
                return subscriber.save();
            }));
        }).then(() => {
            return super.delete(id);
        });
*/