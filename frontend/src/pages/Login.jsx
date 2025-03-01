import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { PostBookContext } from "../context/PostBookContext";
import { toast } from "react-toastify"

const Login = () => {
  const { backendUrl, token, setToken , navigate} = useContext(PostBookContext);
  const [currentState, setCurrentState] = useState("Sign in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [DOB, setDOB] = useState("");
  const [Maritial_Status, setMaritial_Status] = useState("");

  const calculateAge = (dob) => {
    setDOB(dob)
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    setAge(age);
  };


  const onSubnitHandler = async (e) => {
    e.preventDefault();

    try {

      if (currentState === "Sign in") {
        
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name, email, password, DOB, age, Maritial_Status
        })        

        if (response.data.success) {
          console.log(response.data);
          
          toast("Sign in Succesfful");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          
        }
        else {
         alert(response.data.message);
        }

      }
      else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });

        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token);
        }
        else {
          alert(response.data.message)
        }

      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  };

  useEffect(()=>{
    if(token){
      navigate("/")
    }
  })

  return (
    <div className="login">
      <form onSubmit={onSubnitHandler}>
        <h2>{currentState}</h2>

        {currentState === "Sign in" && (
          <div class="mb-3">
            <label for="name" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              aria-describedby="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div class="mb-3">
          <label for="email" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
          />
        </div>

        {currentState === "Sign in" && (
          <div class="mb-3">
            <label for="dob" class="form-label">
              Date Of Birth
            </label>
            <input
              type="date"
              class="form-control"
              id="dob"
              aria-describedby="name"
              onChange={(e) => calculateAge(e.target.value)}
            />
          </div>

        )}
        {currentState === "Sign in" && (
          <div class="mb-3">
            <label for="maritial_status" class="form-label">
              Maritial Status
            </label>
            <select onChange={(e) => setMaritial_Status(e.target.value)} name="maritial_status" id="maritial_status">
              <option value=""></option>
              <option value="Single">Single</option>
              <option value="Marriend">Marriend</option>
              <option value="Prefer Not to say">Prefer Not to say</option>
            </select>
          </div>
        )}

        <div class="mb-3">
          <label for="pass" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="pass"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {currentState === "Sign in" ? (
          <button type="submit" class="btn btn-primary">
            Sign in
          </button>
        ) : (
          <button type="submit" class="btn btn-primary">
            Login
          </button>
        )}


        {currentState === "Sign in" ? (
          <p>
            Already Have an account ?{" "}
            <span
              onClick={() => {
                setCurrentState("Login");
              }}
            >
              Login
            </span>
          </p>
        ) : (
          <p>
            Dont have Have an account ?{" "}
            <span
              onClick={() => {
                setCurrentState("Sign in");
              }}
            >
              Sign in
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
