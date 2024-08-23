const express=require('express');
const blogcontroller=require('../controller/blogController')
const blogRouter=express.Router();
const verifyToken=require('../middleware/verifyToken');
const uploadImage=require('../middleware/imageUploads');

blogRouter.use(verifyToken)
blogRouter.post('/',uploadImage,blogcontroller.createBlog)
.get('/',blogcontroller.getBlog)
.put('/:id',blogcontroller.updateBlog)
.delete('/:id',blogcontroller.deleteBlog)






module.exports=blogRouter;          