import React, { useEffect, useState, useRef } from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import DataTable from '../../components/DataTable/DataTable'
import Default_user from '../../Images/default_user.svg'
import AddpatientModal from '../../components/Modals/AddPatientModal';
import EditpatientModal from '../../components/Modals/EditPatientModal';
import { get_patients_list, clear_all_patient_state } from '../../redux/slices/patientSlice/getPatientList';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../common/Loader/Loader"
import Pagination from "../../common/pagination/Pagination"
import { common_data_api } from "../../redux/slices/commonDataSlice/commonDataDlice";
import { get_trainers } from '../../redux/slices/commonDataSlice/getTrainersSlice';
import PatientFilters from '../reception/patientFilters';
import DeleteModal from "../../components/Modals/DeleteModal"
import { delete_patient, clear_delete_patient_state } from '../../redux/slices/patientSlice/deletePatientSlice';
import { Dropdown } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { update_patient_payment_api, clear_patient_payment_update_state } from '../../redux/slices/patientSlice/updatePayment';
import Spinner from 'react-bootstrap/Spinner';
import { calculateAge } from '../../common/calculateAge/calculateAge';
import { formatDate } from '../../common/formatDate/formatDate';
import Nodata from '../StaticComponents/Nodata';
import { getRoutePermissions } from "../../middleware/permissionsMiddleware/getRoutePermissions";
import { permission_constants } from "../../constants/permissionConstants";
import { TiArrowRight } from 'react-icons/ti';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowRight from '../../Images/button_right.svg'
const Reception_patient_list = ({ showButtons,className }) => {
    const elementRef = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { val } = location?.state ? location?.state : location
    const { pathname } = location
    const [showFilter, setShowFilter] = useState(false)
    const [showPateintModal, setshowPateintModal] = useState(false)
    const [showEditPateintModal, setshowEditPateintModal] = useState(false)
    const [username, setUsername] = useState()
    const [goal, setGoal] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState()
    const [gender, setGender] = useState()
    const [status, setStatus] = useState()
    const [trainer, setTrainer] = useState()
    const [page, setPage] = useState(1)
    const [isActiveTab, setIsActiveTab] = useState(false)
    const [tab, setTab] = useState(val || "active")
    const [trainers, setTrainers] = useState()
    const [goalsList, setGoalsList] = useState()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [index, setIndex] = useState(null)
    const [patientId, setPatientId] = useState(null)
    const [payment_status_pending, setPayment_status_pending] = useState(false)
    const [payment_status_received, setPayment_status_received] = useState(false)
    const [leftPosition, setLeftpostion] = useState("")
    const [path, setPath] = useState(["active"])
    const patient_data = useSelector((store) => store.GET_PATIENT_LIST)
    const common_data = useSelector((store) => store.COMMON_DATA)
    const trainers_list = useSelector((store) => store.TRAINERS_LIST)
    const is_patient_deleted = useSelector((store) => store.DELETE_PATIENT)
    const is_payment_status_updated = useSelector((store) => store.UPDATE_PATIENT_PAYMENT)
    const PatientPermissions = getRoutePermissions(permission_constants.PATIENT)?.[0] || {};
    const PatientPaymentPermissions = getRoutePermissions(permission_constants.PATIENTPAYMENT)?.[0] || {};
    const PatientActiveTabPermissions = getRoutePermissions(permission_constants.PATIENTACTIVETAB)?.[0] || {};
    const PatientHealthTabPermissions = getRoutePermissions(permission_constants.PATIENTHEALTHISSUETAB)?.[0] || {};
    const PatientPaymenTabtPermissions = getRoutePermissions(permission_constants.PATIENTPAYMENTTAB)?.[0] || {};
    const PatientPlan = getRoutePermissions(permission_constants.PATIENTPLAN)?.[0] || {};

    useEffect(() => {
        if (val) {
            setTab(val)
        }
    }, [val])

    const handelShowFilter = () => {
        setShowFilter(!showFilter)
    }
    useEffect(() => {
        const updatePosition = () => {
            if (elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect();
                setLeftpostion(rect.left - 133);
            }
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [tab]);

    const columns = [
        "User Name",
        "Date",
        "Age",
        "Phone No.",
        "Gender",
        "Goal",
        "Assigned Trainer",
        "Status",
        "Created By",
        "Action",
    ];
    const columns_one = [
        "User Name",
        "Date",
        "Age",
        "Phone No.",
        "Gender",
        "Goal",
        "Assigned Trainer",
        "Status",
        "Created By",
        "Health Issue",
        "Action",
    ];
    const columns_two = [
        "User Name",
        "Date",
        "Age",
        "Phone No.",
        "Gender",
        "Goal",
        "Assigned Trainer",
        "Status",
        "Payment",
        "Created By",
        "Action",
    ];

    useEffect(() => {
        setIsActiveTab(true)
        dispatch(get_patients_list({ page, tab }))
        dispatch(common_data_api())
        dispatch(get_trainers())
    }, [page, tab])

    const handlePageChange = (newPage) => {
        setPage(newPage + 1);
    };

    useEffect(() => {
        if (patient_data?.isSuccess) {
            setIsActiveTab(false)
        }
    }, [patient_data])

    useEffect(() => {
        if (trainers_list?.isSuccess) {
            setTrainers(trainers_list?.data?.data)
        }
        if (common_data?.isSuccess) {
            setGoalsList(common_data?.data?.data?.goal)
        }
    }, [trainers_list, common_data])

    const handleSearch = () => {
        dispatch(get_patients_list({ page, tab, username, goal, date, gender, status, trainer }))
    }

    const handleDelete = () => {
        dispatch(delete_patient({ id: patientId }))
    }

    useEffect(() => {
        if (patient_data?.isSuccess) {
            setShowFilter(false);
        }
    }, [patient_data, path, tab]);


    useEffect(() => {
        if (is_patient_deleted?.isSuccess) {
            toast.success(is_patient_deleted?.message?.message)
            dispatch(clear_delete_patient_state())
            dispatch(get_patients_list({ page, tab }))
            setShowDeleteModal(false)
        }
        if (is_patient_deleted?.isError) {
            toast.error(is_patient_deleted?.error?.message)
            dispatch(clear_delete_patient_state())
        }
    }, [is_patient_deleted])

    const handleUpdatePaymentStatus = (id) => {
        let payment_status = payment_status_received
        dispatch(update_patient_payment_api({ id, payment_status }))
    }

    useEffect(() => {
        if (is_payment_status_updated?.isSuccess) {
            toast.success(is_payment_status_updated?.message?.message)
            setIsOpen(false);
            setIndex(null);
            setPayment_status_pending(false)
            setPayment_status_received(false)
            dispatch(clear_patient_payment_update_state())
            dispatch(get_patients_list({ page, tab }))
        }
        if (is_payment_status_updated?.isError) {
            toast.error(is_payment_status_updated?.error?.message)
            dispatch(clear_patient_payment_update_state())
            setIsOpen(false);
            setIndex(null);
            setPayment_status_pending(false)
            setPayment_status_received(false)
        }
    }, [is_payment_status_updated])

    const handleDropdownToggle = (e, currentIndex) => {
        e.stopPropagation();
        if (index === currentIndex) {
            setIndex(null);
            setIsOpen(false);
        } else {
            setIndex(currentIndex);
            setIsOpen(true);
        }
    };

    const handleDropdownClose = () => {
        setIsOpen(false);
        setIndex(null);
        setStatus(null)
        setPayment_status_pending(false);
        setPayment_status_received(false);
    };

    const handleUpdatePath = (tabName) => {
        dispatch(clear_all_patient_state())
        setPath((prevPath) => [...prevPath, tabName]);
        setUsername();
        setGoal();
        setDate();
        setGender();
        setStatus();
        setTrainer();
        setIsOpen(false);
        setIndex(null);
    };




    return (
        <div>
            <div className={showButtons ? 'wrapper' : ''}>
                <div className={showButtons ? 'inner_wrapper' : ''}>
                    <div className="cmn_head d-flex align-items-center mb-3 position-relative gap-3">
                        <h2 className='flex-grow-1'>Patient List</h2>
                    </div>
                    <div className="cmn_head d-flex align-items-center  position-relative gap-3">
                        {pathname !== "/dashboard" && <ul className='static_tabs flex-grow-1 d-flex      mb-3'>
                            {PatientActiveTabPermissions?.canRead && (
                                <li
                                   
                                    onClick={() => {
                                        if (tab !== "active" && !isActiveTab) {
                                            setTab("active");
                                            handleUpdatePath("active");
                                        }
                                    }}
                                    className={tab === "active" ? "active" : ""}
                                    style={{cursor : "pointer"}}
                                >
                                    Active
                                </li>
                            )}
                            {PatientHealthTabPermissions?.canRead && (
                                <li
                                  
                                    onClick={() => {
                                        if (tab !== "healthIssue" && !isActiveTab) {
                                            setTab("healthIssue");
                                            handleUpdatePath("healthIssue");
                                        }
                                    }}
                                    className={tab === "healthIssue" ? "active" : ""}
                                    style={{cursor : "pointer"}}
                                >
                                    Health Issues
                                </li>
                            )}
                            {PatientPaymenTabtPermissions?.canRead && (
                                <li
                                    
                                    onClick={() => {
                                        if (tab !== "paymentPending" && !isActiveTab) {
                                            setTab("paymentPending");
                                            handleUpdatePath("paymentPending");
                                        }
                                    }}
                                    className={tab === "paymentPending" ? "active" : ""}
                                    style={{cursor : "pointer"}}
                                >
                                    Payment Pending
                                </li>
                            )}
                        </ul>}
                        {PatientPermissions?.canCreate && showButtons && <button onClick={() => setshowPateintModal(true)} className='cmn_btn'>+ Add Patient</button>} {showButtons && <button onClick={handelShowFilter} className="cmn_btn px-4">Filter</button>}
                        {showFilter &&

                            <PatientFilters tab={tab} showFilter={showFilter} username={username} setUsername={setUsername} setGoal={setGoal} goal={goal} setDate={setDate} date={date} setGender={setGender} gender={gender} setStatus={setStatus} status={status} setTrainer={setTrainer} trainer={trainer} trainers={trainers} goalsList={goalsList} handleSearch={handleSearch} page={page} />

                        }

                    </div>
                    <div className='patient_data'>
                        <DataTable columns={tab === "active" ? columns : tab === "healthIssue" ? columns_one : columns_two}>
                            {patient_data?.isLoading ? <tr><td colSpan={tab === "paymentPending" || tab === "healthIssue" ? 11 : 10}><Loader /></td></tr> : patient_data?.data?.data?.items?.length === 0 ? <tr className='text-center' ><td colSpan={tab === "paymentPending" || tab === "healthIssue" ? 12 : 10}><Nodata /> </td></tr> : Array.isArray(patient_data?.data?.data?.items) && patient_data?.data?.data?.items?.map((patient, i) => {
                                return (
                                    <tr>
                                        <td className="ps-3">
                                            <div className="d-flex align-items-center table_user">
                                                <img src={patient?.gender === "FEMALE" ? "/female.webp" : "/male.png"} alt="User-image" width={40} height={40} />
                                                <div className="d-inline-grid">
                                                    <p className="mb-0">{patient?.firstName ? patient.firstName.charAt(0).toUpperCase() + patient.firstName.slice(1) : ''} {patient?.lastName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{formatDate(patient?.created_at)}</td>
                                        <td>{calculateAge(patient?.dob)}</td>
                                        <td className='text-nowrap'>+{patient?.countryCode} {patient?.phone}</td>
                                        <td>
                                            {patient?.gender
                                                ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1).toLowerCase()
                                                : ''}
                                        </td>
                                        <td>{patient?.goal}</td>
                                        <td>{patient?.trainerName}</td>
                                        <td>
                                            <button className="btn_info active" style={{
                                                color: patient?.status === 1 ? '#0c5e62' : 'red',
                                            }}>
                                                {patient?.status === 0 ? "Inactive" : "Active"}</button>
                                        </td>
                                        {tab === "paymentPending" && <td>
                                            <div className="patient_dropdown">
                                                <Dropdown
                                                    show={index === i}
                                                    onToggle={(nextOpenState) => {
                                                        setIsOpen(nextOpenState);
                                                        if (!nextOpenState) handleDropdownClose();
                                                    }}
                                                    autoClose={false}
                                                >
                                                    <Dropdown.Toggle
                                                        variant="unset"
                                                        onClick={(e) => handleDropdownToggle(e, i)}
                                                    >
                                                        {patient?.payment ? "Received" : "Pending"}
                                                        <svg
                                                            width="10"
                                                            height="14"
                                                            viewBox="0 0 10 14"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M0.640229 1.16412L1.93699 0.0239754L9.00011 6.23776C9.11396 6.33733 9.20432 6.45573 9.26598 6.58614C9.32763 6.71656 9.35938 6.85642 9.35938 6.99768C9.35938 7.13893 9.32763 7.2788 9.26598 7.40921C9.20432 7.53963 9.11396 7.65803 9.00011 7.7576L1.93699 13.9746L0.641452 12.8345L7.27069 6.99929L0.640229 1.16412Z"
                                                                fill="black"
                                                            />
                                                        </svg>
                                                    </Dropdown.Toggle>
                                                    {PatientPaymentPermissions?.canUpdate && <Dropdown.Menu>
                                                        <ul>
                                                            <Dropdown.Item
                                                                className="d-flex gap-2"
                                                                onClick={() => {
                                                                    setPayment_status_pending(true);
                                                                    setPayment_status_received(false);
                                                                }}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={payment_status_pending}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation(); // Prevents triggering the parent onClick
                                                                        setPayment_status_pending(true);
                                                                        setPayment_status_received(false);
                                                                    }}
                                                                />
                                                                Pending

                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                className="d-flex gap-2"
                                                                onClick={() => {
                                                                    setPayment_status_received(true);
                                                                    setPayment_status_pending(false);
                                                                }}
                                                            >

                                                                <input
                                                                    type="checkbox"
                                                                    checked={payment_status_received}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation(); // Prevents triggering the parent onClick
                                                                        setPayment_status_received(true);
                                                                        setPayment_status_pending(false);
                                                                    }}
                                                                />
                                                                Received
                                                            </Dropdown.Item>
                                                            <Dropdown.Item className="d-flex justify-content-between">
                                                                {!is_payment_status_updated?.isLoading ? (
                                                                    PatientPaymentPermissions?.canUpdate && <button
                                                                        className="cmn_btn"
                                                                        onClick={() => handleUpdatePaymentStatus(patient?.id)}
                                                                    >
                                                                        Save
                                                                    </button>
                                                                ) : (
                                                                    <button className="cmn_btn">
                                                                        <Spinner animation="border" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </Spinner>
                                                                    </button>
                                                                )}
                                                                <button
                                                                    className="cmn_btn border-btn"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleDropdownClose();
                                                                    }}
                                                                >
                                                                    Close
                                                                </button>
                                                            </Dropdown.Item>
                                                        </ul>
                                                    </Dropdown.Menu>}

                                                </Dropdown>
                                            </div>
                                        </td>}
                                        <td>
                                            {patient?.createdByName ? patient?.createdByName.charAt(0).toUpperCase() + patient.createdByName.slice(1) : "Self"}
                                        </td>


                                        {<td className={`${tab !== "healthIssue" && "d-none"} `}>
                                            <div className='health_issue' ref={elementRef}>
                                                <div className='tooltip_wrapper'>
                                                    <span data-tooltip-id={`my-tooltip-${i}`} className='d-flex align-items-center justify-content-center'>!</span>
                                                    <ReactTooltip  id={`my-tooltip-${i}`} place="bottom" type="info" effect="solid">
                                                    <div className='tooltip_custom'>
                                                        <ul>
                                                            {Array?.isArray(patient?.health_issue_text) && patient?.health_issue_text?.map((issue, index) => (
                                                                <li key={index}>{issue}</li>
                                                            ))}
                                                        </ul>

                                                    </div>
                                                </ReactTooltip>
                                                  
                                                </div>
                                                <span> View health issue</span>
                                            </div>
                                        </td>}

                                        <td className='text-center'>
                                            <div className="d-flex gap-3 w-100 align-items-center">
                                                {PatientPermissions?.canUpdate && <svg onClick={() => { setshowEditPateintModal(true); setPatientId(patient?.id) }} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.26562 19.2151L11.0737 19.1953L23.7507 6.5834C24.2482 6.08368 24.5219 5.42004 24.5219 4.71409C24.5219 4.00814 24.2482 3.3445 23.7507 2.84478L21.6633 0.748087C20.6683 -0.251345 18.9323 -0.246057 17.9452 0.744121L5.26562 13.3586V19.2151ZM19.8023 2.6174L21.8936 4.71012L19.7917 6.80153L17.7044 4.70616L19.8023 2.6174ZM7.89788 14.4612L15.8341 6.56489L17.9215 8.66158L9.98658 16.5552L7.89788 16.5619V14.4612Z" fill="black" />
                                                    <path d="M2.63226 24.489H21.0581C22.5098 24.489 23.6903 23.3029 23.6903 21.8445V10.3835L21.0581 13.0279V21.8445H6.7886C6.75438 21.8445 6.71884 21.8577 6.68462 21.8577C6.64119 21.8577 6.59776 21.8458 6.55301 21.8445H2.63226V3.33341H11.6438L14.2761 0.688965H2.63226C1.18057 0.688965 0 1.875 0 3.33341V21.8445C0 23.3029 1.18057 24.489 2.63226 24.489Z" fill="black" />
                                                </svg>}
                                                {PatientPermissions?.canDelete && <svg onClick={() => { setShowDeleteModal(true); setPatientId(patient?.id) }} width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3.96355 24C3.28478 24 2.70701 23.7606 2.23026 23.2817C1.7535 22.8028 1.51512 22.223 1.51512 21.5422V2.69372H0V1.17185H6.06048V0H15.1512V1.17185H21.2117V2.69372H19.6965V21.5422C19.6965 22.2422 19.4632 22.8271 18.9966 23.2969C18.5299 23.7666 17.9471 24.001 17.2481 24H3.96355ZM18.1814 2.69372H3.03024V21.5422C3.03024 21.8151 3.11761 22.0393 3.29235 22.2148C3.4671 22.3904 3.69083 22.4781 3.96355 22.4781H17.2496C17.4819 22.4781 17.6956 22.3807 17.8905 22.1859C18.0855 21.9911 18.1824 21.776 18.1814 21.5406V2.69372ZM7.28469 19.4344H8.79981V5.73748H7.28469V19.4344ZM12.4119 19.4344H13.927V5.73748H12.4119V19.4344Z" fill="black" />
                                                </svg>}
                                                {PatientPlan?.canRead && tab !== "healthIssue" && showButtons && <button onClick={() => navigate("/patientData", { state: { patientId: patient?.id } })} className='cmn_btn fade_color px-2 py-1' style={{ height: "36px" }}> <img width="18" src={ArrowRight} /> </button>}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}

                        </DataTable>
                    </div>
                    {patient_data?.isSuccess && patient_data?.data?.data?.totalPages > 1 && <Pagination totalPages={patient_data?.data?.data?.totalPages} onPageChange={handlePageChange} setPage={setPage} page={page}/>}
                </div>
                <DeleteModal showDeleteModal={showDeleteModal} setshowDeleteModal={setShowDeleteModal} handleDelete={handleDelete} loading={is_patient_deleted?.isLoading} />
                <AddpatientModal showPateintModal={showPateintModal} setshowPateintModal={setshowPateintModal} tab={tab} common_data={common_data} setTab={setTab} />
                <EditpatientModal showPateintModal={showEditPateintModal} setshowPateintModal={setshowEditPateintModal} tab={tab} common_data={common_data} patientId={patientId} page={page} setPatientId={setPatientId} />
            </div>
        </div>
    )
}

export default Reception_patient_list