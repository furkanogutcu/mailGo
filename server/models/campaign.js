const Mongoose = require('mongoose');

const campaignSchema = new Mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        default: null,
        minlength: 3,
        maxlength: 600
    },
    totalSent: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    },
    totalClicks: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    },
    emailClicks: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    },
    targetLink: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
    category: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
}, { timestamps: true, versionKey: false });

module.exports = Mongoose.model("Campaign", campaignSchema);