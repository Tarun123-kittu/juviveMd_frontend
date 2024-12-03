import React, { useRef } from 'react';
import { TiArrowRight } from "react-icons/ti";
import Dropdown from 'react-bootstrap/Dropdown';
import { get_patients_list } from '../../redux/slices/patientSlice/getPatientList';
import { useDispatch } from 'react-redux';

const PatientFilters = ({ tab, username, setUsername, setGoal, goal, setDate, date, setGender, gender, setStatus, status, setTrainer, trainer, trainers, goalsList, handleSearch, page }) => {
    const dispatch = useDispatch()
    const handleTrainerSelect = (selectedTrainer) => {
        setTrainer(selectedTrainer);
    };

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
    };

    const handleStatusSelect = (selectedStatus) => {
        setStatus(selectedStatus);
    };

    const handleGoalSelect = (selectedGoal) => {
        setGoal(selectedGoal); // Update goal state
    };
    const dateRef = useRef(null)
    const handleClean = () => {
        setUsername()
        setGender()
        setGoal()
        if (dateRef.current) {
            dateRef.current.value = ""
        }
        setDate()
        setStatus()
        setTrainer()
        dispatch(get_patients_list({ page, tab }))
    }
    return (
        <div className='patient_filter'>
            <div className='filter_list w-100'>
                <div className='label'>
                    <span>Username</span>
                </div>
                <input type="text" placeholder='Enter Username' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            {tab === "active" && tab === "active" && (
                <div className='patient_dropdown w-100'>
                    <Dropdown>
                        <Dropdown.Toggle variant="unset" id="dropdown-basic" className="cursor-pointer">
                            {trainer ? trainer : "Select Trainer"} {/* Show selected trainer or placeholder */}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z" fill="black" fillOpacity="0.25" />
                            </svg>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <ul>
                                <li className="cursor-pointer">Select Trainer</li>
                                {trainers?.map((list) => (
                                    <li
                                        key={list.id}
                                        onClick={() => handleTrainerSelect(list?.firstName)} // Pass the trainer name
                                        className="cursor-pointer"
                                    >
                                        {list?.firstName}
                                    </li>
                                ))}
                            </ul>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )}
            <div className='patient_dropdown w-100'>
                <Dropdown>
                    <Dropdown.Toggle variant="unset" id="dropdown-basic" className="cursor-pointer">
                        {gender ? gender : " Select Gender"} {/* Show selected gender or placeholder */}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z" fill="black" fillOpacity="0.25" />
                        </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <ul>
                            <li
                                onClick={() => handleGenderSelect("MALE")} // Set gender to Male
                                className="cursor-pointer"
                            >
                                Men
                            </li>
                            <li
                                onClick={() => handleGenderSelect("FEMALE")} // Set gender to Female
                                className="cursor-pointer"
                            >
                                Women
                            </li>
                            <li
                                onClick={() => handleGenderSelect("NON-BINARY")} // Set gender to Non-Binary
                                className="cursor-pointer"
                            >
                                Non-Binary
                            </li>
                        </ul>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {tab !== "active" && (
                <div className='filter_list w-100'>
                    <div className='label'>
                        <span>Goal</span>
                    </div>
                    <div className='patient_dropdown w-100'>
                        <Dropdown>
                            <Dropdown.Toggle variant="unset" id="dropdown-basic" className="cursor-pointer">
                                {goal ? goal : "Select Goal"} {/* Show selected goal or placeholder */}
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z" fill="black" fillOpacity="0.25" />
                                </svg>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <ul>
                                    {goalsList?.map((val, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleGoalSelect(val)} // Set selected goal
                                            className="cursor-pointer"
                                        >
                                            {val}
                                        </li>
                                    ))}
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            )}

            <div className='filter_list w-100'>
                <div className='label'>
                    <span>Date</span>
                </div>
                <input type="date" placeholder='Exercise Name' className='form-control' onChange={(e) => setDate(e.target.value)} ref={dateRef} />
            </div>

            {tab === "active" && (
                <div className='patient_dropdown w-100'>
                    <Dropdown>
                        <Dropdown.Toggle variant="unset" id="dropdown-basic" className="cursor-pointer">
                            {status !== "" ? (status === 1 ? "Active" : "Inactive") : "Select Status"} {/* Show selected status or placeholder */}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z" fill="black" fillOpacity="0.25" />
                            </svg>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <ul>
                                <li
                                    onClick={() => handleStatusSelect(1)}
                                    className="cursor-pointer"
                                >
                                    Active
                                </li>
                                <li
                                    onClick={() => handleStatusSelect(0)}
                                    className="cursor-pointer"
                                >
                                    InActive
                                </li>
                            </ul>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )}

            <button className='cmn_btn' onClick={() => (goal || gender || date || username || status || trainer) && handleSearch()}>Search</button>
            <button className='cmn_btn fade_color' onClick={() => (goal || gender || date || username || status || trainer) && handleClean()}>Clean</button>
        </div>
    );
};

export default PatientFilters;