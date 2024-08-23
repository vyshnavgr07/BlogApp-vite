import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Blog from './pages/Blog'
import Home from './pages/Home'
import Sidebar from './components/Sidebar'



function App() {
 

  return (
    <>
<Routes>
<Route path='/'  element={<Home/>}/>
<Route path='/registration'  element={<Registration/>}/>
  <Route path='/login'  element={<Login/>}/>
  <Route path='/blog'  element={<Blog/>}/>
</Routes>
    </>
  )
}

export default App
