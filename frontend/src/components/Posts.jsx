import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/images/assets";
import axios from "axios";
import { toast } from "react-toastify";
import "./posts.css";
import { PostBookContext } from "../context/PostBookContext";

const Posts = () => {
  const [showComment, setShowComment] = useState(false);
  const { posts, userDetails, token, backendUrl } = useContext(PostBookContext);
  const [commentText, setcommentText] = useState("");
  const [postComments, setPostComments] = useState([]);

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/post/like/${postId}`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        console.log(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to like post");
    }
  };

  const handlePostComment = async (postId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/post/addComment/${postId}`,
        { commentText },
        { headers: { token } }
      );
      if (response.data.success) {
        toast(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setcommentText("");
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  const getAllComment = async (postId) => {
    setShowComment(!showComment);
    setPostComments([]);
    try {
      const response = await axios.post(
        `${backendUrl}/api/post/allComment/${postId}`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setPostComments(response.data.comments);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/post/deleteComment/${postId}/${commentId}`
      );

      if (response.data.success) {
        setPostComments(response.data.comments);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  useEffect(() => {}, [showComment]);

  return (
    <div class="profile">
      {posts.map((post, id) => (
        <div class="card" key={id}>
          <div class="head-div">
            <div class="profile-info">
              <img
                class="profile-pic"
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Profile"
              />
              <h4>
                <b>{post.userId.name}</b>
              </h4>
            </div>
          </div>

          {post.image && (
            <img className="post-image" src={post.image} alt="Avatar" />
          )}

          <p>{post.description}</p>
          <div class="actions">
            <ul>
              <li>
                {post.likes.length}{" "}
                {post.likes.includes(userDetails._id) ? (
                  <img
                    onClick={() => handleLike(post._id)}
                    src={assets.like_fill}
                    alt=""
                    width="30px"
                  />
                ) : (
                  <img
                    onClick={() => handleLike(post._id)}
                    src={assets.like}
                    alt=""
                    width="30px"
                  />
                )}
              </li>
              <li>
                {post.comments.length}
                <img
                  onClick={() => getAllComment(post._id)}
                  src={assets.comment}
                  width="30px"
                />
              </li>
            </ul>
            <span>
              <img src={assets.save} alt="" width="30px" />
            </span>
          </div>
          {showComment && (
            <div className="comments">
              {post.comments.map((comment, id) => (
                <div class="comment" key={id}>
                  {/* <img src={comment.userId.name} alt="" /> */}
                  <p>{comment.text}</p>
                  {userDetails._id === comment.userId._id
                    ? "You"
                    : comment.userId.name}
                  {userDetails._id === comment.userId._id ? (
                    <img src={assets.bin} alt="" onClick={()=>deleteComment(post._id, comment._id)} srcset="" />
                  ) : (
                    ""
                  )}
                </div>
              ))}
              <div className="postComment">
                <input
                  type="text"
                  onChange={(e) => setcommentText(e.target.value)}
                />
                <button onClick={() => handlePostComment(post._id)}>
                  <img src={assets.send} alt="" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Posts;
