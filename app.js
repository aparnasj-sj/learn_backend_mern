const express = require('express'); /// returns a function
const app = express(); // invoke the function
const mongoose = require('mongoose');

    
// Server setup
app.listen(3000 , ()=>{
	console.log("server running");
});
//Calling the express.json() method for parsing
app.use(express.json());


app.use(express.urlencoded({ extended: true }));


const authRouter = express.Router()
const router = express.Router()
app.use('/auth',authRouter);
app.use('/users',router);
authRouter.route('/signup')
.get(getSignUp)
.post(postSignUp);
router.route('/')
.get(getUsers)
.post(postUsers)
.patch(updateUsers)
.delete(deleteUsers);
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
        unique:true
    }
    , password:{
        type:String,
        required:true,
        minLength:5
    

    },
    confirmPassword:{
        type:String,
        required:true
        ,minLength:5

    }
});

// model 
const userModel = mongoose.model('userModel', userSchema);
  // name of db , which schema its mapped 
 /*(async function createUser(){
      let user={
          name:'abhi',
          email:'abc@gmail.com',
          password:'1234567',
          confirmPassword:'1234567'
      }
      // using functions in model we wanna insert tis to db
    let data= await userModel.create(user);
    console.log(data); 
  })();*/