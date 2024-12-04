import React, { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable/DataTable'
import Default_user from '../../Images/default_user.svg'
import { TiArrowRight } from "react-icons/ti";
import Dropdown from 'react-bootstrap/Dropdown';
import { get_patients_list } from '../../redux/slices/patientSlice/getPatientList';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../common/Loader/Loader"
import No_data_found from "../../Images/No_data_found.svg";
import Pagination from "../../common/pagination/Pagination"
import { get_trainers } from '../../redux/slices/commonDataSlice/getTrainersSlice';
import { calculateAge } from '../../common/calculateAge/calculateAge';
import { formatDate } from '../../common/formatDate/formatDate';

const PatientListComponent = () => {
    const dispatch = useDispatch()
    const [toggleFilter, setToggleFilter] = useState(false)
    const [page, setPage] = useState(1)
    const [patientData, setPatientData] = useState()
    const [username, setUsername] = useState()
    const [trainerName, setTrainerName] = useState()
    const [trainer_data, setTrainer_data] = useState()
    const [date, setDate] = useState()
    const [gender, setGender] = useState()
    const patient_list = useSelector((store) => store.GET_PATIENT_LIST)
    const trainers_list = useSelector((store) => store.TRAINERS_LIST)
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

    useEffect(() => {
        dispatch(get_patients_list({ page, tab: "active" }))
        dispatch(get_trainers())
    }, [])

    useEffect(() => {
        if (patient_list?.isSuccess) {
            setPatientData(patient_list?.data?.data?.items)
        }
        if (patient_list?.isError) {

        }
    }, [patient_list])

    useEffect(() => {
        if (trainers_list?.isSuccess) {
            setTrainer_data(trainers_list?.data?.data)
        }
    }, [trainers_list])

    const handlePageChange = (newPage) => {
        setPage(newPage + 1);
    };

    const handleSearchTrainerName = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        setTrainerName(e.target.value);

        if (!searchQuery) {
            setTrainer_data(trainers_list?.data?.data);
            return;
        }

        const searchedNames = trainers_list?.data?.data.filter((el) =>
            el.firstName?.toLowerCase().includes(searchQuery)
        );

        setTrainer_data(searchedNames);
    };

    const handleSearch = () => {
        if(username || gender || trainerName || date){
            dispatch(get_patients_list({ page, tab: "active", username, date, gender, trainer: trainerName }))
        }
    }

    const handleClear = () => {
        dispatch(get_patients_list({ page, tab: "active" }))
        setUsername()
        setDate()
        setTrainerName()
        setGender()
    }


    


    return (
        <div className='wrapper'>
            <div className='inner_wrapper'>
                <div className="cmn_head d-flex justify-content-between align-items-center mb-3 position-relative">
                    <h2>Patient List</h2> <button className="cmn_btn px-4" onClick={() => setToggleFilter(!toggleFilter)}>Filter</button>
                    {toggleFilter && <div className='patient_filter'>
                        <span className='filter_heading'>Filter</span>
                        <div className='filter_list w-100'>
                            <div className='label'>
                                <span>Username</span>
                            </div>
                            <input type="text" placeholder='Username' className='form-control' value={username || ""} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className='patient_dropdown w-100'>
                            <Dropdown>
                                <Dropdown.Toggle variant="unset" >
                                    Assigned Trainer <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z" fill="black" fill-opacity="0.25" />
                                    </svg>

                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <ul>
                                        <li><input type="text" placeholder='Search Trainer' value={trainerName} onChange={(e) => handleSearchTrainerName(e)} /> <span>Search Trainer</span></li>
                                        {Array?.isArray(trainer_data) && trainer_data?.map((list) => {
                                            return (
                                                <li onClick={() => setTrainerName(list?.firstName)}>{list?.firstName}</li>
                                            )
                                        })}
                                    </ul>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className='filter_list w-100'>
                            <div className='label'>
                                <span>Date</span>
                            </div>
                            <input type="date" placeholder='Exercise Name' className='form-control' onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className='patient_dropdown w-100'>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {gender === "MEN" ? "Men" : gender === "WOMEN" ? "Women" : gender === "NON-BINARY" ? "Non-Binary" : "Select Gender"}
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z" fill="black" fill-opacity="0.25" />
                                    </svg>

                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <ul>
                                        <li onClick={() => setGender("MEN")}>Men</li>
                                        <li onClick={() => setGender("WOMEN")}>Women</li>
                                        <li onClick={() => setGender("NON-BINARY")}>Non-Binary</li>
                                    </ul>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <button className='cmn_btn' onClick={() => handleSearch()}>Search</button>
                        <button className='cmn_btn fade_color' onClick={() => handleClear()}>Clean</button>
                    </div>}
                </div>
                <DataTable columns={columns}>
                    {patient_list?.isLoading ? <tr><td colSpan={9}><Loader /></td></tr> : patient_list?.data?.data?.items?.length === 0 ? <tr className='text-center' ><td colSpan={9}><img className='text-center w-25 m-auto mt-5 mb-5' src={No_data_found} alt="" /> </td></tr> : Array?.isArray(patientData) && patientData?.map((list, i) => {
                        return (
                            <tr>
                                <td className="ps-3">
                                    <div className="d-flex align-items-center table_user">
                                        <img src={list?.image || Default_user} alt="User Image" />
                                        <div className="d-inline-grid">
                                            <p className="mb-0">{list?.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{formatDate(list?.created_at)}</td>
                                <td>{calculateAge(list.dob)}</td>
                                <td>{list?.phone}</td>
                                <td>{list?.gender}</td>
                                <td>{list?.goal}</td>
                                <td>{list?.trainerName || "Not Available"}</td>
                                <td>
                                    <button className="btn_info active">{list?.status === 0 ? "Inactive" : "Active"}</button>
                                </td>
                                <td className='text-center'>
                                    <button className='cmn_btn fade_color px-0  px-3'><TiArrowRight size={40} /> </button>
                                </td>
                            </tr>
                        )
                    })}

                </DataTable>
            </div>
            {patient_list?.isSuccess && patient_list?.data?.data?.totalPages > 1 && <Pagination totalPages={patient_list?.data?.data?.totalPages} onPageChange={handlePageChange} setPage={setPage} />}
        </div>
    )
}

export default PatientListComponent