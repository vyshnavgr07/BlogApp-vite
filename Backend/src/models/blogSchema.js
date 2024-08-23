const mongoose=require('mongoose');


const blogSchema=mongoose.Schema({
    userId:{
     type:mongoose.Schema.ObjectId,
     ref:"User",
     required:true
    },
    blog_title:{
        type:String,
        required:true
    },
    blog_image:{        
        type:String,          
        required:true
    },
    blog_description:{
        type:String,
        required:true
    }
})

const Blog=mongoose.model("Blog",blogSchema)


module.exports=Blog;