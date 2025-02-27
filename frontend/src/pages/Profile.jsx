import React from "react";

const Profile = () => {
  return (
    <div className="profile">
      <div className="img-div">
        <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="" />
      </div>

      <div className="info-div">
        <h2>Ajit Khetal</h2>
        <p>
          <span>
            <img src="src/assets/images/email.png" width="25px" alt="" /> :
          </span>
          ajitkhetalofficial@gmail.com
        </p>
        <p>
          <span>Gender :</span>Male
        </p>
        <p>
          <span>DOB :</span>29 Aug 1999
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
