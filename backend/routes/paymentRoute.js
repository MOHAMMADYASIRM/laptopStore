const express = require("express");
const dotenv = require('dotenv');
const router = express.Router();
const Razorpay = require("razorpay");

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount*100,
            currency: "INR",
            receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`,
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json({ order });
    } catch (err) {
        console.error("Razorpay Order Error:", err);
        res.status(500).json({ message: "Failed to create Razorpay order" });
    }
});

module.exports = router;
