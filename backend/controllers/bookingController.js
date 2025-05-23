const products = require('../model/brandProducts');
const cart = require('../model/userCartModel');
const Users = require('../model/userModel');
const booking = require('../model/userBooking');
const brands = require('../model/brandModel');

const dotenv = require('dotenv');

dotenv.config();

const userBooking = async (req, res) => {
    try {
        const { userId, userEmail, productId, brandId, quantity, paymentId } = req.body;

        if (!paymentId) {
            return res.status(400).json({ message: "Payment failed or cancelled" });
        }

        const user = await Users.findById(userId);
        const product = await products.findById(productId);
        const brand = await brands.findById(brandId);

        if (!user || !product || !brand) {
            return res.status(404).json({ message: "User, Product, or Brand not found" });
        }

        if (product.productStock < quantity) {
            return res.status(409).json({ message: "Not enough stock available" });
        }

        if (!paymentId) {
            return res.status(400).json({ message: "Payment failed or cancelled" });
        }


        product.productStock -= quantity;
        await product.save();


        const newBooking = new booking({
            userId,
            userEmail,
            brandId,
            items: [{
                productId,
                quantity,
                price: product.productPrice
            }],
            totalPrice: product.productPrice * quantity,
            paymentId,
            deliveryStatus: "Not Shipped",
            paymentStatus: paymentId ? "Completed" : "Failed",
        });


        await newBooking.save();

        res.status(200).json({ message: "Product booked successfully" });

    } catch (error) {
        console.error("Booking Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


const getBookingItems = async (req, res) => {
    try {
        const { userId } = req.params;

        const bookings = await booking.find({ userId }).populate("items.productId");

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }

        const allItems = bookings.flatMap(booking =>
            booking.items.map(item => ({
                bookingId: booking._id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                deliveryStatus: booking.deliveryStatus,
                paymentStatus: booking.paymentStatus,
                bookingDate: booking.bookingDate,
                itemId: item._id,
            }))
        );

        const totalPrice = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

        res.status(200).json({ items: allItems, totalPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const cartBooking = async (req, res) => {
    try {
        const { userId, userEmail, items, totalPrice, paymentId } = req.body;

        if (!userId || !items || !totalPrice || !paymentId) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        console.log(userId, items, totalPrice, paymentId);

        const bookingsByBrand = {};

        items.forEach(item => {
            if (!bookingsByBrand[item.brandId]) {
                bookingsByBrand[item.brandId] = [];
            }
            bookingsByBrand[item.brandId].push(item);
        });

        const savedBookings = [];

        for (const brandId in bookingsByBrand) {
            const brandItems = bookingsByBrand[brandId];
            const brandTotalPrice = brandItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            const newBooking = new booking({
                userId,
                userEmail,
                brandId,
                items: brandItems,
                totalPrice: brandTotalPrice,
                paymentId,
                paymentStatus: "Completed",
            });

            const savedBooking = await newBooking.save();
            savedBookings.push(savedBooking);

            for (const item of brandItems) {
                await products.findByIdAndUpdate(item.productId, {
                    $inc: { productStock: -item.quantity }
                });
            }
        }

        res.status(201).json({
            message: "Bookings created successfully",
            bookings: savedBookings,
        });

    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




module.exports = { userBooking, getBookingItems, cartBooking };
