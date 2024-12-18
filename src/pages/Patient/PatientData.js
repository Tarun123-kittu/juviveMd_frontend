import React, { useState, useEffect } from "react";
import default_user from "../../Images/default_user.svg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PatientInfoTab from "../../components/Tabs/PatientTabs/PatientInfoTab";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_selected_patient, clear_selected_patient_state } from "../../redux/slices/patientSlice/getSelectedPatientSlice";
import { calculateAge } from "../../common/calculateAge/calculateAge";
import { formatDate } from "../../common/formatDate/formatDate";
import Loader from "../../common/Loader/Loader";

const PatientData = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [patient_data, setPatient_data] = useState()
  const { patientId } = location?.state ? location?.state : location
  console.log(patientId)
  const patient_details = useSelector((store) => store.SELECTED_PATIENT_DETAILS)

  useEffect(() => {
    dispatch(get_selected_patient({ id: patientId }))
  }, [])

  useEffect(() => {
    if (patient_details?.isSuccess) {
      setPatient_data(patient_details?.data?.data)
    }
  }, [patient_details])
  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="report_info">
          <div className="d-flex align-items-center table_user">
            <img src={default_user} alt="User Image" />
            <div className="d-inline-grid">
              <p className="mb-0">{patient_data?.firstName} {patient_data?.lastName}</p>
              <span>{patient_data?.roleName}</span>
            </div>
          </div>
          <div className="user-data">
            <ul className="justify-content-between">
              <li>
                <strong style={{ width: "80px" }}>Age:</strong>
                <span>{calculateAge(patient_data?.dob)} Years</span>
              </li>
              <li>
                <strong>Height({patient_data?.height?.unit}):</strong>
                <span>{patient_data?.height?.value}</span>
              </li>
              <li>
                <strong>Goal:</strong>
                <span>{patient_data?.goal}</span>
              </li>
              <li>
                <strong>Weeks:</strong>
                <span>4 Weeks</span>
              </li>

            </ul>
            <ul className="justify-content-between">

              <li>
                <strong>Weight ({patient_data?.weight?.unit}):</strong>
                <span>{patient_data?.weight?.value}</span>
              </li>
              <li>
                <strong>Phone No.</strong>
                <span>{patient_data?.countryCode ? "+" : ""}{patient_data?.countryCode} {patient_data?.phone}</span>
              </li>
              <li>
                <strong>Date </strong>
                <span>{formatDate(patient_data?.created_at)}</span>
              </li>
              <li>
                <strong>Status</strong>
                <span>{patient_data?.status === 0 ? "Inactive" : "Active"}</span>
              </li>
            </ul>
          </div>
          <button className="cmn_btn px-4">Reports</button>
        </div>
        <div className="cmn_head mb-3 mt-4">
          <h4>
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
          </h4>
        </div>
        <Tabs
          defaultActiveKey="monday"
          id="uncontrolled-tab-example"
          className="mb-3 weekendTabs cmn_tabs"
        >
          <Tab eventKey="monday" title="Monday">
            <PatientInfoTab />
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
