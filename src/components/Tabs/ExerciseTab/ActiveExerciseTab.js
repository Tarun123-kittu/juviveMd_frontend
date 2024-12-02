import React from 'react'
import DataTable from '../../DataTable/DataTable'
import PoseImage from '../../../Images/treepose.png'
import { Dropdown } from 'react-bootstrap'
const ActiveExerciseTab = () => {
    const columns = [
        "Exercise Name",
        "Image",
        "Exercise Link",
        "Category",
        "Exercise Status",
        "View"
      ];
  return (
    <div>
        <DataTable columns={columns}>
        <tr>
           
            <td>Tree pose</td>
            <td><img src={PoseImage}/></td>
            <td><span role="button" className='text-decoration-underline'>http://yoga.org.nz http://yogaonline.info</span></td>
            <td> Flexibility Exercise </td>
            <td> <div className='patient_dropdown w-100'>
                <Dropdown>
                <Dropdown.Toggle variant="unset" >
             Category<svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.982514 2.01959L2.27927 0.879444L9.34239 7.09323C9.45625 7.1928 9.5466 7.3112 9.60826 7.44161C9.66992 7.57203 9.70166 7.71189 9.70166 7.85315C9.70166 7.9944 9.66992 8.13426 9.60826 8.26468C9.5466 8.3951 9.45625 8.5135 9.34239 8.61306L2.27927 14.8301L0.983737 13.6899L7.61297 7.85476L0.982514 2.01959Z" fill="black"/>
                    </svg>


                </Dropdown.Toggle>

                <Dropdown.Menu>
                <ul>
                  {/* <li><input type="text" placeholder='Search Trainer' /> <span>Search Trainer</span></li> */}
                  <li>Deepak Rawat</li> 
                  <li>Sahil</li>
                  <li>Aman</li>
                </ul>
                </Dropdown.Menu>
              </Dropdown>
                </div></td>
            <td>
              <button className="cmn_btn">View</button>
            </td>
         
          </tr>
            </DataTable>
    </div>
  )
}

export default ActiveExerciseTab