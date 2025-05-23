const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const complaint = require('./../controllers/complaintsController');

router.post('/adminauth', adminController.adminLogin);
router.get('/get-users', adminController.getAllUsers);
router.put('/userban/:userId', adminController.userBan);
router.delete('/user-delete/:userId', adminController.deleteUser);
router.get('/get-count', adminController.allCount);
router.get('/get-brands', adminController.getAllBrands);
router.put('/verify-brand/:brandId', adminController.brandVerify);
router.put('/ban-brand/:brandId', adminController.brandBan);
router.delete('/brand-delete/:brandId', adminController.brandDelete);
router.get('/get-complaint', complaint.getComplaints);

module.exports = router;