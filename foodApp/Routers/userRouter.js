const express = require('express');
const userRouter = express.Router()

userRouter.route('/')
.get(getUsers)
.post(postUsers)
.patch(updateUsers)
.delete(deleteUsers);

/// cookie router
userRouter.route('/getCookies')
.get(getCookies);
userRouter.route('/setCookies')
.get(setCookies);


// users route functions
async function getUsers(req,res){
    // from DB
    let allUsers=await userModel.find({});
    res.json({'message':'users',data:allUsers});
}
async function postUsers(req,res){
    // from DB
   // let allUsers=await userModel.find();
   // res.json({'message':'users',data:allUsers});
}
async function updateUsers(req,res){
    let dataToBeUpdated=req.body;
    let user=await userModel.findOneAndUpdate({email:"abc@gmail.com"}, dataToBeUpdated,{new: true})
    console.log(dataToBeUpdated,user);
    res.json({'meassde':'updated user',data:user});
}
async function deleteUsers(req,res){
    let dataToBeDeleted=req.body;
    let user=await userModel.findOneAndDelete(dataToBeDeleted)
    console.log(dataToBeDeleted,user);
    res.json({'meassde':'updated user',data:user});
}


function getCookies(req,res){

}
function setCookies(req,res){
  //  res.setHeader('Set-Cookie','isLoggedin=true');
  //  res.send('cookie is set ');
  res.cookie('isLoggedIn',false);
  // if another cookie of same name exists value is replaced 
  res.send('cookie set');



}


module.exports=userRouter;
