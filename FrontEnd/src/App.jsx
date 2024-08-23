import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Blog from './pages/Blog'
import Home from './pages/Home'
import Sidebar from './components/Sidebar'
import BlogSingls from './pages/BlogSingls'
import Modal from './components/Modal'
import BlogCreation from './pages/BlogCreation'




function App() {
 

  return (
    <>

<Routes>
<Route path='/'  element={<Home/>}/>
<Route path='/registration'  element={<Registration/>}/>
  <Route path='/login'  element={<Login/>}/>
  <Route path='/blog'  element={<Blog/>}/>
  <Route path='/blog/:id'  element={<BlogSingls/>}/>
  <Route path='/blogcreation'  element={<BlogCreation/>}/>
</Routes>
    </>
  )
}

export default App
