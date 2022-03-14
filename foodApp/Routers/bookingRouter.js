const { protectRoute } = require("../controller/authController");
const { createSession } = require("../controller/bookingController");
const express = require('express');
const bookingRouter=express.Router();

bookingRouter.post('/createSession',protectRoute,createSession);
bookingRouter.get('/createSession',function(req,res){
    res.sendFile('F:/backend_practise_march_22/foodApp/booking.html');
})

module.exports=bookingRouter;