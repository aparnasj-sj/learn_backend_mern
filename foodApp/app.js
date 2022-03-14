const express = require('express'); /// returns a function
const app = express(); // invoke the function
let  cookieParser = require('cookie-parser'); 
const planModel=require('./models/planModel');
var cors = require('cors')
// Server setup
app.listen(5000 , ()=>{
	console.log("server running");
});
app.use(cors())
//Calling the express.json() method for parsing
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//const authRouter = require('./Routers/authRouter');
const userRouter = require('./Routers/userRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
const bookingRouter=require('./Routers/bookingRouter');

//app.use('/auth',authRouter);
app.use('/user',userRouter);
app.use('/plans',planRouter);
app.use('/review',reviewRouter);
app.use('/booking',bookingRouter);


