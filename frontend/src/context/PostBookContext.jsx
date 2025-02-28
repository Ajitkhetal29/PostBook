import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PostBookContext = createContext();

const PostBookContextProvider = (props) => {
  const [token, setToken] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL
const navigate = useNavigate();
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    
    token,
    setToken,
    backendUrl,
    navigate,
  };

  return <PostBookContext.Provider value={value}>{props.children}</PostBookContext.Provider>;
};

export default PostBookContextProvider;
