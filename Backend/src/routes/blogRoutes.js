const express=require('express');
const blogcontroller=require('../controller/blogController')
const blogRouter=express.Router();
const verifyToken=require('../middleware/verifyToken');
const uploadImage=require('../middleware/imageUploads');

blogRouter.use(verifyToken)
blogRouter.post('/',uploadImage,blogcontroller.createBlog)
.get('/',blogcontroller.getBlog)
.get('/:id',blogcontroller.getBlogById)
.put('/:id',blogcontroller.updateBlog)
.delete('/:id',blogcontroller.deleteBlog)
.post('/comment/:blogId',blogcontroller.addComment)
.get('/comment/:id',blogcontroller.getComment)


   


module.exports=blogRouter;          