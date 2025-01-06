import React, { useEffect, useState } from 'react'
import DataTable from '../../DataTable/DataTable'
import PoseImage from '../../../Images/treepose.png'
import { Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { get_exercise } from '../../../redux/slices/exerciseSlice/getExercise';
import Loader from '../../../common/Loader/Loader';
import { update_exercise_status, clear_update_exercise_status_state } from '../../../redux/slices/exerciseSlice/updateExerciseStatus';
import toast from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';
import EditExcercise from '../../Modals/editExercise';
import { FaRegEye,FaRegTrashAlt } from "react-icons/fa";
import Nodata from '../../StaticComponents/Nodata';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../common/pagination/Pagination';
import { FaEdit } from "react-icons/fa";
import { getRoutePermissions } from '../../../middleware/permissionsMiddleware/getRoutePermissions';
import { permission_constants } from '../../../constants/permissionConstants';
import { clear_get_single_exercise_state } from '../../../redux/slices/exerciseSlice/getExercise';
import { delete_exercise, clear_delete_exercise_state } from '../../../redux/slices/exerciseSlice/deleteExercise';
import DeleteModal from '../../Modals/DeleteModal';


const ActiveExerciseTab = ({ tab, showDropdown, exercise_category, admin, setToggleFilter, pathname, ExercisePermission, body_parts, exerciseDifficuilty, setIsTabActive }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false);
  const [all_exercise, setAllExercise] = useState()
  const [exerciseId, setExerciseId] = useState(null)
  const [editExerciseModal, setEditExerciseModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [status, setStatus] = useState(null)
  const [save, setSave] = useState(false)
  const [index, setIndex] = useState(null)
  const [ExercisePermissionApproveReject] = getRoutePermissions(permission_constants.EXERCISEAPPROVEREJECT)
  const is_exercise_deleted = useSelector((store) => store.DELETE_EXERCISE)

  const columns = [
    "Exercise Name",
    "Image",
    "Exercise Link",
    "Category",
    "Exercise Status",
    "Created By",
    "Action"
  ];

  const exercise_data = useSelector((store) => store.ALL_EXERCISES)
  const is_status_updated = useSelector((store) => store.UPDATE_EXERCISE_STATUS)

  useEffect(() => {
    if (tab) {
      setIsTabActive(true)
      dispatch(clear_get_single_exercise_state())
      dispatch(get_exercise({ page, tab }))
    }
  }, [tab, page, dispatch])

  useEffect(() => {
    if (exercise_data?.isSuccess) {
      setIsTabActive(false)
      setAllExercise(exercise_data?.data?.data?.items);
      setToggleFilter(false)
    }
  }, [exercise_data])

  const handleUpdateStatus = (id) => {
    dispatch(update_exercise_status({ id, status }))
  }

  useEffect(() => {
    if (is_status_updated?.isSuccess) {
      toast.success(is_status_updated?.message?.message)
      dispatch(get_exercise({ page, tab }))
      setStatus(null)
      setSave(false)
      setIsOpen(false)
      dispatch(clear_update_exercise_status_state())
    }
    if (is_status_updated?.isError) {
      toast.error(is_status_updated?.error?.message)
      dispatch(clear_update_exercise_status_state())
    }
  }, [is_status_updated])

  useEffect(() => {
    setStatus(null)
    setIsOpen(false)
  }, [tab])

  const handlePageChange = (newPage) => {
    setPage(newPage + 1);
  };

  const handleDelete = () => {
    dispatch(delete_exercise({ id: exerciseId }))
  }

  useEffect(() => {
    if (is_exercise_deleted?.isSuccess) {
      toast.success("Exercise deleted successfully !!")
      dispatch(get_exercise({ page, tab }))
      dispatch(clear_delete_exercise_state())
      setShowDeleteModal(false)
    }
    if (is_exercise_deleted?.isError) {
      toast.success(is_exercise_deleted.error.message)
      dispatch(clear_delete_exercise_state())
    }
  }, [is_exercise_deleted])

  return (
    <div >
      <div className={`${exercise_data?.data?.data?.totalPages > 1 && "streach_table"}`}>
        <DataTable columns={columns}>
          {exercise_data?.isLoading ? <tr><td colSpan={7}> <Loader /></td> </tr> : exercise_data?.data?.data?.items?.length === 0 ? <tr className='text-center' ><td colSpan={7}><Nodata /></td></tr> : Array.isArray(all_exercise) && all_exercise?.map((exercise, i) => {
            return (
              <tr>

                <td>{exercise?.exercise_name ? exercise?.exercise_name?.charAt(0)?.toUpperCase() + exercise.exercise_name.slice(1) : ''}</td>
                <td><img src={exercise?.imageUrl || PoseImage} width={40} height={40} className='rounded-5' alt="exercise" /></td>
                <td>
                  {exercise?.video_link ? (
                    <a
                      href={exercise.video_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span
                        role="button"
                        className="text-decoration-underline text-truncate d-inline-block"
                        style={{ width: '200px' }}
                      >
                        {exercise.video_link}
                      </span>
                    </a>
                  ) : (
                    <span>No Video Link Available</span>
                  )}
                </td>
                <td>{exercise?.category ? exercise?.category?.charAt(0).toUpperCase() + exercise?.category.slice(1) : ""}</td>
                <td className={ExercisePermissionApproveReject?.canUpdate ? "" : 'nodropdown'}> <div className='patient_dropdown w-100'>
                  <Dropdown
                    show={isOpen}
                    onToggle={(nextOpenState) => {
                      setIsOpen(nextOpenState);
                      if (!nextOpenState) {
                        setTimeout(() => setStatus(null), 0);
                      }
                    }}
                    autoClose={false}
                  >
                    <Dropdown.Toggle
                      variant="unset"
                      id={`dropdown-autoclose-inside-${i}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen((prevState) => !prevState);
                        setIndex(i);
                      }}
                    >
                      {exercise?.status === 2
                        ? "Pending"
                        : exercise?.status === 1
                          ? "Approved"
                          : exercise?.status === 0
                            ? "Rejected"
                            : "Draft"}
                      {ExercisePermissionApproveReject?.canUpdate && (
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
                      )}
                    </Dropdown.Toggle>

                    {ExercisePermissionApproveReject?.canUpdate && index === i && (
                      <Dropdown.Menu>
                        <ul>
                          {tab !== "active" && (
                            <Dropdown.Item
                              onClick={() => {
                                setStatus(1);
                                setIndex(i);
                              }}
                              className="d-flex gap-2"
                            >
                              <input
                                type="checkbox"
                                checked={status === 1}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStatus(1);
                                  setIndex(i);
                                }}
                              />
                              Approve

                            </Dropdown.Item>
                          )}
                          {tab !== "rejected" && (
                            <Dropdown.Item
                              onClick={() => {
                                setStatus(0);
                                setIndex(i);
                              }}
                              className="d-flex gap-2"
                            >
                              <input
                                type="checkbox"
                                checked={status === 0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStatus(0);
                                  setIndex(i);
                                }}
                              />
                              Reject
                            </Dropdown.Item>
                          )}
                          <Dropdown.Item className="d-flex justify-content-between">
                            {!is_status_updated?.isLoading ? (
                              <button
                                className="cmn_btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdateStatus(exercise?.id, status);
                                }}
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
                              onClick={() => {
                                setIsOpen(false);
                                setStatus(null);
                              }}
                            >
                              Close
                            </button>
                          </Dropdown.Item>
                        </ul>
                      </Dropdown.Menu>

                    )}
                  </Dropdown>
                </div></td>
                <td>
                  {exercise?.trainerName ? exercise?.trainerName?.charAt(0).toUpperCase() + exercise.trainerName.slice(1) : ''}
                </td>
                <td>
                  <div className='d-flex gap-3'>
                    {(ExercisePermission?.canRead && ExercisePermission?.canRead) && <FaRegEye title='View Exercise' size={30} onClick={() => { navigate("/exerciseView", { state: { id: exercise?.id, tab: tab } }) }} />}
                    {(ExercisePermission?.canUpdate && ExercisePermission?.canUpdate) && (tab === "draft" || tab === "rejected") && <FaEdit title='Edit Exercise' size={30} onClick={() => { setExerciseId(exercise?.id); setEditExerciseModal(true) }} />}
                    {ExercisePermission?.canDelete && <FaRegTrashAlt className='me-2' title='Delete Exercise' size={30} onClick={() => { setShowDeleteModal(true); setExerciseId(exercise?.id) }} />}
                  </div>
                </td>
              </tr>
            )
          })}

        </DataTable>
      </div>
      {exercise_data?.isSuccess && exercise_data?.data?.data?.totalPages > 1 && <Pagination totalPages={exercise_data?.data?.data?.totalPages} onPageChange={handlePageChange} setPage={setPage} />}
      <EditExcercise
        showAddExerciseModal={editExerciseModal}
        setshowAddExerciseModal={setEditExerciseModal}
        exercise_category={exercise_category}
        tab={tab}
        id={exerciseId}
        admin={admin}
        setExerciseId={setExerciseId}
        ExercisePermission={ExercisePermission}
        ExercisePermissionApproveReject={ExercisePermissionApproveReject}
        body_parts={body_parts}
        exerciseDifficuilty={exerciseDifficuilty}
      />
      <DeleteModal showDeleteModal={showDeleteModal} setshowDeleteModal={setShowDeleteModal} handleDelete={handleDelete} loading={is_exercise_deleted?.isLoading} />
    </div>
  )
}

export default ActiveExerciseTab