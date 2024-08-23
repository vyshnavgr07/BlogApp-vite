import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const BlogCreation = () => {
    const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      blog_title: '',
      blog_image: null,
      blog_description: '',
    },
    validationSchema: Yup.object({
      blog_title: Yup.string().required('Blog title is required'),
      blog_image: Yup.mixed().required('A blog image is required'),
      blog_description: Yup.string().required('Blog description is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const baseurl = import.meta.env.VITE_BASE_URL;
      const token = localStorage.getItem('token');

     
      const formData = new FormData();
      formData.append('blog_title', values.blog_title);
      formData.append('blog_image', values.blog_image);
      formData.append('blog_description', values.blog_description);

      try {
        await axios.post(`${baseurl}api/blog`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });


        resetForm();
        navigate('/')
      } catch (error) {
        console.error('Failed to create blog post:', error);
        
      }
    },
  });

  return (
    <div className='w-full h-screen overflow-hidden flex'>
    <div>
        <Sidebar/>
    </div>
  
    <div className="container mx-auto px-4 py-8 w-full overflow-y-scroll">
      <h1 className="text-4xl font-bold text-center mb-8">Create a New Blog Post</h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Blog Title</label>
          <input
            type="text"
            name="blog_title"
            className="w-full p-2 border rounded"
            value={formik.values.blog_title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.blog_title && formik.errors.blog_title ? (
            <div className="text-red-500 text-sm">{formik.errors.blog_title}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Blog Image</label>
          <input
            type="file"
            name="blog_image"
            className="w-full p-2 border rounded"
            onChange={(event) => formik.setFieldValue('blog_image', event.currentTarget.files[0])}
            onBlur={formik.handleBlur}
          />
          {formik.touched.blog_image && formik.errors.blog_image ? (
            <div className="text-red-500 text-sm">{formik.errors.blog_image}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Blog Description</label>
          <textarea
            name="blog_description"
            className="w-full p-2 border rounded"
            rows="5"
            value={formik.values.blog_description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.blog_description && formik.errors.blog_description ? (
            <div className="text-red-500 text-sm">{formik.errors.blog_description}</div>
          ) : null}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default BlogCreation;
