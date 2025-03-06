import React, { useContext } from "react";
import { PostBookContext } from "../context/PostBookContext";

const Friends = () => {
  const { posts, userDetails, token, backendUrl, users } = useContext(PostBookContext);

  return <div>

    {users.map((user, id) => (
        <div key={id} className="user">
            {user.name === userDetails.name ? "You" : user.name}
        </div>
    )) }

  </div>;
};

export default Friends;
