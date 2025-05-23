const dotenv = require('dotenv');
dotenv.config();

const complaints = require('./../model/complaintsModel');

const addToComplaints = async (req, res) => {
    try {
        const { name, email, complaint } = req.body;
        console.log(name, email, complaint);
        if (!name || !email || !complaint) {
            return res.status(401).json({ message: "Uncompleted Fields" });
        }

        const newComplaints = new complaints({
            name,
            email,
            complaint
        });

        await newComplaints.save();
        return res.status(201).json({ message: "Complaint Registered Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

const getComplaints = async (req, res) => {
    try {
        const complaint = await complaints.find().sort({ createdAt: -1 });
        
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching complaints' });
    }
};

module.exports = { addToComplaints, getComplaints }