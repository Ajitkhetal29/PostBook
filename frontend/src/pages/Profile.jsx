import React, { useContext } from "react";
import { PostBookContext } from "../context/PostBookContext";


const Profile = () => {

  const {userDetails} = useContext(PostBookContext)

  return (
    <div className="profile">
      <div className="img-div">
        <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="" />
      </div>

      <div className="info-div">
        <h2>{userDetails.name}</h2>
        <p>
          <span>
            <img src="src/assets/images/email.png" width="25px" alt="" /> :
          </span>
          {userDetails.email}
        </p>
        <p>
          <span>Gender :</span>{userDetails.gender}
        </p>
        <p>
          <span>DOB :</span>{new Date(userDetails.DOB).toDateString()}
        </p>
        <p>
          <span>Friends :</span>50
        </p>
        <p>
          <span>Joined On :</span>10 June 2006
        </p>
        <div>
          <button>Edit Profile</button>
          <button>Reset Password</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
