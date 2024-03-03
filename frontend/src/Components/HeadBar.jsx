import React from 'react'
import { useNavigate } from 'react-router-dom'
const HeadBar = ({len}) => {
    const navigate = useNavigate();
    const handleButton = ()=>{
        navigate("/createEmployee");
    }
  return (
    <div className="flex justify-between p-2 m-2">
        <h1 className="font-bold text-lg">Admin DashBoard</h1>
        <div className='flex'>
            {len!=0 && <h4 className='my-2 mx-6 font-bold text-sm'>Total Count = {len}</h4>}
        <div className="bg-teal-100 px-5 py-1 rounded-lg drop-shadow-md cursor-pointer hover:bg-teal-200" onClick={handleButton}>
          <h2 className="font-semibold">Create Employee</h2>
        </div>
        </div>
      </div>
  )
}

export default HeadBar;