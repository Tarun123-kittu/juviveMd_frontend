import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ActiveExerciseTab from "../../components/Tabs/ExerciseTab/ActiveExerciseTab";
import { Dropdown } from "react-bootstrap";
import Nodata from "../../components/StaticComponents/Nodata";
import AddExcercise from "../../components/Modals/AddExcercise";
const TrainerExercise = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [showAddExerciseModal, setshowAddExerciseModal] = useState(false);
  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="cmn_head mb-2 ">
          <h2>Exercise</h2>
        </div>
        <div className="cmn_bg_wrapper exercise_tab">
          <div className="position-relative">
           <div className="d-flex gap-2 position-absolute end-0">
           <button
              className="cmn_btn"
              onClick={() => {
                setshowAddExerciseModal(true);
              }}
            >
              + Create Exercise
            </button>
            <button
              className="cmn_btn px-4 filter_btn"
              onClick={() => setToggleFilter(!toggleFilter)}
            >
              Filter
            </button>
           </div>

            {toggleFilter && (
              <div className="patient_filter">
                <div className="filter_list w-100">
                  {/* <div className="label">
                    <span>Exercise</span>
                  </div> */}
                  <input
                    type="text"
                    placeholder="Exercise Name"
                    className="form-control"
                  />
                </div>

                <div className="patient_dropdown w-100">
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
                        <Dropdown.Item>Deepak Rawat</Dropdown.Item>
                        <Dropdown.Item>Sahil</Dropdown.Item>
                        <Dropdown.Item>Aman</Dropdown.Item>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="filter_list w-100">
                  {/* <div className="label">
                    <span>Date</span>
                  </div> */}
                  <input
                    type="date"
                    placeholder="Exercise Name"
                    className="form-control"
                  />
                </div>
                <div className="patient_dropdown w-100">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Status
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
                        <Dropdown.Item>Men</Dropdown.Item>
                        <Dropdown.Item>Women</Dropdown.Item>
                        <Dropdown.Item>Non-Binary</Dropdown.Item>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className='d-flex justify-content-end gap-2'>

                <button className="cmn_btn">Search</button>
                <button className="cmn_btn fade_color">Clean</button>
                  </div>
              </div>
            )}
            <Tabs
              defaultActiveKey="active"
              id="uncontrolled-tab-example"
              className={`mb-3 cmn_tabs ${toggleFilter && "blur_bg"}`}
            >
              <Tab eventKey="active" title="Active">
                <ActiveExerciseTab />
              </Tab>
              <Tab eventKey="approvalRequests" title="Approval Requests">
                <Nodata />
              </Tab>
              <Tab eventKey="draft" title="Draft">
                Rejected
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <AddExcercise
        showAddExerciseModal={showAddExerciseModal}
        setshowAddExerciseModal={setshowAddExerciseModal}
      />
    </div>
  );
};

export default TrainerExercise;
