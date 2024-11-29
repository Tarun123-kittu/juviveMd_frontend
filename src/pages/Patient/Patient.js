import React,{useState} from 'react'
import DataTable from '../../components/DataTable/DataTable'
import Default_user from '../../Images/default_user.svg'
import { TiArrowRight } from "react-icons/ti";
import Dropdown from 'react-bootstrap/Dropdown';
import './Patient.css'

const Patient = () => {
  const [toggleFilter,setToggleFilter] = useState(false)
  const columns = [
    "User Name",
    "Date",
    "Age",
    "Phone No.",
    "Gender",
    "Goal",
    "Assign Trainer",
    "Status",
    "Overview",
  ];
  return (
    <div className='wrapper'>
        <div className='inner_wrapper'>
        <div className="cmn_head d-flex justify-content-between align-items-center mb-3 position-relative">
            <h2>Patient List</h2> <button className="cmn_btn px-4" onClick={() => setToggleFilter(!toggleFilter)}>Filter</button>
            {toggleFilter &&<div className='patient_filter'>
            <span className='filter_heading'>Filter</span>
                <div className='filter_list w-100'>
                  <div className='label'>
                    <span>Exercise</span>
                    </div>
                    <input type="text" placeholder='Exercise Name' className='form-control' />
                </div>
            
                <div className='patient_dropdown w-100'>
                <Dropdown>
                <Dropdown.Toggle variant="unset" >
                Assign Trainer <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z" fill="black" fill-opacity="0.25"/>
                                </svg>

                </Dropdown.Toggle>

                <Dropdown.Menu>
                <ul>
                  <li><input type="text" placeholder='Search Trainer' /> <span>Search Trainer</span></li>
                  <li>Deepak Rawat</li> 
                  <li>Sahil</li>
                  <li>Aman</li>
                </ul>
                </Dropdown.Menu>
              </Dropdown>
                </div>
                <div className='filter_list w-100'>
                  <div className='label'>
                    <span>Date</span>
                    </div>
                    <input type="date" placeholder='Exercise Name' className='form-control' />
                </div>
                <div className='patient_dropdown w-100'>
                <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
              Gender 
               <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z" fill="black" fill-opacity="0.25"/>
              </svg>

                </Dropdown.Toggle>

                <Dropdown.Menu>
                <ul>
                    <li>Men</li> 
                  <li>Women</li>
                  <li>Non-Binary</li>
                </ul>
                </Dropdown.Menu>
              </Dropdown> 
                </div>
                <button className='cmn_btn'>Search</button>
                <button className='cmn_btn fade_color'>Clean</button>
            </div>}
        </div>
        <DataTable columns={columns}>
            <tr>
              <td className="ps-3">
                <div className="d-flex align-items-center table_user">
                  <img src={Default_user} alt="User Image" />
                  <div className="d-inline-grid">
                    <p className="mb-0">Neeraj</p>
                  </div>
                </div>
              </td>
              <td>04/09/2024</td>
              <td>22</td>
              <td>+146975234</td>
              <td>Male</td>
              <td>Lower Back</td>
              <td>Trainer A</td>
              <td>
                <button className="btn_info active">Active</button>
              </td>
              <td className='text-center'>
               <button className='cmn_btn fade_color px-0 pe-1'><TiArrowRight size={40} /> </button>
              </td>
            </tr>
          </DataTable>
        </div>
    </div>
  )
}

export default Patient