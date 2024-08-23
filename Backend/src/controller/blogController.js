const Blog=require('../models/blogSchema');
const mongoose=require('mongoose')


const createBlog=async(req,res)=>{
    try {
        const decoded=req.decoded;
        const{blog_title,blog_image,blog_description}=req.body;
        const userid=decoded.data._id;
  
        
        if(!blog_title || !blog_image || !blog_description){
          return   res.status(400).json({
                 status:'failed',
                 message:'user credentials incomplete'
             })
         } 

         const blog=await new Blog({userId:userid,blog_title,blog_image,blog_description});
         const savedBlog=await blog.save();

            return res.status(201).json({
             status:'success',
             message:'succesfully created',
             savedBlog
        })

         } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:'failed',
            message:'internal server error'
        })
         }
}

const getBlog=async(req,res)=>{
    try {
        const blog=await Blog.find();
        return res.status(201).json({
            status:'success',
            message:'succesfully fetched',
            blog
       })
     } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:'failed',
            message:'internal server error'
        })
    }
}

const updateBlog = async (req, res) => {
    try {
        const id=req.params.id;
      const data = req.body;
      console.log(data,"datum");
      
      const blogUpdate = await Blog.findOneAndUpdate(
        { _id:id},
        { ...data },
        { new: true }
      );
  
      return res.status(200).json({
        status: "success",
        message: "Successfully updated",
        blogUpdate,
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "Internal server error",
      });
    }
  };


  const deleteBlog=async(req,res)=>{
    try {
        const id=req.params.id
        const deletedBlog=await Blog.findOneAndDelete({_id:id})
        return res.status(200).json({
            status: "success",
            message: "Successfully deleted",
            deletedBlog
          });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "failed",
            message: "Internal server error",
          });
    }
  }

  
const getBlogById=async(req,res)=>{
  try {
    const {id}=req.params;
    console.log(id,"idddd");
    
  
    
      const blog=await Blog.findById({_id:id});
      return res.status(200).json({
          status:'success',
          message:'succesfully fetched',
          blog
     })
   } catch (error) {
      console.log(error);
      return res.status(500).json({
          status:'failed',
          message:'internal server error'
      })
  }
}

  

module.exports={createBlog,getBlog,updateBlog,deleteBlog,getBlogById}

