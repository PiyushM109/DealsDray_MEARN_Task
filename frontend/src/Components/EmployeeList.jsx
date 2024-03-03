import React, { useState } from "react";
import NavBar from "./NavBar";
import Dropdown from "./FormComponent/Dropdown";
import RadioButton from "./FormComponent/RadioButton";

const EmployeeList = () => {
  const options = [
    { label: "HR", value: "HR" },
    { label: "Manager", value: "Manager" },
    { label: "Sales", value: "Sales" },
  ];

  const [gender, setGender] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    console.log(gender);
  };

  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="mt-10">
        <form className="w-6/12 mx-auto px-12 py-3 bg-black left-0 right-0 text-white rounded-lg bg-opacity-30 shadow-xl">
          <h1 className="px-2 mt-4 py-3 font-bold text-2xl">Create Employee</h1>
          <input
            className="px-2 m-2 py-3 w-full bg-gray-600 rounded-md"
            type="text"
            placeholder="Name"
          />
          <input
            className="px-2 m-2 py-3 w-full bg-gray-600 rounded-md"
            type="email"
            placeholder="Email"
          />
          <input
            className="px-2 m-2 py-3 w-full bg-gray-600 rounded-md"
            type="Number"
            placeholder="Mobile No"
          />
          <div className="px-2 m-2 py-3 w-full bg-gray-600 rounded-md cursor-pointer">
            <Dropdown options={options} />
          </div>
          <div className="px-2 m-2 my-3 py-3 w-full  bg-gray-600 text-gray-400 flex rounded-md">
          <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="M"
            checked={gender === "M"}
            onChange={handleGenderChange}
          />
          <label className="font-bold" htmlFor="male">
            M
          </label>
        </div>
        <div className="mx-10">
          <input
            type="radio"
            id="female"
            name="gender"
            value="F"
            checked={gender === "F"}
            onChange={handleGenderChange}
          />
          <label className="font-bold" htmlFor="female">
            F
          </label>
        </div>
          </div>

          <button className="px-2 m-2 py-3 w-full bg-slate-50 rounded-md font-bold text-black hover:bg-slate-300 shadow-sm">
            L O G I N
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeList;
