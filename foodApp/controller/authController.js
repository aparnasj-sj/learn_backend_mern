//auth login and sign up controller funs file 
const express = require('express');
let userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets').JWT_KEY;


async function getSignUp(req, res) {
    console.log('here');
    res.sendFile('/public/index2.html', { root: __dirname });
}
// sign up user 
module.exports.signup = async function postSignUp(req, res) {
    try {
        let dataObj = req.body;
        console.log(dataObj);
        let user = await userModel.create(dataObj);
        if (!user) { return res.json({ 'message': 'error in user sign up' }); }

        res.json({ 'meaasge': 'user signed up', data: user });
    } catch (err) {
        return res.status(500).json({ 'meaasge': 'user signed up', data: user });
    }

}

// user login
module.exports.login = async function loginUser(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {

                if (user.password == data.password) {
                    // whenevr user log in 


                    //Making signature 
                    let uid = user['_id'];// uid is unique
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: 'user log in sucess  ',
                        userDetails: data
                    });

                } else {
                    return res.json({
                        message: 'wrong credentials '
                    });

                }

            } else {
                return res.json({
                    message: 'user not found'
                });
            }
        } else {
            return res.json({ message: 'please enter valid email' });
        }
    }// try end 
    catch (err) {
        return res.json({
            message: err.message
        })
    }//catch 
}

// is authorised --> checking role

module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();// next to be exe is   is getAllUser fun

        } else {
            return res.status(401).json({
                message: 'operation not allowed'
            });
        }
    }

}

module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        if (req.cookies.login) {
            // verify signature 
            console.log(req.cookies.login);

            let token = jwt.verify(req.cookies.login, JWT_KEY);
            // the payload field in this token is actually our object id
            if (token) {
                const user = await userModel.findById(token.payload);
                // modifying req object by this as  middlware 
                // now get user fun will get all tes attr

                req.role = user.role;
                req.id = user.id;
                next();
            } else {
                return res.json({ 'messgae': 'user not verified , (din get jwt token) ' });
            }

        } else {
            return res.json({ 'messgae': 'login again ' })
        }
    } catch (err) {
        return res.json({ 'error messgae': err });
    }
}

// foget p/w
model.exports.forgetpassword=async function forgetpassword(req, res) {
    let { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        // gen link <-- need token for tis 
        // mail reset link
        if (user) {
            const resetToken = user.createResetToken();
            //http://abc.com/reserpassword/resetToekn
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            //send email to user-->nodemailer
        } else {
            return res.json({ message: 'user not found , pls sign up ' });
        }





    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

module.exports.resetpassword=async function resetpassword(req,res){
    const token=req.params.token;
    let{password,confirmpassword}=req.body;
    const user=await userModel.findOne({resetToken:token});
    // reset p/w handler fun will update usr p/w in db
    if(user){ 
    user.resetPasswordHandler(password,confirmpassword);
     await user.save();
     res.json({
         message:'user password changed succesfuly '
     });
    }else{
        res.json({
            message:'user not found  '
        });

    }
     



}