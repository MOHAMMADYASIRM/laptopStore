const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },
    address: {
        street: { type: String, default: '', trim: true },
        city: { type: String, default: '', trim: true },
        state: { type: String, default: '', trim: true },
        zip: { type: String, default: '', trim: true },
        country: { type: String, default: '', trim: true }
    },
    userBan: {
        type: Boolean,
        default: false
    }
});

const users = mongoose.model("users", userSchema);

module.exports = users;