import React from "react";
import { Row, Col } from "react-bootstrap";
import PoseImage from "../../Images/pose_image.png";
import { Dropdown } from "react-bootstrap";
const ExerciseView = () => {
  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="cmn_head pb-3">
          <h2>Tree pose</h2>
        </div>
        <div className="cmn_bg_wrapper">
          <Row className="m-0 ">
            <Col lg={6} className="ps-0 pe-4">
              <div className="pose_image">
                <img src={PoseImage} alt="Exercise Image" />
              </div>
              <h4 className="exercise_heading text-center mt-2">Image</h4>
              <ul className="exercise_status mt-5">
                <li>
                  <h5>Category</h5> <p className="">Flexibility</p>
                </li>
                <li className="table">
                 <h5>Exercise Status</h5>{" "}
                  <div className="patient_dropdown">
                    <Dropdown>
                      <Dropdown.Toggle variant="unset">
                        Category
                        <svg
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
                        </svg>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <ul>
                          {/* <li><input type="text" placeholder='Search Trainer' /> <span>Search Trainer</span></li> */}
                          <li>Deepak Rawat</li>
                          <li>Sahil</li>
                          <li>Aman</li>
                        </ul>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </li>
              </ul>
            </Col>
            <Col lg={6} className="pe-0 ps-4">
              <h4 className="exercise_heading">Description</h4>
              <p>
                Tree pose, also known as Vrikshasana, is a standing yoga pose
                that challenges balance, stability, and focus. It's a beginner
                pose that can be done anywhere in a yoga sequence, or even as a
                standalone pose. 
              </p>
              <h4 className="exercise_heading mt-5">Description</h4>
              <div className="exercise_video">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/LhL5SNZfnQs"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </Col>
            <Col lg={12} className="">
            <div className="d-flex justify-content-center gap-3 pt-3">
                <button className="cmn_btn ps-4 pe-4">Back</button>
                <button className="cmn_btn ps-4 pe-4">Save</button>
            </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ExerciseView;
