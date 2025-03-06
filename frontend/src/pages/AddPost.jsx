import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import "./AddPost.css";
import { PostBookContext } from "../context/PostBookContext.jsx";
import { toast } from "react-toastify";

const AddPost = () => {
  const { backendUrl, userDetails ,navigate} = useContext(PostBookContext);

  const [image, setImage] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append("description", description);
      formData.append("userId", userDetails._id);

      if (image) {
        formData.append("image", image); // Ensure key matches backend
      }

      const response = await axios.post(
        backendUrl + "/api/post/add",
        formData,
        {
          headers: {},
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/')

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add post");
    }
  };

  return (
    <div className="add-post">
      <form onSubmit={handleSubmit}>
        <h2>Add a Post</h2>
        <div className="form-group">
          <div className="form-group">
            <label>Upload Image</label>
            <input
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
            />
          </div>
          <label>Description</label>
          <textarea
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write something..."
            required
          ></textarea>
        </div>

        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default AddPost;
