const Users = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();


const register = async (req, res) => {
    try {
        const { userName, userEmail, userPassword } = req.body;
        const isEmail = await Users.findOne({ userEmail });

        if (isEmail) {
            return res.status(400).json({ message: "Email Already Exists..!" });
        }
        const hashedpassword = await bcrypt.hash(userPassword, 10);
        const user = new Users({ userName, userEmail, userPassword: hashedpassword });
        await user.save();
        return res.status(201).json({ message: "User Registered Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const isEmail = await Users.findOne({ userEmail });
        if (!isEmail) {
            return res.status(400).json({ message: "Email Not Exists..!" });
        }
        if (isEmail.userBan=== true) {
            return res.status(400).json({ message: "User is Banned..!" });
        }
        const comparedpass = await bcrypt.compare(userPassword, isEmail.userPassword);
        if (comparedpass) {
            const authtoken = jwt.sign({ userEmail: isEmail.userEmail }, process.env.jwtSecretKey, { expiresIn: '60min' });
            res.status(201).json({ message: "User Login Success", authtoken, isEmail, userId: isEmail._id  });
            console.log(authtoken);

        } else {
            res.status(401).json({ message: "incorrect password" })

        }

    } catch (error) {

        res.status(500).json({ message: "Server Error", success: false })
    }
}







module.exports = { register, login };
