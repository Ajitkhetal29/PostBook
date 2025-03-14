import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AddPost from "./pages/AddPost";
import { ToastContainer } from "react-toastify";
import { PostBookContext } from "./context/PostBookContext";
import Friends from "./pages/Friends";

const App = () => {

    const { token } = useContext(PostBookContext);
  


  return (
    <div className="container">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={< Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/addPost" element={<  AddPost token={token} />}></Route>
        <Route path="/friends" element={<Friends/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
