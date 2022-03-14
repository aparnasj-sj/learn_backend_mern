const mongoose = require('mongoose');
const emailValidator=require('email-validator');
const bcrypt = require('bcrypt');
const crypto=require('crypto');

const db_link='mongodb+srv://admin:adminadmin321@cluster0.ie8ur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)// promise based hence can put then
.then(function(db){// gets a database
console.log('review  db connected');
})
.catch(function(err){
    console.log(err);
})

const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:[true, 'review is required']
    },
    rating:{
        type:Number,
        min:1,
        max:10,
        required:[true,'rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:['true','review must belong to a user ']

    }
    ,
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true,'review must belong to a plan']
    }
});
//when any find opertion on this review scehma is done 
reviewSchema.pre(/^find/,function(next){
this.populate({
    path:"user",
    select:"name profileImage"
}).populate("plan");
next();
});
const reviewModel=mongoose.model('reviewModel',reviewSchema);
module.exports=reviewModel;