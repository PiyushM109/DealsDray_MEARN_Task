import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const logIn = (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/login";
    const headers = {
        username : user,
        password : pass,
    }

    axios.post(url, {}, { headers }).then(res =>{
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        navigate("/dashboard");

    }).catch((err)=>{
        console.log(err);
        alert("Invalid credentials");
    })
    
    
    setUser("");
    setPass("");
  };

  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="mt-28">
      <form
        className="w-3/12 mx-auto p-12 my-30 bg-black left-0 right-0 text-white rounded-lg bg-opacity-30 shadow-xl"
        onSubmit={logIn}
      >
        <h1 className="px-2 m-2 py-3 font-bold text-2xl">LOGIN</h1>
        <input
          className="px-2 m-2 py-3 w-full bg-gray-600 rounded-md"
          type="text"
          placeholder="User Name"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <input
          className="px-2 m-2 py-3 w-full bg-gray-600 rounded-md"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <button className="px-2 m-2 py-3 w-full bg-slate-50 rounded-md font-bold text-black hover:bg-slate-300 shadow-sm">
          L O G I N
        </button>
      </form>
      </div>
    </div>
  );
};

export default Login;
