import React from 'react'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import Task from '../components/Task'

const Home = () => {
  return (
   <>
   <div className='home'>
    <Task/>
   <Posts/>

   </div>
   </>
  )
}

export default Home