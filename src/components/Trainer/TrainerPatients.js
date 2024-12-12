
import React, { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable/DataTable'
import Default_user from '../../Images/default_user.svg'
import { TiArrowRight } from "react-icons/ti";
import Dropdown from 'react-bootstrap/Dropdown';
import { get_patients_list } from '../../redux/slices/patientSlice/getPatientList';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../common/Loader/Loader"
import Pagination from "../../common/pagination/Pagination"
import { get_trainers } from '../../redux/slices/commonDataSlice/getTrainersSlice';
import { calculateAge } from '../../common/calculateAge/calculateAge';
import { formatDate } from '../../common/formatDate/formatDate';
import Nodata from '../StaticComponents/Nodata';
import AddpatientModal from '../Modals/AddPatientModal';
import EditpatientModal from '../Modals/EditPatientModal';
import { common_data_api } from '../../redux/slices/commonDataSlice/commonDataDlice';
import { getRoutePermissions } from "../../middleware/permissionsMiddleware/getRoutePermissions";
import { permission_constants } from "../../constants/permissionConstants";
import DeleteModal from "../../components/Modals/DeleteModal"
import { delete_patient, clear_delete_patient_state } from '../../redux/slices/patientSlice/deletePatientSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const TrainerPatients = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [toggleFilter, setToggleFilter] = useState(false)
    const [page, setPage] = useState(1)
    const [patientData, setPatientData] = useState()
    const [username, setUsername] = useState()
    const [trainerName, setTrainerName] = useState()
    const [trainerid, setTrainerid] = useState()
    const [trainer_data, setTrainer_data] = useState()
    const [date, setDate] = useState()
    const [showPateintModal, setshowPateintModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [patientId, setPatientId] = useState(null)
    const [gender, setGender] = useState()
    const patient_list = useSelector((store) => store.GET_PATIENT_LIST)
    const trainers_list = useSelector((store) => store.TRAINERS_LIST)
    const common_data = useSelector((store) => store.COMMON_DATA)
    const [PatientPermissions] = getRoutePermissions(permission_constants.PATIENT)
    const is_patient_deleted = useSelector((store) => store.DELETE_PATIENT)
      const [showEditPateintModal, setshowEditPateintModal] = useState(false)
    const columns = [
        "User Name",
        "Date",
        "Age",
        "Phone No.",
        "Gender",
        "Goal",
        "Assigned Trainer",
        "Status",
        "Overview",
    ];

    useEffect(() => {
        dispatch(get_patients_list({ page, tab: "active" }))
        dispatch(get_trainers())
        dispatch(common_data_api())
    }, [dispatch, page])

    useEffect(() => {
        if (patient_list?.isSuccess) {
            setPatientData(patient_list?.data?.data?.items)
            setToggleFilter(false)
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
        if (username || gender || trainerName || date) {
            dispatch(get_patients_list({ page, tab: "active", username, date, gender, trainer: trainerid }))
        }
    }

    const handleClear = () => {
        dispatch(get_patients_list({ page, tab: "active" }))
        setUsername()
        setDate()
        setTrainerName()
        setGender()
        setTrainerid()
    }

    const handleDelete = () => {
        dispatch(delete_patient({ id: patientId }))
    }

    useEffect(() => {
        if (is_patient_deleted?.isSuccess) {
            toast.success(is_patient_deleted?.message?.message)
            dispatch(clear_delete_patient_state())
            dispatch(get_patients_list({ page, tab: "active" }))
            setShowDeleteModal(false)
        }
        if (is_patient_deleted?.isError) {
            toast.error(is_patient_deleted?.error?.message)
            dispatch(clear_delete_patient_state())
        }
    }, [is_patient_deleted])


    return (
        <div className='wrapper'>
            <div className='inner_wrapper'>
                <div className="cmn_head d-flex gap-2 justify-content-between align-items-center mb-3 position-relative">
                    <h2 className='flex-grow-1'>Patient List</h2> {PatientPermissions?.canCreate && <button onClick={() => setshowPateintModal(true)} className='cmn_btn'>+ Add Patient</button>} <button className="cmn_btn px-4" onClick={() => setToggleFilter(!toggleFilter)}>Filter</button>
                    {toggleFilter && <div className='patient_filter'>
                        <div className='filter_list w-100'>
                            <input type="text" placeholder='Username' className='form-control' value={username || ""} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className='patient_dropdown w-100'>
                            <Dropdown>
                                <Dropdown.Toggle variant="unset" >
                                    {trainerName ? trainerName : "Assigned Trainer"} <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z" fill="black" fill-opacity="0.25" />
                                    </svg>

                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <ul>
                                        <li className='dropdown_search'>
                                            <input type="text" placeholder='Search Trainer' value={trainerName} onChange={(e) => handleSearchTrainerName(e)} />
                                            <span type="button">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.75 12.75L15.75 15.75M2.25 8.25C2.25 9.8413 2.88214 11.3674 4.00736 12.4926C5.13258 13.6179 6.6587 14.25 8.25 14.25C9.8413 14.25 11.3674 13.6179 12.4926 12.4926C13.6179 11.3674 14.25 9.8413 14.25 8.25C14.25 6.6587 13.6179 5.13258 12.4926 4.00736C11.3674 2.88214 9.8413 2.25 8.25 2.25C6.6587 2.25 5.13258 2.88214 4.00736 4.00736C2.88214 5.13258 2.25 6.6587 2.25 8.25Z" stroke="#0C5E62" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                        </li>
                                        {Array?.isArray(trainer_data) && trainer_data?.map((list) => {
                                            return (
                                                <Dropdown.Item onClick={() => { setTrainerName(list?.firstName); setTrainerid(list?.id) }}>{list?.firstName}</Dropdown.Item>
                                            )
                                        })}
                                    </ul>
                                </Dropdown.Menu>
                            </Dropdown>

                        </div>
                        <div className='filter_list w-100'>
                            <input type="date" placeholder='Exercise Name' className='form-control' onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className='patient_dropdown w-100'>
                            <Dropdown>
                                <Dropdown.Toggle variant="unset" id="dropdown-basic">
                                    {gender === "MALE" ? "Male" : gender === "FEMALE" ? "Female" : gender === "NON-BINARY" ? "Non-Binary" : "Select Gender"}
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z" fill="black" fill-opacity="0.25" />
                                    </svg>

                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <ul>
                                        <Dropdown.Item onClick={() => setGender("MALE")} >Male</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setGender("FEMALE")}>Female</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setGender("NON-BINARY")}>Non-Binary</Dropdown.Item>

                                    </ul>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className='d-flex justify-content-end gap-2'>
                            <button className='cmn_btn' onClick={() => handleSearch()}>Search</button>
                            <button className='cmn_btn fade_color' onClick={() => handleClear()}>Clean</button>
                        </div>
                    </div>}
                </div>
                <div className={`${toggleFilter && "blur_bg"}`}>

                    <DataTable columns={columns}>
                        {patient_list?.isLoading ? <tr><td colSpan={9}><Loader /></td></tr> : patient_list?.data?.data?.items?.length === 0 ? <tr className='text-center' ><td colSpan={9}><Nodata /> </td></tr> : Array?.isArray(patientData) && patientData?.map((list, i) => {
                            return (
                                <tr>
                                    <td className="ps-3">
                                        <div className="d-flex align-items-center table_user">
                                            <img src={list?.image || Default_user} alt="User_image" />
                                            <div className="d-inline-grid">
                                                <p className="mb-0">{list?.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{formatDate(list?.created_at)}</td>
                                    <td>{calculateAge(list.dob)}</td>
                                    <td>{list?.phone}</td>
                                    <td>{list?.gender ? list?.gender?.charAt(0)?.toUpperCase() + list?.gender?.slice(1)?.toLowerCase() : ""}</td>
                                    <td>{list?.goal}</td>
                                    <td>{list?.trainerName || "Not Available"}</td>
                                    <td>
                                        <button className="btn_info active">{list?.status === 0 ? "Inactive" : "Active"}</button>
                                    </td>
                                    <td className='text-center'>
                                        {PatientPermissions?.canRead && <button onClick={() => navigate("/patientData")} className='cmn_btn fade_color px-0  px-3'><TiArrowRight size={40} /> </button>}
                                        {PatientPermissions?.canUpdate && <svg onClick={() => { setshowEditPateintModal(true); setPatientId(list?.id) }} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.26562 19.2151L11.0737 19.1953L23.7507 6.5834C24.2482 6.08368 24.5219 5.42004 24.5219 4.71409C24.5219 4.00814 24.2482 3.3445 23.7507 2.84478L21.6633 0.748087C20.6683 -0.251345 18.9323 -0.246057 17.9452 0.744121L5.26562 13.3586V19.2151ZM19.8023 2.6174L21.8936 4.71012L19.7917 6.80153L17.7044 4.70616L19.8023 2.6174ZM7.89788 14.4612L15.8341 6.56489L17.9215 8.66158L9.98658 16.5552L7.89788 16.5619V14.4612Z" fill="black" />
                                            <path d="M2.63226 24.489H21.0581C22.5098 24.489 23.6903 23.3029 23.6903 21.8445V10.3835L21.0581 13.0279V21.8445H6.7886C6.75438 21.8445 6.71884 21.8577 6.68462 21.8577C6.64119 21.8577 6.59776 21.8458 6.55301 21.8445H2.63226V3.33341H11.6438L14.2761 0.688965H2.63226C1.18057 0.688965 0 1.875 0 3.33341V21.8445C0 23.3029 1.18057 24.489 2.63226 24.489Z" fill="black" />
                                        </svg>}
                                        {PatientPermissions?.canDelete && <svg onClick={() => { setShowDeleteModal(true); setPatientId(list?.id) }} className="me-3" width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.96355 24C3.28478 24 2.70701 23.7606 2.23026 23.2817C1.7535 22.8028 1.51512 22.223 1.51512 21.5422V2.69372H0V1.17185H6.06048V0H15.1512V1.17185H21.2117V2.69372H19.6965V21.5422C19.6965 22.2422 19.4632 22.8271 18.9966 23.2969C18.5299 23.7666 17.9471 24.001 17.2481 24H3.96355ZM18.1814 2.69372H3.03024V21.5422C3.03024 21.8151 3.11761 22.0393 3.29235 22.2148C3.4671 22.3904 3.69083 22.4781 3.96355 22.4781H17.2496C17.4819 22.4781 17.6956 22.3807 17.8905 22.1859C18.0855 21.9911 18.1824 21.776 18.1814 21.5406V2.69372ZM7.28469 19.4344H8.79981V5.73748H7.28469V19.4344ZM12.4119 19.4344H13.927V5.73748H12.4119V19.4344Z" fill="black" />
                                        </svg>}
                                    </td>
                                </tr>
                            )
                        })}

                    </DataTable>
                </div>
            </div>
            {patient_list?.isSuccess && patient_list?.data?.data?.totalPages > 1 && <Pagination totalPages={patient_list?.data?.data?.totalPages} onPageChange={handlePageChange} setPage={setPage} />}
            <AddpatientModal showPateintModal={showPateintModal} setshowPateintModal={setshowPateintModal} tab={"active"} common_data={common_data} />
            <EditpatientModal showPateintModal={showEditPateintModal} setshowPateintModal={setshowEditPateintModal} tab={"active"} common_data={common_data} patientId={patientId} page={page} setPatientId={setPatientId} />
            <DeleteModal showDeleteModal={showDeleteModal} setshowDeleteModal={setShowDeleteModal} handleDelete={handleDelete} loading={is_patient_deleted?.isLoading} />
        </div>
    )
}

export default TrainerPatients