import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []); // Ensure this effect runs only once on mount

  if (!loggedIn) {
    return (
      <div>
        <NavBar />
        <div className="my-60 text-center left-0 right-0">
          <h1 className="font-bold text-2xl">
            Please log in to access this page.
          </h1>
          <button
            className="bg-teal-100 m-2 px-5 py-1 rounded-lg drop-shadow-md cursor-pointer font-semibold text-lg hover:bg-teal-200"
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="flex justify-between p-2 m-2">
        <h1 className="font-bold text-lg">Admin DashBoard</h1>
        <div className="bg-teal-100 px-5 py-1 rounded-lg drop-shadow-md cursor-pointer hover:bg-teal-200">
          <h2 className="font-semibold">Create Employee</h2>
        </div>
      </div>
      <div className="my-60 text-center left-0 right-0">
        <h1 className="font-bold text-2xl">Welcome to Admin panel</h1>
      </div>
    </div>
  );
};

export default Dashboard;
