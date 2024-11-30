import React, { useState } from 'react'
import DataTable from '../../components/DataTable/DataTable'
import Default_user from '../../Images/default_user.svg'
import { TiArrowRight } from "react-icons/ti";
import Dropdown from 'react-bootstrap/Dropdown';
import AddpatientModal from '../../components/Modals/AddPatientModal';
import EditpatientModal from '../../components/Modals/EditPatientModal';

const Reception_patient_list = () => {
    const [showFilter, setShowFilter] = useState(false)
    const [showPateintModal, setshowPateintModal] = useState(false)
    const [showEditPateintModal, setshowEditPateintModal] = useState(false)
    const handelShowFilter = () => {
        setShowFilter(!showFilter)
    }
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
        <div>
            <div className='wrapper'>
                <div className='inner_wrapper'>
                    <div className="cmn_head d-flex align-items-center mb-3 position-relative gap-3">
                        <h2 className='flex-grow-1'>Patient List</h2>
                    </div>
                    <div className="cmn_head d-flex align-items-center mb-3 position-relative gap-3">
                        <ul className='static_tabs flex-grow-1 d-flex mb-0'>
                            <li className='active'>Active</li>
                            <li>Health Issues</li>
                            <li>Payment Pending </li>
                        </ul>
                        <button onClick={() => setshowPateintModal(true)} className='cmn_btn'>+ Add Patient</button> <button onClick={handelShowFilter} className="cmn_btn px-4">Filter</button>
                        {showFilter && <div className='patient_filter'>
                            <span className='filter_heading'>Filter</span>
                            <div className='filter_list w-100'>
                                <div className='label'>
                                    <span>Age</span>
                                </div>
                                <input type="text" placeholder='Exercise Name' className='form-control' />
                            </div>

                            <div className='patient_dropdown w-100'>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Gender
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z" fill="black" fill-opacity="0.25" />
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
                            <div className='filter_list w-100'>
                                <div className='label'>
                                    <span>Date</span>
                                </div>
                                <input type="date" placeholder='Exercise Name' className='form-control' />
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
                                <div className="d-flex justify-content-between w-100">
                                    <svg onClick={() => setshowEditPateintModal(true)} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.26562 19.2151L11.0737 19.1953L23.7507 6.5834C24.2482 6.08368 24.5219 5.42004 24.5219 4.71409C24.5219 4.00814 24.2482 3.3445 23.7507 2.84478L21.6633 0.748087C20.6683 -0.251345 18.9323 -0.246057 17.9452 0.744121L5.26562 13.3586V19.2151ZM19.8023 2.6174L21.8936 4.71012L19.7917 6.80153L17.7044 4.70616L19.8023 2.6174ZM7.89788 14.4612L15.8341 6.56489L17.9215 8.66158L9.98658 16.5552L7.89788 16.5619V14.4612Z" fill="black" />
                                        <path d="M2.63226 24.489H21.0581C22.5098 24.489 23.6903 23.3029 23.6903 21.8445V10.3835L21.0581 13.0279V21.8445H6.7886C6.75438 21.8445 6.71884 21.8577 6.68462 21.8577C6.64119 21.8577 6.59776 21.8458 6.55301 21.8445H2.63226V3.33341H11.6438L14.2761 0.688965H2.63226C1.18057 0.688965 0 1.875 0 3.33341V21.8445C0 23.3029 1.18057 24.489 2.63226 24.489Z" fill="black" />
                                    </svg>
                                    <svg className="me-3" width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.96355 24C3.28478 24 2.70701 23.7606 2.23026 23.2817C1.7535 22.8028 1.51512 22.223 1.51512 21.5422V2.69372H0V1.17185H6.06048V0H15.1512V1.17185H21.2117V2.69372H19.6965V21.5422C19.6965 22.2422 19.4632 22.8271 18.9966 23.2969C18.5299 23.7666 17.9471 24.001 17.2481 24H3.96355ZM18.1814 2.69372H3.03024V21.5422C3.03024 21.8151 3.11761 22.0393 3.29235 22.2148C3.4671 22.3904 3.69083 22.4781 3.96355 22.4781H17.2496C17.4819 22.4781 17.6956 22.3807 17.8905 22.1859C18.0855 21.9911 18.1824 21.776 18.1814 21.5406V2.69372ZM7.28469 19.4344H8.79981V5.73748H7.28469V19.4344ZM12.4119 19.4344H13.927V5.73748H12.4119V19.4344Z" fill="black" />
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    </DataTable>
                </div>
                <AddpatientModal showPateintModal={showPateintModal} setshowPateintModal={setshowPateintModal} />
                <EditpatientModal showPateintModal={showEditPateintModal} setshowPateintModal={setshowEditPateintModal} />
            </div>
        </div>
    )
}

export default Reception_patient_list