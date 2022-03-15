const express = require('express');
const planRouter = express.Router();//mini app
let planModel=require('../models/planModel');
let  cookieParser = require('cookie-parser');
const { protectRoute,isAuthorised } = require('../controller/authController');
const{getPlan,getAllPlans,createPlan,updatePlan,deletePlan,top3Plans}=require('../controller/planController');



//all plans available 
planRouter.route('/allPlans')
.get(getAllPlans)


//own plan --> protect route chck if logged in or not 
planRouter.use(protectRoute);
planRouter.route('/plan/:id')
.get(getPlan)


// tes 3 routed avaible only for admin or restauratn owner
//already loggen in checked by protect route at top

planRouter.use(isAuthorised(['admin','owner']));
planRouter
.route('/crudPlan')
.post(createPlan)


planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)


module.exports=planRouter;


