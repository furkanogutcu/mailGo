const Mongoose = require('mongoose');

const categorySchema = new Mongoose.Schema({
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
    }
}, { timestamps: true, versionKey: false });

module.exports = Mongoose.model("Category", categorySchema);