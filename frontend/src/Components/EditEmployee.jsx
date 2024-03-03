import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import Dropdown from "./FormComponent/Dropdown";
import { useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const options = ["HR", "Manager", "Sales"];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [gender, setGender] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { empId } = useParams();
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/${empId}`, { headers: headers })
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setMobileNo(res.data.mobileNo);
        setSelectedOption(res.data.designation);
        setGender(res.data.gender);
        setCourse(res.data.courses);
        setImage(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSkillChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCourse((prevSkills) => [...prevSkills, value]);
    } else {
      setCourse((prevSkills) => prevSkills.filter((skill) => skill !== value));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  const MAX_MOBILE_LENGTH = 10;

  const handleMobileNoChange = (event) => {
    // Limiting mobile number length dynamically
    const value = event.target.value;
    if (value.length <= MAX_MOBILE_LENGTH) {
      setMobileNo(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      email: email,
      mobileNo: mobileNo,
      gender: gender,
      designation: selectedOption,
      courses: course,
      image: image,
    };
    axios
      .put(
        `http://localhost:3000/updateEmployee/${empId}`,
        {
          data,
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="mt-10">
        <form
          onSubmit={handleSubmit}
          className="w-5/12 min-w-[400px] mx-auto px-12 py-3 bg-black left-0 right-0 text-white rounded-lg bg-opacity-30 shadow-xl"
        >
          <h1 className="px-2 mt-4 py-3 font-bold text-2xl">Create Employee</h1>
          <input
            className="px-2 m-2 py-3 w-full bg-gray-600 rounded-md"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="px-2 m-2 py-3 w-full bg-gray-600 rounded-md"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-2 m-2 py-3 w-full bg-gray-600 rounded-md"
            type="number"
            placeholder="Mobile No"
            value={mobileNo}
            onChange={(e) => handleMobileNoChange(e)}
          />
          <div className="px-2 m-2 py-3 w-full bg-gray-600 rounded-md cursor-pointer">
            <Dropdown
              options={options}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>
          <div className="px-2 m-2 my-3 py-3 w-full bg-gray-600 text-gray-400 flex rounded-md">
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
          <div className="px-2 m-2 my-3 py-3 w-full bg-gray-600 text-gray-400 flex rounded-md">
            <input
              type="checkbox"
              id="mca"
              name="skill"
              value="MCA"
              checked={course.includes("MCA")}
              onChange={handleSkillChange}
            />
            <label htmlFor="mca"> MCA</label>
            <input
              type="checkbox"
              id="bca"
              name="skill"
              value="BCA"
              checked={course.includes("BCA")}
              onChange={handleSkillChange}
            />
            <label htmlFor="bca"> BCA</label>
            <input
              type="checkbox"
              id="bsc"
              name="skill"
              value="BSC"
              checked={course.includes("BSC")}
              onChange={handleSkillChange}
            />
            <label htmlFor="bsc"> BSC </label>
          </div>
          <input
            className="px-2 m-2 py-3 w-full bg-gray-600 rounded-md"
            type="text"
            placeholder="Image Link"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button
            type="submit"
            className="px-2 m-2 py-3 w-full bg-slate-50 rounded-md font-bold text-black hover:bg-slate-300 shadow-sm"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
