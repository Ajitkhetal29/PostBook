import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/images/assets'
import "./navbar.css"

const Navbar = () => {
  return (
    <div className=' navbar' >

      <NavLink to={"/"}>  <img   src={assets.logo} alt="" width="40px" /></NavLink>

    

      <ul>
       
        <li> <NavLink to={"/profile"}><span><img src={assets.profile} alt="" width="40px" /></span></NavLink></li>
        <li> <NavLink to={"/logout"}><span><img src={assets.logout} alt="" width="40px" /></span></NavLink></li>


      </ul>

    </div>
  )
}

export default Navbar