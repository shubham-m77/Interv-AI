const {Router} = require('express');
const { registerUser, loginUser, logoutUser, getUser } = require('../controllers/auth.controller');
const { isAuthUser } = require('../middlewares/auth.middleware');

const authRouter = Router();

// /api/auth/register : registers new user and expects - emailID,username,password
authRouter.post('/register', registerUser);

// /api/auth/login : logs in existing user and expects - emailID and password
authRouter.post('/login', loginUser);

// /api/auth/logout : log  out user by blacklisting the token
authRouter.get('/logout', logoutUser);

// /api/auth/get-user : gets the current user's information
authRouter.get('/get-user',isAuthUser,getUser);


module.exports =  authRouter;