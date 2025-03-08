import React, { useContext, useEffect, useState } from "react";
import { PostBookContext } from "../context/PostBookContext";
import { assets } from "../assets/images/assets";

const Friends = () => {
  const {
    posts,
    userDetails,
    token,
    backendUrl,
    users,
    friendRequest,
    friendList,
    sendFreindRequest,
    acceptFriendRequest,
    Removefriendrequest,
    removefreind
  } = useContext(PostBookContext);

  const [others, setOthers] = useState([]);

  console.log(friendList);
  

  const handleOthers = async () => {
    var otherPeople = users.filter((user) => !friendList.includes(user._id));
    otherPeople = otherPeople.filter((user) => user._id !== userDetails._id);
    setOthers(otherPeople);
  };

  useEffect(() => {
    handleOthers();
  }, [users, friendList, userDetails]);


  return (
    <div className="friends">
      <div>
        <h2>{userDetails.name}</h2>
      </div>
      <hr />

      <div>
        <h2>friend </h2>
        <hr />
        <ul>
          {friendList &&
            friendList.map((friend, id) => (
              <li key={id}>
                {friend}
                <img src={assets.remove_friend} alt="" onClick={()=>removefreind(friend)} />
              </li>
            ))}
        </ul>
      </div>

      <div>
        <h2>Friend Requests</h2>
        <hr />
        <ul>
          {friendRequest &&
            friendRequest.map((friend, id) => (
              <li key={id}>
                {friend.userId}{" "}
                <img
                  src={assets.remove_friend}
                  onClick={() => Removefriendrequest(friend._id)}
                  alt=""
                />{" "}
                <img
                  src={assets.add_friend}
                  alt=""
                  onClick={() => acceptFriendRequest(friend._id)}
                />
              </li>
            ))}
        </ul>
      </div>

      <div>
        <h2>You might know</h2>
        <hr />
        {others.map((user, id) => (
          <div key={id} className="user">
            {user.name === userDetails.name ? "" : user.name}
            <img
              onClick={() => sendFreindRequest(user._id)}
              src={assets.add_friend}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
