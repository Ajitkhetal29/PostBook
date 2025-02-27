import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/images/assets'
import "./navbar.css"

const Navbar = () => {
  return (
    <div className=' navbar' >

      <NavLink to={"/"}>  <img   src={assets.logo} alt="" width="40px" /></NavLink>

    

      <ul>
        <li><span><img src={assets.profile} alt="" width="40px" /></span></li>
        <li><span><img src={assets.logout} alt="" width="40px" /></span></li>

      </ul>

    </div>
  )
}

export default Navbar