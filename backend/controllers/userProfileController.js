const Users = require('../model/userModel');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const getProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await Users.findById(userId).select('-password');
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



const updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, password } = req.body;

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (username) {
            user.userName = username;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.userPassword = hashedPassword;
        }
        await user.save();

        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getProfile, updateProfile };
