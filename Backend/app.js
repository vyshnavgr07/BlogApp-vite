const express=require('express');
const app=express();
const userRouter=require('../Backend/src/routes/userRoutes')
const blogRouter=require('../Backend/src/routes/blogRoutes')
const cors=require('cors')
app.use(express.json())
app.use(cors());
app.use('/api/user',userRouter)
app.use('/api/blog',blogRouter)

      





module.exports=app;