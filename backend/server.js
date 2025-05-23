const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRouter');
const brandRoutes = require('./routes/brandRouter');
const adminRouter = require('./routes/adminRouter');
const paymentRouter = require('./routes/paymentRoute');

dotenv.config();
const port = process.env.PORT || 4100;

app.use(cors());

app.use(express.json());

connectDB();

app.use('/api/auth', userRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/admin', adminRouter);
app.use('/api/payment', paymentRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

