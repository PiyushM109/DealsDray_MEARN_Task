import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  //   console.log(headers);
  useEffect(() => {
    axios
      .get("http://localhost:3000/me", { headers: headers })
      .then((response) => {
        if (response.data.username) {
          setUserName(response.data.username);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (username === "") {
    return (
      <div className="bg-slate-50 p-2 drop-shadow-md flex justify-between">
        <img className="w-20 drop-shadow-lg" src="logo.png" alt="logo" />
      </div>
    );
  }
  return (
    <div className="bg-slate-50 p-2 drop-shadow-md flex justify-between">
      <img className="w-20 drop-shadow-lg" src="logo.png" alt="logo" />
      <h3>Home</h3>

      <h3>Employee List</h3>

      <h3>{username}</h3>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >logout</button>
    </div>
  );
};

export default NavBar;
