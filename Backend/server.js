require('dotenv').config();
const express = require('express');
const authRouter = require('./src/routes/auth.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const interviewRouter = require('./src/routes/interview.routes');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true 
}));
app.use(express.json());

let isConnected = false;

// Connectin with database and starting the server
const connectDB = async () => {
  try {
     if (isConnected) return; // reuse existing connection
    await mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
   
};

// call before every route
app.use(async (req, res, next) => {
  if(!isConnected) {
    await connectDB();
  }
  next();
});

app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

module.exports = app;