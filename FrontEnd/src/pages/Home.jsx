import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  const baseurl=import.meta.env.VITE_BASE_URL;
  const token=localStorage.getItem('token')
  const [data,setData]=useState(null)
  
const fetchData=async()=>{
try {
  const response = await axios.get(`${baseurl}api/blog`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
setData(response?.data.blog)
console.log(response.data.blog,"resss");

} catch (error) {
  console.log(error);
  
}
  }


useEffect(()=>{
fetchData()
},[])



const handleClick=(id)=>{
   navigate(`/blog/${id}`)
}

  return (
    <div className='w-full h-screen flex overflow-hidden'>
       <div>
        <Sidebar/>
        </div>
      
         <div className="w-full overflow-y-scroll container mx-auto px-4 py-8 ">
        <h1 className="text-4xl font-bold text-center mb-8">Blog Posts</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((post,i)=> (
            <div key={i}  
            onClick={()=>handleClick(post?._id)}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <div className="p-6">
              {post?.blog_image && (
                  <img
                    src={post.blog_image}
                    alt={post.blog_title}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                )}
                <h2
                  className="text-2xl font-semibold text-black mb-2 cursor-pointer hover:text-blue-600"
                >
                  {post?.blog_title}
                </h2>
                <p className="text-gray-800 mb-4">{post?.blog_description}</p>
                <p className="text-gray-600 text-sm mb-2">
                  by post.userId?.userName on ew Date
                </p>
             
              </div>
            </div>
          ))}
        </div>
      </div>

       

    </div>
  )
}

export default Home