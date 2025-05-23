const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Brand',
    },

    productCategory: {
        type: String,
        required: true,
        trim: true,
        enum: ['Gaming', 'Professional', 'Student', 'Everyday Use'],
    },

    productName: {
        type: String,
        required: true,
        trim: true,
    },

    productModel: {
        type: String,
        required: true,
        trim: true,
    },

    productProcessor: {
        type: String,
        required: true,
    },

    productGpu: {
        type: String,
        required: true,
    },

    productRam: {
        type: String,
        required: true,
    },

    productStorage: {
        type: String,
        required: true,
    },

    productPrice: {
        type: Number,
        required: true,
    },

    productImage: {
        type: String,
        required: true,
    },

    productStock: {
        type: Number,
        required: true,
        default: 1,
    },

    displaySize: {
        type: String,
    },
    displayResolution: {
        type: String,
    },
    refreshRate: {
        type: Number,
    },
    operatingSystem: {
        type: String,
        enum: ['Windows 10', 'Windows 11', 'Ubuntu', 'macOS', 'Other'],
    },
    batteryLife: {
        type: String,
    },
    weight: {
        type: String,
    },
    productDescription: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,                    
});

productSchema.index({ brandId: 1, productModel: 1 }, { unique: true });

const products = mongoose.model('products', productSchema);

module.exports = products;
