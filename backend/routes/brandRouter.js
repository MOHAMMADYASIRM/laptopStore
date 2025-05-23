const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');



router.post("/brandreg", brandController.brandReister);
router.post("/brandlogin", brandController.brandLogin);
router.post("/addproduct", brandController.addProduct);
router.get('/get-products/:brandId', brandController.getBrandProducts);
router.get('/single-product/:id', brandController.getSingleProduct);
router.put('/update-product/:id', brandController.updateProduct);
router.post('/add-to-featured', brandController.addToFeatured);
router.get('/get-orders/:brandId', brandController.getBrandBookings);
router.put('/update-deliverystatus/:bookingId', brandController.deliveryStatus);
router.get('/get-brand-details/:brandId', brandController.getBrandDetails);
router.put('/brand-profile-update/:brandId', brandController.updateBrandProfile);
router.delete('/brand-product-delete/:productId', brandController.productDelete);

module.exports = router; 