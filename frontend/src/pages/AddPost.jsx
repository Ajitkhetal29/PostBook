import React, { useRef, useState } from 'react'
import './AddPost.css'

const AddPost = () => {

  const [post, setPost] = useState({
    description: "",
    image: null,
  });


  const handleChange = (e) => {
    setPost({ ...post, description: e.target.value });
  };

  const handleImageChange = (e) => {
    setPost({ ...post, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post submitted:", post);
  };


  return (
    <div className="add-post">
      <form onSubmit={handleSubmit}>
        <h2>Add a Post</h2>
        <div className="form-group">
        <div className="form-group">
          <label>Upload Image</label>
          <input  type="file" onChange={handleImageChange} />
        </div>
          <label>Description</label>
          <textarea
          
            name="description"
            onChange={handleChange}
            placeholder="Write something..."
            required
          ></textarea>
        </div>
        
        <button type="submit">Post</button>
      </form>
    </div>
    

  )
}

export default AddPost