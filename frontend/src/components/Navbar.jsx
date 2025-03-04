import React, { useContext, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/images/assets'
import "./navbar.css"
import { PostBookContext } from '../context/PostBookContext'

const Navbar = () => {

  const {token, setToken, navigate} = useContext(PostBookContext)

  const logout = () => {
    setToken("")
    localStorage.removeItem("token")
  }

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[token])


  return (
    <div className=' navbar' >

      <NavLink to={"/"}>  <img   src={assets.logo} alt="" width="40px" /></NavLink>

      <ul>
       
       {token &&  <li> <NavLink to={"/profile"}><span><img src={assets.profile} alt="" width="40px" /></span></NavLink></li>}
        {token &&  <li onClick={logout}> <NavLink ><span><img src={assets.logout} alt="" width="40px" /></span></NavLink></li>}


      </ul>

    </div>
  )
}

export default Navbar