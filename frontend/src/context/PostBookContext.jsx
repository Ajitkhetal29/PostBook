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

  useEffect(() => {
    fetchAllPost();
  }, [posts, token]);

  useEffect(() => {
    fetchUserDeatils();
    getAllUsers();
  }, [token]);

  const value = {
    token,
    setToken,
    backendUrl,
    navigate,
    userDetails,
    posts,
    users
  };

  return (
    <PostBookContext.Provider value={value}>
      {props.children}
    </PostBookContext.Provider>
  );
};

export default PostBookContextProvider;
