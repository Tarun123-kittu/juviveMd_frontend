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
  const { id, tab } = location?.state ? location?.state : location
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
  return is_exercise?.isLoading ? <Loader /> : (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="cmn_head pb-3">
          <h2>{exercise_data?.exercise_name}</h2>
        </div>
        <div className="cmn_bg_wrapper">
          <Row className="m-0 ">
            <Col lg={5} className="ps-0 pe-4">
              <div className="pose_image">
                <img
                  src={exercise_data?.imageUrl || PoseImage}
                  alt="Exercise_Image"
                  className="exercise_preview_image"
                  style={{ width: '100%', height: '350px', objectFit: 'cover' }}
                />

              </div>
              <h4 className="exercise_heading text-center mt-2">Image</h4>
              <ul className="exercise_status mt-5">
                <li>
                  <h5>Category</h5> <p className="">{exercise_data?.category}</p>
                </li>
                <li className="table">
                  <h5>Exercise Status</h5>{" "}
                  <div className="patient_dropdown">
                    <Dropdown>
                      <Dropdown.Toggle variant="unset">
                        {exercise_data?.status === 0 && "Rejected"}
                        {exercise_data?.status === 1 && "Approved"}
                        {exercise_data?.status === 2 && "Pending"}
                        {exercise_data?.status === 3 && "Draft"}
                        {/* <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z"
                            fill="black"
                            fill-opacity="0.25"
                          />
                        </svg> */}
                      </Dropdown.Toggle>

                      {/* <Dropdown.Menu>
                        <ul>
                          <Dropdown.Item>Deepak Rawat</Dropdown.Item>
                          <Dropdown.Item>Sahil</Dropdown.Item>
                          <Dropdown.Item>Aman</Dropdown.Item>
                        </ul>
                      </Dropdown.Menu> */}
                    </Dropdown>
                  </div>
                </li>
                <li className="table">
                  <h5>Body parts</h5>{" "}
                  <div className="patient_dropdown">
                    {exercise_data?.body_parts?.map((item, i) => (
                      <span key={i}>
                        {Array.isArray(item?.name) ? item.name.join(", ") : item?.name}
                        {i < exercise_data.body_parts.length - 1 ? ", " : ""}
                      </span>
                    ))}

                  </div>
                </li>
              </ul>
            </Col>
            <Col lg={7} className="pe-0 ps-4">
              <h4 className="exercise_heading">Description</h4>
              <p>
                {exercise_data?.description}
              </p>
              <h4 className="exercise_heading mt-5">Exercise video</h4>
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
        </div>
        <div>
          <Col lg={12} className="">
            <div className="d-flex justify-content-center gap-3 pt-3">
              <button className="cmn_btn ps-4 pe-4" onClick={() => navigate(-1)}>Back</button>
            </div>
          </Col>
        </div>
      </div>
    </div>


  );
};

export default ExerciseView;
