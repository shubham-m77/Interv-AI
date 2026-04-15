const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/tokenBlacklistModel');

// registers new user and expects - emailID,username,password
const registerUser = async(req,res)=>{
    try {
        const {email,username,password} = req.body;
        if(!email || !username || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        // check previouse user or email exists or not
        const existingUser = await User.findOne({$or:[{email},{username}]});
        if(existingUser){

            return res.status(400).json({message:"Email or username already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });
        const token = jwt.sign({
            id: user._id,
            username: user.username
         }, process.env.JWT_SECRET, { expiresIn: '3d'
        })
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({message:"User registered successfully", user:{id: user._id, username: user.username, email: user.email}});
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({message:"Server error"});
    }
}

// logs in existing user and expects - emailID and password
const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Email or user not found!"});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid password!"});
        }
        const token = jwt.sign({
            id: user._id,
            username: user.username}, process.env.JWT_SECRET, { expiresIn: '3d' });
            
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({message:"User logged in successfully", user:{id: user._id, username: user.username, email: user.email}});
    
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({message:"Server error"});
    }
}

// logout user by blacklisting the token
const logoutUser = async(req,res)=>{
    const token = req.cookies.token;
        if(token){
            await tokenBlacklistModel.create({token});
        }
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
        res.status(201).json({message:"User logged out successfully"});

}

// gets the current user's information
const getUser = async(req,res) => {
    try {
       const user = await User.findById(req.user.id).select('-password'); 
        if(!user){
            return res.status(404).json({message:"User not found!"});
        }
        res.status(200).json({user:{id: user._id, username: user.username, email: user.email}});
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({message:"Server error"});
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser
}