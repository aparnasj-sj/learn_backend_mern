const express = require('express');
const userRouter = express.Router();//mini app
let userModel=require('../models/userModel');
let  cookieParser = require('cookie-parser'); 

const {getUser,getAllUser,updateUser,deleteUser}=require('../controller/userController');
const {signup,login,isAuthorised,protectRoute,resetpassword,forgetpassword,logout}=require('../controller/authController');
//user s options
userRouter.route('/:id')// url parameter user specific 
.patch(updateUser)
.delete(deleteUser);

userRouter.route('/signup')
.post(signup);

userRouter.route('/login')
.post(login);

// forgt,reset pw
userRouter
.route('/forgetpassword')
.post(forgetpassword);

userRouter
.route('/resetpassword/:token') // this token is unqiue for this link
.post(resetpassword);

userRouter
.route('/logout')
.get(logout);
//profile pg 
userRouter.use(protectRoute);// protect route for chccek if login n all using jwt 
userRouter
.route('/userProfile')
.get(getUser)

// admin speific fun s
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllUser)// this is admin  only



/// cookie router
/*
userRouter.route('/getCookies')
.get(getCookies);
userRouter.route('/setCookies')
.get(setCookies);



*/

module.exports=userRouter;
