const mongoose = require('mongoose');
const emailValidator=require('email-validator');
const bcrypt = require('bcrypt');
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

    }
});
// hooks
userSchema.pre('save',async function(){
// before saving in db execute this
let salt=await  bcrypt.genSalt();
let hashedString=await bcrypt.hash(this.password, salt);
console.log('hshed string '+hashedString);
this.password=hashedString;

})
userSchema.post('save',function(doc){
    // after saving in db execute this
})
// model 
const userModel = mongoose.model('userModel', userSchema);
  // name of db , which schema its mapped 
 module.exports=userModel;