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

const ExerciseView = () => {
  const location = useLocation()
  const { id, val } = location?.state ? location?.state : location
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const is_exercise = useSelector((store) => store.SINGLE_EXERCISE);
  const [exercise_data, setExerciseData] = useState()

  useEffect(() => {
    if (id) {
      dispatch(get_single_exercise({ id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (is_exercise?.isSuccess) {
      setExerciseData(is_exercise?.data?.data)
    }
  }, [is_exercise])
  return is_exercise?.isLoading ?
    <div className="wrapper">
      <div className="inner_wrapper">
        <Loader wrapclass="full_height" />
      </div></div> : (
      <div className="wrapper">
        <div className="inner_wrapper">
          <div className="cmn_head pb-3">
            <h2 className="text-capitalize">{exercise_data?.exercise_name}</h2>
          </div>
          <div className="cmn_bg_wrapper">
            <Row className="m-0 ">
              <Col lg={6} className="ps-0 pe-4 border-end">
                  <h4 className="exercise_heading text-start">Image</h4>
                <div className="pose_image">
                  <img
                    src={exercise_data?.image_url || PoseImage}
                    alt="Exercise_Image"
                    className="exercise_preview_image"
                  />

                </div>
                <h4 className="exercise_heading mt-3">Video</h4>
                <div className="exercise_video">
                  <ReactPlayer
                    url={exercise_data?.video_link}
                    width="100%"
                    height="315px"
                    controls
                  />
                </div>
              </Col>
              <Col lg={6} className="pe-0 ps-4">
               
              
                <ul className="exercise_status">
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
                </ul>
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
