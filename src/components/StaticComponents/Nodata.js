import React from 'react'
import NodataImage from "../../Images/empty-box.png"
import { useLocation } from 'react-router-dom'
const Nodata = () => {
  const location = useLocation()
  const { pathname } = location
  return (
    <div className='noData d-flex justify-content-center align-items-center'>
      <div className='noData_inner text-center'>
        <img src={NodataImage} alt="No Data" />
        {pathname !== "/messages" ? <h3>No data to display</h3> : <h3>No Message !</h3>}
        {pathname === "/requests" && <h3>Currently there is no delete Patient request</h3>}
        {pathname !== "/messages" && pathname !== "/requests" ? <p>The table is currently empty. Add some {pathname === "/trainer/patient" ? "patient" : pathname === "/trainer/messages" ? "messages" : pathname === "/staff" ? "staff" : pathname === "/messages" ? "messages" : pathname === "/patient" ? "patient" : pathname === "/reception/patient" ? "patient" : pathname === "/reception/messages" ? "messages" : pathname === "/dashboard" ? "patient" : "exercise"} to get started.</p> : pathname === "/requests" ? "No Request Found" : <p>You have not received any message yet.</p>}
      </div>
    </div>
  )
}

export default Nodata