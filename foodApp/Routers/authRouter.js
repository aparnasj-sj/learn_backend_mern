const express = require('express');
const authRouter = express.Router(); // mini app


authRouter.route('/signup')
.get(getSignUp)
.post(postSignUp);


function getSignUp(req,res){
    console.log('here');
  res.sendFile('/public/index2.html',{root:__dirname}) ;
}
async function postSignUp(req,res){
    let dataObj=req.body;
    console.log(dataObj);
    let user=await userModel.create(dataObj);

    res.json({'meaasge':'user signed up',data:user});
  
}
module.exports=authRouter;
