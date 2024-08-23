import React from 'react'

const Blog = () => {
 
  return (
    <div>
         <div className="container mx-auto px-4 py-8 ">
        <h1 className="text-4xl font-bold text-center mb-8">Blog Posts</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(10)].map(post => (
            <div  className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <div className="p-6">
                <h2
                  
                  className="text-2xl font-semibold text-black mb-2 cursor-pointer hover:text-blue-600"
                >
                  post.title
                </h2>
                <p className="text-gray-800 mb-4">post.content</p>
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

export default Blog