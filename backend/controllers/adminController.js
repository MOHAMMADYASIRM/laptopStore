const admins = require('../model/adminModel');
const Users = require('../model/userModel');
const Brands = require('../model/brandModel');
const products = require('../model/brandProducts');
const booking = require('../model/userBooking');
const complaint = require('../model/complaintsModel');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();


const adminLogin = async (req, res) => {
    try {

        const { adminEmail, adminPassword } = req.body;
        const dbpass = await admins.findOne({ adminPassword })
        const email = process.env.adminEmail;
        const password = dbpass || process.env.adminPassword;

        if (!email) {

            return res.status(400).json({ message: "Admin not Exists..." })

        } else if (adminEmail === email && adminPassword === password) {
            console.log("succcess");
            return res.status(200).json({ message: "Admin Login Success..." })
        }
        else {
            console.log("failed");
            return res.status(401).json({ message: "Wrong password..." })
        }
    } catch (error) {
        return res.status(500).json({ message: "Server Error.." })
    }
}

const allCount = async (req, res) => {
    try {
        const users = await Users.find();
        const brands = await Brands.find();
        const productsCount = await products.find();
        const bookingCount = await booking.find();
        const complaintCount = await complaint.find();
        const allCounts = {
            users: users.length,
            brands: brands.length,
            products: productsCount.length,
            booking: bookingCount.length,
            complaint: complaintCount.length
        };

        return res.status(200).json(allCounts);
    } catch (error) {
        return res.status(500).json({ message: "Server Error.." });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const userBan = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.userBan === true) {
            user.userBan = false;
            await user.save();
            res.status(200).json({ message: "User banned successfully" });
        }
        else {
            user.userBan = true;
            await user.save();
            res.status(200).json({ message: "User unbanned successfully" });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await Users.deleteOne({ _id: userId });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


const getAllBrands = async (req, res) => {
    try {
        const brands = await Brands.find();
        if (!brands || brands.length === 0) {
            return res.status(404).json({ message: "No brands found" });
        }
        res.status(200).json(brands);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const brandVerify = async (req, res) => {
    try {
        const { brandId } = req.params;
        const brand = await Brands.findById(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        if (brand.brandVerification === false) {
            brand.brandVerification = true;
            await brand.save();
            res.status(200).json({ message: "Brand verified successfully" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const brandBan = async (req, res) => {
    try {
        const { brandId } = req.params;
        const brand = await Brands.findById(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        if (brand.brandBan === false) {
            brand.brandBan = true;
            await brand.save();
            res.status(200).json({ message: "Brand banned successfully" });
        }
        else {
            brand.brandBan = false;
            await brand.save();
            res.status(200).json({ message: "Brand unbanned successfully" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const brandDelete = async (req, res) => {
    try {
        const { brandId } = req.params;
        const brand = await Brands.findById(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        await Brands.deleteOne({ _id: brandId });
        res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = { adminLogin, allCount, getAllUsers, userBan, deleteUser, getAllBrands, brandVerify, brandBan, brandDelete }; 