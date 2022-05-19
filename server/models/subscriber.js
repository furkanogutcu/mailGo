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
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    roles: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "UserRole",
        required: true
    }],
    analysis: {
        totalCampaignClicks: {
            type: Number,
            default: 0,
            required: true,
            min: 0
        },
        totalNumberOfEmailSent: {
            type: Number,
            default: 0,
            required: true,
            min: 0
        }
    },
    subscribedCategories: [{
        category: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        subscriptionDate: {
            type: Date,
            required: true
        }
    }],
}, { timestamps: true, versionKey: false });

module.exports = Mongoose.model("Subscriber", subscriberSchema);