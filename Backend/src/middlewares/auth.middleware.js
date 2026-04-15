const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/tokenBlacklistModel');

const isAuthUser = async (req,res,next) => {
    // Check for token in Authorization header
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7); // Remove 'Bearer ' prefix
    } else if (req.cookies.token) {
        // Fallback to cookie if header doesn't have token
        token = req.cookies.token;
    }

    if(!token){
        return res.status(401).json({message:"Unauthorized - No token provided"});
    }

    const isBlacklisted = await tokenBlacklistModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message:"Token is Invalid!"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid token"});
    }
}

module.exports = {isAuthUser};