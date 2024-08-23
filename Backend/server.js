const app =require('../Backend/app');
const http=require('http');
const env=require('dotenv');
env.config({path:'./.env'});
const port=process.env.PORT;
const mongoose=require('mongoose');


mongoose.connect(process.env.DATABASE_URL,{dbName:'Blog'})
.then(()=>{
    console.log("Db connected succefully");
    
})
.catch((err)=>{
    console.log("error connecting to database",err);
    
})

const server=http.createServer(app); 

server.listen(port,()=>{
    console.log(`server is listening on ${port}`);
    
})