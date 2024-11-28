import React from 'react'
import DataTable from '../../components/DataTable/DataTable'
import Default_user from '../../Images/default_user.svg'
import { TiArrowRight } from "react-icons/ti";
import './Patient.css'

const Patient = () => {
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
        <div className="cmn_head d-flex justify-content-between align-items-center mb-2">
            <h2>Patient List</h2> <button className="cmn_btn px-4">Filter</button>
            <div className='patient_filter'>
                <div>

                </div>
            </div>
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