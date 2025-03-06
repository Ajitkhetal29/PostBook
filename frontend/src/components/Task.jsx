import React, { useContext } from 'react'
import { assets } from '../assets/images/assets'
import "./task.css"
import { NavLink } from 'react-router-dom'
import { PostBookContext } from '../context/PostBookContext'

const Task = () => {

    const {navigate} = useContext(PostBookContext)
    return (
        <div className='task'>
            <ul>
                <li>
                    <NavLink to={"/addPost"}><img src={assets.addPost} alt="" width="25px" />
                        <span>Add Post</span></NavLink>
                </li>
                <li>

                    <NavLink to={"/friends"}><img src={assets.friends} alt="" width="25px" />
                    <span>Friends</span></NavLink>

                    
                </li>
            </ul>


        </div>
    )
}

export default Task