import React, { useState } from "react";
import { assets } from "../assets/images/assets";
import "./posts.css";

const Posts = () => {
  const [showComment, setShowComment] = useState(false);

  return (
    <div class="profile">
      {assets.posts.map((post, id) => (
        <div class="card" key={id}>
          <div class="head-div">
            <div class="profile-info">
              <img
                class="profile-pic"
                src={post.user.profilePic}
                alt="Profile"
              />
              <h4>
                <b>{post.user.name}</b>
              </h4>
            </div>
            <p>
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <img
            className="post-image"
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Avatar"
          />
          <p>{post.description}</p>
          <div class="actions">
            <ul>
              <li>
                {post.likes} <img src={assets.like} alt="" width="30px" />{" "}
              </li>
              <li>
                {post.comments.length}{" "}
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
          {showComment && (
            <div className="comments">
              {post.comments.map((comment, id) => (
                <div class="comment" key={id}>
                  <img src={comment.user.profilePic} alt="" />
                  <p>{comment.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Posts;
