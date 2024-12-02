import React from 'react'
import NodataImage from "../../Images/empty-box.png"
const Nodata = () => {
  return (
    <div className='noData d-flex justify-content-center align-items-center'> 
   <div className='noData_inner text-center'>
   <img src={NodataImage} alt="No Data" />
        <h3>No data to display</h3>
        <p>The table is currently empty. Add some exercise to get started.</p>
   </div>
    </div>
  )
}

export default Nodata