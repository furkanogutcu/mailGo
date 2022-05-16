const Mongoose = require('mongoose');

const subscriberSchema = new Mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
    },
    isSubscribed: {
        type: Boolean,
        default: false,
        required: true,
    },
    unSubscribedAt: {
        type: Date,
        required: false
    },
    analysis: {
        totalCampaignClicks: {
            type: Number,
            default: 0,
            required: true,
            min: 0
        },
        totalNumberOfEmailSSent: {
            type: Number,
            default: 0,
            required: true,
            min: 0
        }
    },
    subscribedCategories: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }],
}, { timestamps: true, versionKey: false });

module.exports = Mongoose.model("Subscriber", subscriberSchema);