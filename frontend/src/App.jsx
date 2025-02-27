import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddPost from './pages/AddPost';


const App = () => {
  return (
    <div className="container">
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/profile' element={<Profile />} ></Route>
        <Route path='/addPost' element={<AddPost />} ></Route>

      </Routes>
    </div>
  )
}

export default App