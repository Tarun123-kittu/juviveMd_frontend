import React from 'react'
import NodataImage from "../../Images/empty-box.png"
import { useLocation } from 'react-router-dom'
const Nodata = () => {
  const location = useLocation()
  const {pathname} = location
  console.log(pathname,"this is the location")
  return (
    <div className='noData d-flex justify-content-center align-items-center'> 
   <div className='noData_inner text-center'>
   <img src={NodataImage} alt="No Data" />
        <h3>No data to display</h3>
        <p>The table is currently empty. Add some {pathname === "/trainer/patient" ? "patient" : pathname === "/trainer/messages" ? "messages" : pathname === "/staff" ?  "staff" : pathname === "/messages" ? "messages" : pathname === "/patient" ? "patient" : pathname === "/reception/patient" ? "patient" : pathname === "/reception/messages" ? "messages" : "exercise"} to get started.</p>
   </div>
    </div>
  )
}

export default Nodata