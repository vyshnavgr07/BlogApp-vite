const express=require('express');
const userController=require('../controller/userController');
const userRouter=express.Router();



userRouter.post('/registration',userController.registration)
.post('/login',userController.login)














module.exports=userRouter;