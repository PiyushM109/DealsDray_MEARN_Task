import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import HeadBar from "./HeadBar";
import axios from "axios";
import EmpList from "./EmpList";

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [empList, setempList] = useState([]);
  const navigate = useNavigate();

  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      // console.log("Piyus");
      axios
        .get("http://localhost:3000/empList", { headers:headers })
        .then((res) => {
          setempList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }
  }, []); 
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
      <HeadBar len={empList.length}/>
      {empList.length!=0 && <EmpList empList={empList}/>}

      {empList.length==0 && <div className="my-60 text-center left-0 right-0">
        <h1 className="font-bold text-2xl">Welcome to Admin panel</h1>
      </div>}
    </div>
  );
};

export default Dashboard;
