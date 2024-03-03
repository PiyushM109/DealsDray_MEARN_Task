import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const EmpList = ({ empList }) => {
    const navigate = useNavigate();
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
  const handelDelete = (empId) => {
    axios
      .delete(`http://localhost:3000/delete/${empId}`,{},{headers:headers})
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = (empId)=>{
    navigate(`/editEmployee/${empId}`);
  }
  return (
    <div className="p-2 m-2">
      <div className="App">
        <div className="App">
          <table className="w-full  border-collapse">
            <thead className="h-[50px] bg-slate-300">
              <tr>
                <th className="border-2 box-border border-black">Unique Id</th>
                <th className="border-2 box-border border-black">Image</th>
                <th className="border-2 box-border border-black">Name</th>
                <th className="border-2 box-border border-black">Email</th>
                <th className="border-2 box-border border-black">Mobile No</th>
                <th className="border-2 box-border border-black">
                  Designation
                </th>
                <th className="border-2 box-border border-black">Gender</th>
                <th className="border-2 box-border border-black">Course</th>
                <th className="border-2 box-border border-black">
                  Create Date
                </th>
                <th className="border-2 box-border border-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {empList.map((emp) => (
                <tr className="h-[50px] " key={emp._id}>
                  <td>{emp.id}</td>
                  <td>{emp.image}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.mobileNo}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.courses.join(", ")}</td>
                  <td>{emp.date}</td>
                  <td>
                    <button className="mx-1 my-1 bg-teal-100 px-5 py-1 rounded-lg drop-shadow-md cursor-pointer hover:bg-teal-200" onClick={()=>{
                        handleEdit(emp._id);
                    }}>
                      Edit
                    </button>
                    <button
                      className="mx-1 my-1 bg-teal-100 px-5 py-1 rounded-lg drop-shadow-md cursor-pointer hover:bg-teal-200"
                      onClick={() => {
                        handelDelete(emp._id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpList;
