import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const PostBookContext = createContext();

const PostBookContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [friendList, setFriendList] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const fetchUserDeatils = async () => {
    try {
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/user/details",
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          setUserDetails(response.data.userInfo);
        } else {
          console.log(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const fetchAllPost = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/post/allPosts");
      if (response.data.success) {
        setPosts(response.data.Posts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/user/allUsers");
      if (response.data.success) {
        setUsers(response.data.allUsers);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const sendFreindRequest = async (receiverId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/sendFriendRequest/${receiverId}`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        toast(response.data.message);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const acceptFriendRequest = async (senderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/acceptFriendRequest/${senderId}`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        toast(response.data.message);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllfriendRequests = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/getAllfriendRequests",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setFriendRequest(response.data.friendRequests);
      } else {
        // toast(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllfriends = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/getAllfriends",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setFriendList(response.data.friends);
      } else {
        // toast(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const Removefriendrequest = async (requestId) => {
    console.log(requestId);
    
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/removeFriendRequest/${requestId}`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        toast(response.data.message);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removefreind = async (friendId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/removefreind/${friendId}`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        toast(response.data.message);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllPost();
  }, [token]);

  useEffect(() => {
    fetchUserDeatils();
    getAllUsers();
    getAllfriendRequests();
    getAllfriends();
  }, [token, userDetails]);

  const value = {
    token,
    setToken,
    backendUrl,
    navigate,
    userDetails,
    posts,
    users,
    friendRequest,
    sendFreindRequest,
    acceptFriendRequest,
    friendList,
    Removefriendrequest,
    removefreind
  };

  return (
    <PostBookContext.Provider value={value}>
      {props.children}
    </PostBookContext.Provider>
  );
};

export default PostBookContextProvider;
