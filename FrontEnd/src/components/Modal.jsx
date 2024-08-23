import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ post, setModal, refreshPost }) => {
    // Updated state variable names
    const [blog_title, setBlog_title] = useState(post?.title || '');
    const [blog_description,setBlog_description] = useState(post?.content || '');

    const updatePost = async (updatedPost) => {
        const baseurl = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem('token');

        try {
            await axios.put(`${baseurl}api/blog/${post._id}`, updatedPost, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
           
            refreshPost();
            setModal(false);
        } catch (error) {
            console.error('Failed to update the blog post:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPost = {blog_title,blog_description };
        updatePost(updatedPost);
        setModal(false)
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Update Blog</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={blog_title}
                            onChange={(e) => setBlog_title(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Content</label>
                        <textarea
                            className="w-full p-2 border rounded"
                            rows="5"
                            value={blog_description}
                            onChange={(e) => setBlog_description(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="bg-gray-500 text-white px-4 py-2 mr-2 rounded" onClick={() => setModal(false)}>Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
