import React from "react";
import default_user from "../../Images/default_user.svg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
const PatientData = () => {
  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="report_info">
          <div className="d-flex align-items-center table_user">
            <img src={default_user} alt="User Image" />
            <div className="d-inline-grid">
              <p className="mb-0">Neeraj</p>
              <span>Receptionist</span>
            </div>
          </div>
          <ul>
            <li>
              <strong>Age:</strong>
              <span>32 Years</span>
            </li>
            <li>
              <strong>Height(inch):</strong>
              <span>6.1 inchs</span>
            </li>
            <li>
              <strong>Goal:</strong>
              <span>Weight loss</span>
            </li>
            <li>
              <strong>Weeks:</strong>
              <span>4 Weeks</span>
            </li>
            <li>
              <strong>Weight (kg):</strong>
              <span>55 kg</span>
            </li>
            <li>
              <strong>Phone No.</strong>
              <span>08082297777</span>
            </li>
            <li>
              <strong>Date </strong>
              <span>04/09/2024</span>
            </li>
            <li>
              <strong>Status</strong>
              <span>In progress</span>
            </li>
          </ul>
          <button className="cmn_btn">Reports</button>
        </div>
        <div className="cmn_head mb-2 mt-4">
          <h2>
            Monday,2 July{" "}
            <svg
              className="ms-2"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 15.3C0 16.83 1.17 18 2.7 18H15.3C16.83 18 18 16.83 18 15.3V8.1H0V15.3ZM15.3 1.8H13.5V0.9C13.5 0.36 13.14 0 12.6 0C12.06 0 11.7 0.36 11.7 0.9V1.8H6.3V0.9C6.3 0.36 5.94 0 5.4 0C4.86 0 4.5 0.36 4.5 0.9V1.8H2.7C1.17 1.8 0 2.97 0 4.5V6.3H18V4.5C18 2.97 16.83 1.8 15.3 1.8Z"
                fill="black"
              />
            </svg>
          </h2>
        </div>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3 weekendTabs"
        >
          <Tab eventKey="monday" title="Monday">
            Tab content for Monday
          </Tab>
          <Tab eventKey="tuesday" title="Tuesday">
            Tab content for Tuesday
          </Tab>
          <Tab eventKey="wednessday" title="Wednessday" >
            Tab content for Wednessday
          </Tab>
          <Tab eventKey="thursday" title="Thursday" >
            Tab content for Thursday
          </Tab>
          <Tab eventKey="friday" title="Friday" >
            Tab content for Friday
          </Tab>
          <Tab eventKey="saturday" title="Saturday" >
            Tab content for Saturday
          </Tab>
          <Tab eventKey="sunday" title="Sunday" >
            Tab content for sunday
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientData;
