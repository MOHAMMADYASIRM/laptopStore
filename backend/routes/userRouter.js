const express = require('express');
const userControllers = require('../controllers/userController');
const product = require('../controllers/brandController');
const cart = require('../controllers/cartControlller');
const book = require('../controllers/bookingController');
const complaint = require('../controllers/complaintsController')
const profileController = require('../controllers/userProfileController')
const router = express.Router();


router.post("/signup", userControllers.register);
router.post("/login", userControllers.login);
router.get("/get-products", product.getProducts);
router.get("/product/:id", product.getSingleProduct);
router.post("/add-cart", cart.addToCart);
router.get("/get-cart/:userId", cart.getCartItems);
router.delete("/remove-cart/:cartId", cart.cartSingleDelete);
router.delete("/clear-cart/:userId", cart.clearCart);
router.post("/user-booking", book.userBooking);
router.get("/get-booking/:userId", book.getBookingItems);
router.get("/get-featured/", product.getFeaturedProducts);
router.post("/add-complaint", complaint.addToComplaints);
router.get("/get-profile/:userId", profileController.getProfile);
router.put("/update-profile/:userId", profileController.updateProfile);
router.put("/update-quantity/:cartId", cart.updateQuantity);
router.post("/cart-booking", book.cartBooking);

module.exports = router;