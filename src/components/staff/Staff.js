import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Default_user from '../../Images/default_user.svg'
import AddUsermodal from "../../components/Modals/AddUsermodal";
import DataTable from "../../components/DataTable/DataTable";
import EditStaffmodal from "../Modals/editStaffModal";
import DeleteModal from "../Modals/DeleteModal";
import Pagination from "../../common/pagination/Pagination";
import { get_all_staff, clear_staff_data } from "../../redux/slices/staffSlice/getAllUsers";
import { useDispatch, useSelector } from "react-redux";
import "./staff.css"
import Loader from "../../common/Loader/Loader";
import { delete_staff, clear_delete_staff_state } from "../../redux/slices/staffSlice/deleteStaff"
import toast from "react-hot-toast";
import Nodata from "../StaticComponents/Nodata";


const StaffComponent = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setshowDeleteModal] = useState(false);
    const [page, setPage] = useState(1);
    const staff_data = useSelector((store) => store.ALL_STAFF)
    const is_staff_deleted = useSelector((store) => store.DELETE_STAFF)
    const [staffId, setStaffId] = useState(null)

    useEffect(() => {
        dispatch(get_all_staff({ page }))
    }, [page])


    const columns = ['User', 'Date', 'Phone Number', 'Gender', 'Status', 'Action']
    const handleShow = () => setShow(true);

    const handlePageChange = (newPage) => {
        setPage(newPage + 1);
    };

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day} ${month} ${year}`;
    }

    const handleDelete = () => {
        dispatch(delete_staff({ id: staffId }))
    }

    useEffect(() => {
        if (is_staff_deleted?.isSuccess) {
            toast.success(is_staff_deleted?.message.message)
            dispatch(get_all_staff({ page }))
            dispatch(clear_delete_staff_state())
            setshowDeleteModal(false)
        }
        if (is_staff_deleted?.isError) {
            toast.error(is_staff_deleted?.error?.message)
            dispatch(clear_delete_staff_state())
        }
    }, [is_staff_deleted])

    return (
        <div className="wrapper">
            <div className="inner_wrapper">
                <div className="cmn_head d-flex justify-content-between align-items-center mb-2">
                    <h2>Users</h2> <button className="cmn_btn" onClick={handleShow}>+ Add User</button>
                </div>
                <div className="cmn_table dark_btn">
                    <DataTable columns={columns} hasCheckbox={true}>
                        {staff_data?.isLoading ? (
                            <tr>
                                <td colSpan={5}>
                                    <Loader />
                                </td>
                            </tr>
                        ) : staff_data?.isSuccess && Array.isArray(staff_data?.data?.data?.items) ? (
                            staff_data.data.data.items.length === 0 ? (
                                <Nodata />
                            ) : (
                                staff_data.data.data.items.map((staff, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div className="d-flex align-items-center table_user">
                                                <div className="staff_image">
                                                    <img
                                                        src={staff?.image || Default_user}
                                                        alt="User"
                                                    />
                                                </div>
                                                <div className="d-inline-grid">
                                                    <p className="mb-0">
                                                        {staff?.firstName
                                                            ? `${staff.firstName.charAt(0).toUpperCase()}${staff.firstName.slice(1)} ${staff.lastName || ''}`
                                                            : ''}
                                                    </p>
                                                    <span>{staff?.role}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{formatDate(staff?.created_at)}</td>
                                        <td>{staff?.phone || 'N/A'}</td>
                                        <td>{staff?.gender || 'Male'}</td>
                                        <td>
                                            <button className="btn_info inactive">
                                                {staff?.status === 1 ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td>
                                            <div className="d-flex justify-content-between w-100">
                                                <svg onClick={() => { setShowEditModal(true); setStaffId(staff?.id) }} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.26562 19.2151L11.0737 19.1953L23.7507 6.5834C24.2482 6.08368 24.5219 5.42004 24.5219 4.71409C24.5219 4.00814 24.2482 3.3445 23.7507 2.84478L21.6633 0.748087C20.6683 -0.251345 18.9323 -0.246057 17.9452 0.744121L5.26562 13.3586V19.2151ZM19.8023 2.6174L21.8936 4.71012L19.7917 6.80153L17.7044 4.70616L19.8023 2.6174ZM7.89788 14.4612L15.8341 6.56489L17.9215 8.66158L9.98658 16.5552L7.89788 16.5619V14.4612Z" fill="black" />
                                                    <path d="M2.63226 24.489H21.0581C22.5098 24.489 23.6903 23.3029 23.6903 21.8445V10.3835L21.0581 13.0279V21.8445H6.7886C6.75438 21.8445 6.71884 21.8577 6.68462 21.8577C6.64119 21.8577 6.59776 21.8458 6.55301 21.8445H2.63226V3.33341H11.6438L14.2761 0.688965H2.63226C1.18057 0.688965 0 1.875 0 3.33341V21.8445C0 23.3029 1.18057 24.489 2.63226 24.489Z" fill="black" />
                                                </svg>
                                                <svg onClick={() => { setshowDeleteModal(true); setStaffId(staff?.id) }} className="me-3" width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3.96355 24C3.28478 24 2.70701 23.7606 2.23026 23.2817C1.7535 22.8028 1.51512 22.223 1.51512 21.5422V2.69372H0V1.17185H6.06048V0H15.1512V1.17185H21.2117V2.69372H19.6965V21.5422C19.6965 22.2422 19.4632 22.8271 18.9966 23.2969C18.5299 23.7666 17.9471 24.001 17.2481 24H3.96355ZM18.1814 2.69372H3.03024V21.5422C3.03024 21.8151 3.11761 22.0393 3.29235 22.2148C3.4671 22.3904 3.69083 22.4781 3.96355 22.4781H17.2496C17.4819 22.4781 17.6956 22.3807 17.8905 22.1859C18.0855 21.9911 18.1824 21.776 18.1814 21.5406V2.69372ZM7.28469 19.4344H8.79981V5.73748H7.28469V19.4344ZM12.4119 19.4344H13.927V5.73748H12.4119V19.4344Z" fill="black" />
                                                </svg>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )
                        ) : (
                            <tr>
                                <td colSpan={5}>
                                    <Nodata />
                                </td>
                            </tr>
                        )}


                    </DataTable>
                    {staff_data?.isSuccess && staff_data?.data?.data?.totalPages > 1 && <Pagination totalPages={staff_data?.data?.data?.totalPages} onPageChange={handlePageChange} setPage={setPage} />}
                </div>
            </div>
            <DeleteModal showDeleteModal={showDeleteModal} setshowDeleteModal={setshowDeleteModal} handleDelete={handleDelete} loading={is_staff_deleted?.isLoading} />
            <AddUsermodal show={show} setShow={setShow} />
            <EditStaffmodal show={showEditModal} setShow={setShowEditModal} staffId={staffId} page={page} />
        </div>
    )
}

export default StaffComponent