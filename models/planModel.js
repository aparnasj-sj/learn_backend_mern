const mongoose = require('mongoose');
const emailValidator=require('email-validator');
const bcrypt = require('bcrypt');
const crypto=require('crypto');


const db_link='mongodb+srv://admin:adminadmin321@cluster0.ie8ur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)// promise based hence can put then
.then(function(db){// gets a database
console.log('plan db connected');
})
.catch(function(err){
    console.log(err);
})
//schema 
const planSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20,'plan length should not exceed 20 characters ']
    },
    duration:{
        type:Number,
        required:true,
       
    }
    , price:{
        type:Number,
        required:[true,'price for plan  not entered ']
        
    

    },
    ratingsAverage:{
        type:Number,
        
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100;
        } ,'discount need to be less than 100']
      },
     totalNoOfRatings:{
         type:Number,
         default:0}
         ,
     totalRating:{
        type: Number,
        default:0
     }
});
const planModel = mongoose.model('planModel', planSchema);
// name of db , which schema its mapped 
module.exports=planModel;
(async function createPlan(){
    let planObj={
        name:'chinese food',
        duration:30,
        price:3000,
        ratingsAverage:0,
        discount:20


    }
    const doc=new planModel(planObj);
    await doc.save();
});
