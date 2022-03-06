const express = require('express'); /// returns a function
const app = express(); // invoke the function


    
// Server setup
app.listen(3000 , ()=>{
	console.log("server running");
});
//Calling the express.json() method for parsing
app.use(express.json());
const authRouter = express.Router()
app.use('/auth',authRouter);
authRouter.route('/signup')
.get(getSignUp)
.post(postSignUp);
function getSignUp(req,res){
  res.sendFile('/public/index.html',{root:__dirname}) ;
}
function postSignUp(req,res){
    let obj=req.body;
    res.json({
        message:'usersigned up ',
        data:obj
    });
}




