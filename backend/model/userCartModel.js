const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brands",
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        default: 0,
    },
});

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;


