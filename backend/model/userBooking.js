const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    userEmail: {
        type: String,
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
            price: {
                type: Number,
                required: true,
            }
        },
    ],
    totalPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    deliveryStatus: {
        type: String,
        enum: ["Not Shipped", "Shipped", "Out for Delivery", "Delivered"],
        default: "Not Shipped",
    },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Cancelled"],
        default: "Pending",
    },
    paymentId: {
        type: String,
        default: null,
    },
    bookingDate: {
        type: Date,
        default: Date.now,
    },
});

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
