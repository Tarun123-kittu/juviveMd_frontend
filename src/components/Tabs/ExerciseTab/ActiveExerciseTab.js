import React, { useEffect, useState } from 'react'
import DataTable from '../../DataTable/DataTable'
import PoseImage from '../../../Images/treepose.png'
import { Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { get_exercise } from '../../../redux/slices/exerciseSlice/getExercise';
import Loader from '../../../common/Loader/Loader';
import No_data_found from "../../../Images/No_data_found.svg"
import { update_exercise_status, clear_update_exercise_status_state } from '../../../redux/slices/exerciseSlice/updateExerciseStatus';
import toast from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';
import EditExcercise from '../../Modals/editExercise';

const ActiveExerciseTab = ({ tab, showDropdown, exercise_category, admin}) => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [all_exercise, setAllExercise] = useState()
  const [exerciseId, setExerciseId] = useState(null)
  const [editExerciseModal, setEditExerciseModal] = useState(false)
  const [status, setStatus] = useState(null)
  const [save, setSave] = useState(false)
  const [index, setIndex] = useState(null)
  const columns = [
    "Exercise Name",
    "Image",
    "Exercise Link",
    "Category",
    "Exercise Status",
    "View"
  ];

  const exercise_data = useSelector((store) => store.ALL_EXERCISES)
  const is_status_updated = useSelector((store) => store.UPDATE_EXERCISE_STATUS)

  useEffect(() => {
    if (tab) {
      dispatch(get_exercise({ page, tab }))
    }
  }, [tab])

  useEffect(() => {
    if (exercise_data?.isSuccess) {
      setAllExercise(exercise_data?.data?.data?.items)
    }
  }, [exercise_data])

  const handleUpdateStatus = (id) => {
    dispatch(update_exercise_status({ id, status }))
  }

  useEffect(() => {
    if (is_status_updated?.isSuccess) {
      toast.success(is_status_updated?.message?.message)
      dispatch(get_exercise({ page, tab }))
      setSave(false)
      dispatch(clear_update_exercise_status_state())
    }
    if (is_status_updated?.isError) {
      toast.success(is_status_updated?.error?.message)
      dispatch(clear_update_exercise_status_state())
    }
  }, [is_status_updated])

  return (
    <div>
      <DataTable columns={columns}>
        {exercise_data?.isLoading ? <tr><td colSpan={5}> <Loader /></td> </tr> : exercise_data?.data?.data?.items?.length === 0 ? <tr className='text-center' ><td colSpan={9}><img className='text-center w-25 m-auto mt-5 mb-5' src={No_data_found} alt="" /> </td></tr> : Array.isArray(all_exercise) && all_exercise?.map((exercise, i) => {
          return (
            <tr>

              <td>{exercise?.exercise_name ? exercise?.exercise_name?.charAt(0)?.toUpperCase() + exercise.exercise_name.slice(1) : ''}</td>
              <td><img src={exercise?.imageUrl || PoseImage} width={40} height={40} className='rounded-5' /></td>
              <td><span role="button" className='text-decoration-underline'>{exercise?.video_link}</span></td>
              <td>{exercise?.category ? exercise?.category?.charAt(0).toUpperCase() + exercise?.category.slice(1) : ""}</td>
              <td> <div className='patient_dropdown w-100'>
                <Dropdown>
                  <Dropdown.Toggle variant="unset">
                    {index === i && status === 1
                      ? "Approved"
                      : status === 0
                        ? "Rejected"
                        : exercise?.status === 2
                          ? "Pending"
                          : exercise?.status === 1
                            ? "Approved"
                            : exercise?.status === 0
                              ? "Rejected"
                              : "Draft"}
                    {localStorage?.getItem('user_role') === "ADMIN" && <svg
                      width="10"
                      height="15"
                      viewBox="0 0 10 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.982514 2.01959L2.27927 0.879444L9.34239 7.09323C9.45625 7.1928 9.5466 7.3112 9.60826 7.44161C9.66992 7.57203 9.70166 7.71189 9.70166 7.85315C9.70166 7.9944 9.66992 8.13426 9.60826 8.26468C9.5466 8.3951 9.45625 8.5135 9.34239 8.61306L2.27927 14.8301L0.983737 13.6899L7.61297 7.85476L0.982514 2.01959Z"
                        fill="black"
                      />
                    </svg>}
                  </Dropdown.Toggle>

                  {showDropdown && tab !== "rejected" && (
                    <Dropdown.Menu>
                      <ul>
                        <Dropdown.Item role="button" onClick={() => { setStatus(0); setIndex(i); setSave(true) }}>Reject</Dropdown.Item>
                        {tab !== "active" && (
                          <Dropdown.Item role="button" onClick={() => { setStatus(1); setIndex(i); setSave(true) }}>Approve</Dropdown.Item>
                        )}
                      </ul>
                    </Dropdown.Menu>
                  )}
                </Dropdown>

              </div></td>
              <td>
                <button onClick={() => { setExerciseId(exercise?.id); setEditExerciseModal(true) }} className="cmn_btn">View</button>
                {showDropdown && tab !== "rejected" && (
                  !is_status_updated?.isLoading ? (
                    <button
                      disabled={!save}
                      className="cmn_btn border-btn ms-2"
                      onClick={() => handleUpdateStatus(exercise?.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button className="cmn_btn border-btn ms-2" disabled>
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </button>
                  )
                )}

              </td>

            </tr>
          )
        })}

      </DataTable>
      <EditExcercise
        showAddExerciseModal={editExerciseModal}
        setshowAddExerciseModal={setEditExerciseModal}
        exercise_category={exercise_category}
        tab={tab}
        id={exerciseId}
        admin={admin}
        setExerciseId={setExerciseId}
      />
    </div>
  )
}

export default ActiveExerciseTab