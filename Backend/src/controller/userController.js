const User=require('../models/userSchema');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const {joiUserSchema}=require('../models/validateSchema')
const registration=async(req,res)=>{
try {
    const {value,error}=joiUserSchema.validate(req.body);
    console.log(req.body,"reqq");
    
   console.log(value,"value");
   
    if(error){
        console.log("Validation Error:", error.details);
        return  res.status(400).json({
         status:'failed',
            message:'user credentials incomplete',
          })
    } 
   const{username,email,profilePic,password}=value;

   const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            status:'failed',   
            message:'user already exist' 
        })
    }

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);
const user=new User({username,email,password:hash,profilePic});   
const savedUser=await user.save();

return res.status(201).json({
    status:'success',
    message:'succesfully registered',
    savedUser
})



} catch (error) {
    console.log(error);
    return res.status(500).json({
        status:'failed',
        message:'internal server error'
    })
    
}
}


const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(200).json({
                status:'failed',
                message:'user credentails not complete'
            })
        }

        const existingUser=await User.findOne({email});
        const istrue=await bcrypt.compareSync(password,existingUser.password); 
         if(istrue){
            const token=await jwt.sign({
                data:existingUser
              },process.env.SECRET,{ expiresIn: 60 * 60 });

              return res.status(200).json({
                status:'success',
                message:'succesfully logedin',
                token
            })

         }else{
            return res.status(400).json({
                status:'failed',   
                message:'user not  exist'
            })
        
         }
        
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:'failed',
            message:'internal server error'
        })
    }
}











module.exports={registration,login}