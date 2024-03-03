import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import HeadBar from "./HeadBar";
import axios from "axios";
import EmpList from "./EmpList";

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [empList, setempList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterList, setFilterList] = useState([]);
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
        .get("http://localhost:3000/empList", { headers: headers })
        .then((res) => {
          setempList(res.data);
          setFilterList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);
  const handleSearch = (event) => {
    event.preventDefault();
    const filt = empList.filter((emp) =>
    emp.name.toLowerCase().includes(searchText.toLowerCase())
  );
    setFilterList(filt);
  };
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
      <HeadBar len={empList.length} />
      <div className="flex justify-end px-3">
        <form onSubmit={handleSearch}>
          <input
            className="border border-gray-200 rounded-lg px-2 py-1 drop-shadow-sm"
            type="text"
            placeholder="Search Employee"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button className="bg-teal-100 px-5 py-1 mx-2 rounded-lg drop-shadow-md cursor-pointer hover:bg-teal-200 font-semibold">
            Search
          </button>
        </form>
      </div>
      {empList.length != 0 && <EmpList empList={filterList} />}

      {empList.length == 0 && (
        <div className="my-60 text-center left-0 right-0">
          <h1 className="font-bold text-2xl">Welcome to Admin panel</h1>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
