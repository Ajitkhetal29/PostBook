import React from 'react'
import { assets } from '../assets/images/assets'
import "./task.css"
import { NavLink } from 'react-router-dom'

const Task = () => {
    return (
        <div className='task'>
            <ul>
                <li>
                    <NavLink to={"/addPost"}><img src={assets.addPost} alt="" width="25px" />
                        <span>Add Post</span></NavLink>
                </li>
                <li>
                    <img src={assets.friends} alt="" width="25px" />
                    <span>Friends</span>
                </li>
            </ul>


        </div>
    )
}

export default Task