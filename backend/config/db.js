const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = () => mongoose.connect(process.env.MONGO_URL, { dbName: "laptopstoredb" })
    .then(() => console.log("DB CONNECTED"))
    .catch((error) => console.log(error)
    );

module.exports = connectDB;