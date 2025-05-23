const mongoose = require('mongoose');

const featuredProductSchema = new mongoose.Schema({
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brands',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    }
});


const featuredProducts = mongoose.model('featuredProducts', featuredProductSchema);

module.exports = featuredProducts;

