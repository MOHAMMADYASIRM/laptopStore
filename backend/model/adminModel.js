const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    adminPass: {
        type: String,
        required: true
    }
});


const admin = mongoose.model("admin", adminSchema);

module.exports = admin;