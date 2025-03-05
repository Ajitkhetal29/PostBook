import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/images/assets";
import axios from "axios";
import { toast } from "react-toastify";
import "./posts.css";
import { PostBookContext } from "../context/PostBookContext";

const Posts = () => {
  const [showComment, setShowComment] = useState(false);
  const { posts, userDetails, token, backendUrl } = useContext(PostBookContext);

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
                <img
                  onClick={() => setShowComment(!showComment)}
                  src={assets.comment}
                  width="30px"
                />
              </li>
            </ul>
            <span>
              <img src={assets.save} alt="" width="30px" />
            </span>
          </div>
          {/* {showComment && (
            <div className="comments">
              {post.comments.map((comment, id) => (
                <div class="comment" key={id}>
                  <img src={comment.user.profilePic} alt="" />
                  <p>{comment.comment}</p>
                </div>
              ))}
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default Posts;
