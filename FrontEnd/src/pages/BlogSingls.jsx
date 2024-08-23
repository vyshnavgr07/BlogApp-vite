import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import Modal from '../components/Modal';

const BlogSingls = () => {
    const navigate=useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const baseurl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem('token');
  const [modal,setModal]=useState(false)
  const fetchPost = async () => {
    try {
      const response = await axios.get(`${baseurl}api/blog/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPost(response.data.blog);
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id,modal]);

  if (!post) return <div>Loading...</div>;
console.log(modal,"modall");



const handleDelete = async (postId) => {
    try {
        const baseurl = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem('token');
        const response=await axios.delete(`${baseurl}api/blog/${postId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.status===200){
            navigate('/')
        }
        

    } catch (error) {
        console.error('Failed to delete the blog post:', error);
    }
};



  return (
    <div className='w-full h-screen flex overflow-hidden'>
      <div>
        <Sidebar />
      </div>
      <div className="w-full overflow-y-scroll container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Blog Post</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-100">
          <div className="p-6">
            {post?.blog_image && (
              <img
                src={post?.blog_image}
                alt={post?.blog_title}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
            )}
            <div className='sm:flex justify-between items-center '>
                <div>
            <h2 className="text-2xl font-semibold text-black mb-2">
              {post?.blog_title}
            </h2>
            <p className="text-gray-800 mb-4">{post?.blog_description}</p>
            <p className="text-gray-600 text-sm mb-2">
              by post.userId?.userName on new Datepost.createdAt.toLocaleDateString
            </p>
            </div>
            <div className='flex gap-2  float-end m-2'>
            <MdOutlineEdit onClick={()=>setModal(true)}   size={30}  className='rounded-full p-1 hover:bg-gray-400 hover:border  hover:border-b-2'/>
            <MdOutlineDeleteForever onClick={()=>handleDelete(post?._id)}  size={30} className='rounded-full p-1 hover:bg-gray-400 hover:border  hover:border-b-2 '/>
            </div>
            </div>
          </div>
        </div>
      </div>
      {modal && <Modal post={post} setModal={setModal}/>}
    </div>
  );
};

export default BlogSingls;
