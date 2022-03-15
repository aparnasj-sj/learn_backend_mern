const res = require('express/lib/response');
let userModel=require('../models/userModel');
const crypto=require('crypto');

// users route functions
module.exports.getAllUser=async function getAllUsers(req,res){
    // from DB
    let allUsers=await userModel.find({});
   return res.json({'message':'all users reterived ',data:allUsers});
}

module.exports.updateUser=async function updateUsers(req,res){
    try{
    let id=req.params.id;
    let user =await userModel.findById(id);
    let dataToBeUpdated=req.body;
    if(user){
        for(key in dataToBeUpdated){
            user[key]=dataToBeUpdated[key];// update tose keys given for update only , no need to replace full object
        }
        const updatedData= await user.save();
       return res.json({'message':'updated user',data:user});
    }else{

       return res.json({'message':'error in updating  user'});
    }
   // let user=await userModel.findOneAndUpdate({email:"abc@gmail.com"}, dataToBeUpdated,{new: true})
}catch(err){
    return res.json({'error message':err});
}
   
}
module.exports.deleteUser=async function deleteUsers(req,res){
    try{
    let id=req.params.id;
    let user=await userModel.findByIdAndDelete(id)
    if(!user){ res.json({'message':'user not found'});}
    console.log(dataToBeDeleted,user);
    res.json({'message':'updated user',data:user});
    }catch(err){
        res.json({'error message':err});
    }
}

module.exports.getUser=async function getUser(req,res){
    let id=req.id;
    let user=await userModel.findById(id);
    if(user){
          return res.json({'user':user});
    }else{
        return res.json({'message':'user not found '});
    }
}
/*
function getCookies(req,res){

}
function setCookies(req,res){
  //  res.setHeader('Set-Cookie','isLoggedin=true');
  //  res.send('cookie is set ');
  res.cookie('isLoggedIn',false);
  // if another cookie of same name exists value is replaced 
  res.send('cookie set');



}*/

module.exports.updateProfileImage=async function(req,res){
   // let user_id=req.id;
   // let user= await userModel.findById(user_id);
  //  user.profileImage=req.imageLocation;
  //  await user.save();
    res.json({
        message:"file uploaded successfuly"
    })
}