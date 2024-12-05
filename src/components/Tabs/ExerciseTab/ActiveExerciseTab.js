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
import { FaRegEye } from "react-icons/fa";
import Nodata from '../../StaticComponents/Nodata';

const ActiveExerciseTab = ({ tab, showDropdown, exercise_category, admin }) => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false);
  const [all_exercise, setAllExercise] = useState()
  const [exerciseId, setExerciseId] = useState(null)
  const [editExerciseModal, setEditExerciseModal] = useState(false)
  const [status, setStatus] = useState(null)
  console.log(status, "this is the status")
  const [save, setSave] = useState(false)
  const [index, setIndex] = useState(null)

  console.log(index, "this is the index ")
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

  return (
    <div>
      <DataTable columns={columns}>
        {exercise_data?.isLoading ? <tr><td colSpan={5}> <Loader /></td> </tr> : exercise_data?.data?.data?.items?.length === 0 ? <tr className='text-center' ><td colSpan={9}><Nodata /></td></tr> : Array.isArray(all_exercise) && all_exercise?.map((exercise, i) => {
          return (
            <tr>

              <td>{exercise?.exercise_name ? exercise?.exercise_name?.charAt(0)?.toUpperCase() + exercise.exercise_name.slice(1) : ''}</td>
              <td><img src={exercise?.imageUrl || PoseImage} width={40} height={40} className='rounded-5' /></td>
              <td><a href={exercise?.video_link} target='blank'><span role="button" className='text-decoration-underline'>{exercise?.video_link}</span></a></td>
              <td>{exercise?.category ? exercise?.category?.charAt(0).toUpperCase() + exercise?.category.slice(1) : ""}</td>
              <td> <div className='patient_dropdown w-100'>
                <Dropdown
                  show={isOpen}
                  onToggle={(nextOpenState) => {
                    setIsOpen(nextOpenState); // Sync the dropdown state
                    if (!nextOpenState) {
                      setStatus(null); // Reset status when dropdown closes
                    }
                  }}
                  autoClose={false}
                >
                  <Dropdown.Toggle
                    variant="unset"
                    id={`dropdown-autoclose-inside-${i}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent handlers from interfering
                      setIsOpen((prevState) => !prevState); // Toggle dropdown state
                      setIndex(i); // Set the index
                    }}
                  >
                    {exercise?.status === 2
                      ? "Pending"
                      : exercise?.status === 1
                        ? "Approved"
                        : exercise?.status === 0
                          ? "Rejected"
                          : "Draft"}
                    {localStorage.getItem('user_role') === "ADMIN" && (
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

                  {localStorage.getItem('user_role') === "ADMIN" && index === i && (
                    <Dropdown.Menu>
                      <ul>
                        {tab !== "active" && (
                          <Dropdown.Item
                            onClick={() => {
                              setStatus(1);
                              setIndex(i);
                            }}
                            className="d-flex justify-content-between"
                          >
                            Approve
                            <input
                              type="checkbox"
                              checked={status === 1}
                              onChange={() => setStatus(0)}
                            />
                          </Dropdown.Item>
                        )}
                        {tab !== "rejected" && (
                          <Dropdown.Item
                            onClick={() => {
                              setStatus(0);
                              setIndex(i);
                            }}
                            className="d-flex justify-content-between"
                          >
                            Reject
                            <input
                              type="checkbox"
                              checked={status === 0}
                              onChange={() => setStatus(0)}
                            />
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
                              setIsOpen(false); // Close dropdown
                              setStatus(null); // Reset status
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
                {/* <button  className="cmn_btn">View</button> */}
                <FaRegEye title='View Exercise' size={30} onClick={() => { setExerciseId(exercise?.id); setEditExerciseModal(true) }} />
                {/* {showDropdown && tab !== "rejected" && (
                  !is_status_updated?.isLoading ? (
                    <button
                      disabled={!save}
                      className="cmn_btn border-btn ms-2"
                      
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
                )} */}

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