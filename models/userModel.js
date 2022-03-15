const mongoose = require('mongoose');
const emailValidator=require('email-validator');
const bcrypt = require('bcrypt');
const crypto=require('crypto');

const db_link='mongodb+srv://admin:adminadmin321@cluster0.ie8ur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)// promise based hence can put then
.then(function(db){// gets a database
console.log('db connected');
})
.catch(function(err){
    console.log(err);
})
//schema 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    }
    , password:{
        type:String,
        required:true,
        minLength:5,
        validate:function(){
            this.confirmPassword==this.password;
        }
    

    },
    confirmPassword:{
        type:String,
        required:true
        ,minLength:5

    },
    role:{
        type:String,
        enum:['admin','user','restaurantowner','deliveryboy'],
        default:'user'
      },
      profileImage:{
        type:String,
        default:'../Images/UserIcon.png'
      },
      resetToken:{
          type:String
      }
});
userSchema.pre('save',function(){
    this.confirmPassword=undefined;
}) 

userSchema.methods.createResetToken=function(){
   // creating unique token using npm i crypto
  const resetToken=crypto.randomBytes(32).toString("hex");
   this.resetToken=resetToken;// schema reset token is assigned te tokn we created now
   console.log(this);
   console.log('this reset token ',this.resetToken); 
   return resetToken;
}

userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    if(password==confirmPassword){
    this.password=password;
    }
    this.resetToken=undefined;// this work over
    console.log('user method exe ');

}
// hooks
/*for now not using this 
userSchema.pre('save',async function(){
// before saving in db execute this
let salt=await  bcrypt.genSalt();
let hashedString=await bcrypt.hash(this.password, salt);

this.password=hashedString;

})
*/ 
 /* userSchema.post('save',function(doc){
    // after saving in db execute this
}) */ 
// model 
const userModel = mongoose.model('userModel', userSchema);
  // name of db , which schema its mapped 
 module.exports=userModel;