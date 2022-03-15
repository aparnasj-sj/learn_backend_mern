const express = require('express');
const userRouter = express.Router();//mini app
let userModel = require('../models/userModel');
let cookieParser = require('cookie-parser');
const multer = require('multer')
const { getUser, getAllUser, updateUser, deleteUser,updateProfileImage } = require('../controller/userController');
const { signup, login, isAuthorised, protectRoute, resetpassword, forgetpassword, logout } = require('../controller/authController');
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


// multer for file upload
const multerStorage = multer.diskStorage({
    //stored where and name with which it stored
    destination: function (req, file, cb) {
        cb(null, 'F:/backend_practise_march_22/foodApp/public/images')
    },
    filename: function (req, file, cb) {
        cb(null, `user-${Date.now()}.jpeg`)
    }

});
const filter = function (req, file, cb) {

    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new Error("not an image , please upload an image", false));
    }
}

const upload = multer(
    {
        storage: multerStorage,
        fileFilter: filter
    });


userRouter
    .route('/logout')
    .get(logout);
//profile pg 
// profile image 
userRouter.post("/ProfileImage", upload.single('photo'), updateProfileImage);
//get request
userRouter.get('/ProfileImage', (req, res) => {
    res.sendFile("F:/backend_practise_march_22/foodApp/multer.html");
});

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

module.exports = userRouter;
