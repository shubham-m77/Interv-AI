require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const authRouter = require('./src/routes/auth.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const interviewRouter = require('./src/routes/interview.routes');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true 
}));
app.use(express.json());
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);