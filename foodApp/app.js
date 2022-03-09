const express = require('express'); /// returns a function
const app = express(); // invoke the function
let userModel=require('./models/userModel');
var cookieParser = require('cookie-parser');
// Server setup
app.listen(3000 , ()=>{
	console.log("server running");
});
//Calling the express.json() method for parsing
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authRouter = require('./Routers/authRouter');
const userRouter = require('./Routers/userRouter');

app.use('/auth',authRouter);
app.use('/users',userRouter);


