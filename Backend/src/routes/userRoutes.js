const express=require('express');
const userController=require('../controller/userController');
const userRouter=express.Router();
const profileUploads=require('../middleware/profileUpload')
const verifyToken =require('../middleware/verifyToken');



userRouter.post('/registration',profileUploads,userController.registration)
.post('/login',userController.login)
userRouter.use(verifyToken)
.get('/',userController.getUser)



    










module.exports=userRouter;