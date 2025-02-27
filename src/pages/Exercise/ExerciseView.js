import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import PoseImage from "../../Images/pose_image.png";
import { Dropdown } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { get_single_exercise } from "../../redux/slices/exerciseSlice/getSingleExercise";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../common/Loader/Loader";
import ReactPlayer from 'react-player';
import "./Exercise.css"
import { update_exercise_status, clear_update_exercise_status_state } from "../../redux/slices/exerciseSlice/updateExerciseStatus";
import toast from "react-hot-toast";


const ExerciseView = () => {
  const location = useLocation()
  const { id, val } = location?.state ? location?.state : location
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [disableDropdown, setDisableDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOption, setSelectedOption] = useState(null);
  const is_exercise = useSelector((store) => store.SINGLE_EXERCISE);
  const is_status_updated = useSelector((store) => store.UPDATE_EXERCISE_STATUS)
  const [exercise_data, setExerciseData] = useState()

  useEffect(() => {
    if (id) {
      dispatch(get_single_exercise({ id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (is_exercise?.isSuccess) {
      setExerciseData(is_exercise?.data?.data)
      setSelectedOption(is_exercise?.data?.data?.status)
      setIsLoading(false)
    }
    if (is_exercise?.isError) {
      toast.error("Something went wrong")
      setExerciseData(null)
      setIsLoading(false)
    }
  }, [is_exercise])

  let loadingToastId;

  const handleChange = (e) => {
    setDisableDropdown(true)
    loadingToastId = toast.loading("Updating status...");
    dispatch(update_exercise_status({ id, status: Number(e.target.value) }))
  };

  useEffect(() => {
    if (is_status_updated?.isSuccess) {
      toast.dismiss(loadingToastId)
      toast.success("Status updated successfully")
      dispatch(get_single_exercise({ id }));
      dispatch(clear_update_exercise_status_state())
      setDisableDropdown(false)
    }
    if (is_status_updated?.isError) {
      toast.dismiss(loadingToastId)
      toast.error("Something went wrong")
      dispatch(clear_update_exercise_status_state())
      setDisableDropdown(false)
    }
  }, [is_status_updated])

  return is_exercise?.isLoading && isLoading ?
    <div className="wrapper">
      <div className="inner_wrapper">
        <Loader wrapclass="full_height" />
      </div></div> : (
      <div className="wrapper">
        <div className="inner_wrapper">
          <div className="cmn_head pb-3 d-flex justify-content-between">
            <h2 className="text-capitalize">{exercise_data?.exercise_name}</h2>
            <div className="status_dropdown_wrapper">
              <select value={selectedOption} onChange={handleChange} name="cars" id="cars">
                <option disabled>Please select status</option>
                <option value={0} disabled={disableDropdown}>Reject</option>
                <option value={1} disabled={disableDropdown}>Approve</option>
                <option disabled value={2} className="d-none">Pending</option>
                <option disabled value={3} className="d-none">Draft</option>
              </select>
            </div>

          </div>
          <div className="cmn_bg_wrapper p-0">
            <Row className="m-0 px-3 border-bottom pb-0">
              <Col lg={6} className="border-end pb-4 pt-4">
                <h4 className="exercise_heading text-start">Image</h4>
                <div className="pose_image">
                  <img
                    src={exercise_data?.image_url || PoseImage}
                    alt="Exercise_Image"
                    className="exercise_preview_image"
                  />
                </div>

              </Col>
              <Col lg={6} className="pt-4">
                <h4 className="exercise_heading">Video</h4>
                <div className="exercise_video">
                  <ReactPlayer
                    url={exercise_data?.video_link}
                    width="100%"
                    height="315px"
                    controls
                  />
                </div>
              </Col>



            </Row>
            <Row className="m-0 p-3">
              <Col lg={12}>
                <h4 className="ex_heading mb-4">
                  Exercise Information
                </h4>
                  
                <ul className="exercise_status d-flex gap-3">
                <li className="w-100">
                <h5 className="mb-0">Exercise Type</h5>
                    <p className="mb-3">
                    Strength Exercise
                    </p>
                  <h5 className="mb-0">Exercise Video Link</h5>
                    <p>
                    Strength Exercise
                    </p>
                   </li>
                <li className="w-100">
                <h5 className="mb-0">Exercise Name</h5>
                    <p>
                    Bench Press
                    </p>
                <h5 className="mb-0">Exercise Status</h5>
                    <p className="mb-3">
                    Approved
                    </p>
                   </li>
                <li className="w-100">
                <h5 className="mb-0">Exercise Image Url</h5>
                    <p>
                    https%3A%2F%2Fdannorthfitness.com%2F8-cues-to.
                    </p>
                   </li>
                  </ul>
                  <h4 className="ex_heading pt-3">
                  Categories and Blocks
                </h4>
                <ul className="exercise_status d-flex gap-3">
                <li className="w-100">
                    <h5 className="mb-0">Difficulty Level</h5>
                    <p>
                      Hard
                    </p>
                  </li>
                  <li className="w-100"></li>
                  <li className="w-100"></li>
                  </ul>
                <ul className="exercise_status d-flex gap-3">
                <li className="w-100">
                    <h5 className="mb-0">Blocks</h5>
                    <p>
                      Block c
                    </p>
                  </li>
                  <li className="w-100">
                  <h5 className="mb-0">Stes</h5>
                    <p>
                    03
                    </p>
                  </li>
                  <li className="w-100">
                  <h5 className="mb-0">Reps</h5>
                    <p>
                   10
                    </p>
                  </li>
                  </ul>
                
                {/* <ul className="exercise_status">
                
                  <li>
                    <h5 className="mb-0">Description</h5>
                    <p>
                      {exercise_data?.description}
                    </p>
                  </li>
                  <li className="mb-3">
                    <h5 className="mb-0">Category</h5> <p className="mb-0">{exercise_data?.category}</p>
                  </li>
                  <li className="mb-3">
                    <h5 className="mb-0">Exercise Status</h5>{" "}
                    <p className="mb-0"> {exercise_data?.status === 0 && "Rejected"}
                      {exercise_data?.status === 1 && "Approved"}
                      {exercise_data?.status === 2 && "Pending"}
                      {exercise_data?.status === 3 && "Draft"}</p>
                  </li>
                  <li>
                    <h5 className="mb-3">Body parts</h5>{" "}


                    {exercise_data?.body_parts?.map((item, i) => (
                      <>
                        <h5 key={i} className="mb-1">{item?.name}</h5> <p className="mb-2">{item?.movements?.join(", ")}</p>
                      </>
                    ))}

                  </li>
                </ul> */}
              </Col>
            </Row>
          </div>
          <div>
            <Col lg={12} className="">
              <div className="d-flex justify-content-center gap-3 pt-3">
                <button className="cmn_btn ps-4 pe-4" onClick={() => navigate("/exercise", { state: { val: val } })}>Back</button>
              </div>
            </Col>
          </div>
        </div>
      </div>


    );
};

export default ExerciseView;
