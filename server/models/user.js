const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
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
        minlength: 6,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    roles: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "UserRole",
        required: true
    }]
}, { timestamps: true, versionKey: false });

module.exports = Mongoose.model("User", userSchema);