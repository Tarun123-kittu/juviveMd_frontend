import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../components/DataTable/DataTable'
import { get_delete_requests } from '../../redux/slices/patientSlice/AllDeleteRequests';
import { calculateAge } from '../../common/calculateAge/calculateAge';
import { formatDate } from '../../common/formatDate/formatDate';
import { useNavigate } from 'react-router-dom';
import ArrowRight from '../../Images/button_right.svg'
import "./request.css"
import { delete_patient, clear_delete_patient_state } from '../../redux/slices/patientSlice/deletePatientSlice';
import DeleteModal from '../Modals/DeleteModal';
import toast from 'react-hot-toast';
import Loader from '../../common/Loader/Loader';
import Nodata from '../StaticComponents/Nodata';
import { Pagination } from 'react-bootstrap';


const RequestComponent = ({ showButtons }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [deleted_requests, setDeleted_requested] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const all_deleted_requests = useSelector((store) => store.DELETE_REQUESTS)
    const is_patient_deleted = useSelector((store) => store.DELETE_PATIENT)
    const [patientId, setPatientId] = useState(null)
    console.log(deleted_requests, "this is the all deleted requests")
    const columns_two = [
        "User Name",
        "Age",
        "Phone No.",
        "Gender",
        "Goal",
        "Assigned Trainer",
        "Created At",
        "Profile Overview",
        "Account Delete"
    ];

    useEffect(() => {
        dispatch(get_delete_requests({ page }))
    }, [page])

    useEffect(() => {
        if (all_deleted_requests?.isSuccess) {
            setDeleted_requested(all_deleted_requests?.data?.data?.items)
        }
        if (all_deleted_requests?.isError) {
            setDeleted_requested([])
        }
    }, [all_deleted_requests])

    const handleDelete = () => {
        dispatch(delete_patient({ id: patientId }))
    }

    useEffect(() => {
        if (is_patient_deleted?.isSuccess) {
            toast.success(is_patient_deleted?.message?.message)
            dispatch(clear_delete_patient_state())
            dispatch(get_delete_requests({ page }))
            setShowDeleteModal(false)
        }
        if (is_patient_deleted?.isError) {
            toast.error(is_patient_deleted?.error?.message)
            dispatch(clear_delete_patient_state())
        }
    }, [is_patient_deleted])

    const handlePageChange = (newPage) => {
        setPage(newPage + 1);
    };

    return (
        <div>
            <div className='wrapper'>
                <div className='inner_wrapper'>
                    <div className="cmn_head d-flex align-items-center mb-3 position-relative gap-3">
                        <h2 className='flex-grow-1'>Delete Patient Requests</h2>
                    </div>
                    <div className='patient_data'>
                        <DataTable columns={columns_two}>
                            {all_deleted_requests?.isLoading ? <tr><td colSpan={10}><Loader /></td></tr> : all_deleted_requests?.data?.data?.items?.length === 0 ? <tr className='text-center' ><td colSpan={10}><Nodata /> </td></tr> : Array.isArray(deleted_requests) && deleted_requests?.map((request, i) => {
                                return (

                                    <tr>
                                        <td className="ps-3">
                                            <div className="d-flex align-items-center table_user">
                                                <img type="button" src={request?.gender === "FEMALE" ? "/female.webp" : "/male.png"} alt="User-image" width={40} height={40} className='object-fit-cove' />
                                                <div className="d-inline-grid">
                                                    <p className="mb-0">{request?.firstName ? request.firstName.charAt(0).toUpperCase() + request.firstName.slice(1) : ''} {request?.lastName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{calculateAge(request?.dob)}</td>
                                        <td className='text-nowrap'>{request?.countryCode} {request?.phone}</td>
                                        <td>
                                            {request?.gender
                                                ? request.gender.charAt(0).toUpperCase() + request.gender.slice(1).toLowerCase()
                                                : ''}
                                        </td>
                                        <td>{request?.goal}</td>
                                        <td>{request?.trainerName ? request?.trainerName : "Not assigned yet"}</td>
                                        <td>{request?.created_at ? formatDate(request?.created_at) : null}</td>


                                        <td className='text-center'>
                                            <div className="d-flex gap-3 w-100 align-items-center">

                                                <button onClick={() => navigate("/patientData", { state: { patientId: request?.id, hideItems: true } })} className='cmn_btn px-2 py-1' style={{ height: "36px" }}> <img width="18" src={ArrowRight} /> </button>
                                            </div>
                                        </td>
                                        <td><button className='account_delete' onClick={() => { setShowDeleteModal(true); setPatientId(request?.id) }}> Account Delete</button></td>
                                    </tr>
                                )
                            })}

                        </DataTable>
                    </div>
                    <DeleteModal showDeleteModal={showDeleteModal} setshowDeleteModal={setShowDeleteModal} handleDelete={handleDelete} loading={is_patient_deleted?.isLoading} />
                    {all_deleted_requests?.isSuccess && all_deleted_requests?.data?.data?.totalPages > 1 && <Pagination totalPages={all_deleted_requests?.data?.data?.totalPages} onPageChange={handlePageChange} setPage={setPage} page={page} />}
                </div>

            </div>
        </div>
    )
}

export default RequestComponent