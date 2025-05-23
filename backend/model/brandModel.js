const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    brandEmail: {
        type: String,
        required: true,
        unique: true
    },
    brandPassword: {
        type: String,
        required: true
    },
    brandVerification: {
        type: Boolean,
        default: false
    },
    brandBan: {
        type: Boolean,
        default: false
    },
});




const brands = mongoose.model("brands", brandSchema);


module.exports = brands;