const Mongoose = require('mongoose');

const userRoleSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50
    }
}, { timestamps: true, versionKey: false });

module.exports = Mongoose.model("UserRole", userRoleSchema);