import React, { useState, useEffect } from "react";
import default_user from "../../Images/default_user.svg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PatientInfoTab from "../../components/Tabs/PatientTabs/PatientInfoTab";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_selected_patient, clear_selected_patient_state } from "../../redux/slices/patientSlice/getSelectedPatientSlice";
import { calculateAge } from "../../common/calculateAge/calculateAge";
import { common_data_api } from "../../redux/slices/commonDataSlice/commonDataDlice";
import { formatDate } from "../../common/formatDate/formatDate";
import AddPateintExercise from "../../components/Modals/AddPateintExercise";
import { get_patient_plan, clear_patient_plan_state } from "../../redux/slices/patientPlan/getPAtientPlan";

const PatientData = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [patient_data, setPatient_data] = useState()
  const [exercise_category, setExercise_category] = useState()
  const [weekdays, setWeekdays] = useState()
  const [currentBmi, setCurrentBmi] = useState('')
  const [expectedBmi, setExpectedBmi] = useState('')
  const [body_parts, setBody_parts] = useState()
  const [exerciseDifficuilty, setExerciseDifficuilty] = useState()
  const [showAddPateintExercise, setshowAddPateintExercise,] = useState(false)
  const [activeTab, setActiveTab] = useState('monday');
  const { patientId } = location?.state ? location?.state : location
  const patient_details = useSelector((store) => store.SELECTED_PATIENT_DETAILS)
  const common_data = useSelector((store) => store.COMMON_DATA)

  useEffect(() => {
    dispatch(get_selected_patient({ id: patientId }))
    dispatch(common_data_api())
  }, [])

  function calculateBMI(height, weight, heightUnit, weightUnit) {
    if (heightUnit === "cm") {
      height = height / 100;
    } else if (heightUnit === "ft") {
      const [feet, inches = 0] = height.split(".").map(Number);
      height = (feet * 0.3048) + (inches * 0.0254);
    }

    if (weightUnit === "lbs") {
      weight = weight * 0.453592;
    }

    const bmi = weight / (height * height);

    let category = "";
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
    } else {
      category = "Obesity";
    }

    return {
      bmi: bmi.toFixed(2),
      category: category
    };
  }

  useEffect(() => {
    if (patient_details?.isSuccess) {
      setPatient_data(patient_details?.data?.data)
      const bmi = calculateBMI(patient_details?.data?.data?.height?.value, patient_details?.data?.data?.weight?.value, patient_details?.data?.data?.height?.unit, patient_details?.data?.data?.weight?.unit)
      setCurrentBmi(bmi?.bmi)
      const expectbmi = calculateBMI(patient_details?.data?.data?.height?.value, patient_details?.data?.data?.optimal_weight?.value, patient_details?.data?.data?.height?.unit, patient_details?.data?.data?.optimal_weight?.unit)
      setExpectedBmi(expectbmi?.bmi)
    }
  }, [patient_details])

  useEffect(() => {
    if (common_data?.isSuccess) {
      setExercise_category(common_data?.data?.data?.exercise_category)
      setWeekdays(common_data?.data?.data?.weekDays)
      setBody_parts(common_data?.data?.data?.bodyParts)
      setExerciseDifficuilty(common_data?.data?.data?.exercise_difficulties)
    }
  }, [common_data])



  const handleTabSelect = (key) => {
    dispatch(clear_patient_plan_state())
    setActiveTab(key); // Update active tab when a new tab is clicked
  };
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
            <ul className="justify-content-between">

              <li>
                <strong>Current BMI:</strong>
                <span>{currentBmi}</span>
              </li>
              <li>
                <strong>Expected BMI:</strong>
                <span>{expectedBmi}</span>
              </li>
              <li>
                <strong>Days Prefrences: </strong>
                <span>{patient_data?.exercise_perweek?.join(", ")}</span>
              </li>
              <li>
                <strong>Activity Level</strong>
                <span>{patient_data?.activity_level}</span>
              </li>
            </ul>
          </div>
          <button className="cmn_btn px-4">Reports</button>
        </div>
        <div className="cmn_head mb-3 mt-4 position-relative">
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
          <button className="cmn_btn position-absolute end-0 filter_btn mt-3" onClick={() => { setshowAddPateintExercise(true) }}>+ Add Exercise</button>
        </div>
        <Tabs
          activeKey={activeTab}  // Control active tab through state
          onSelect={handleTabSelect}  // Handle tab change
          id="uncontrolled-tab-example"
          className="mb-3 weekendTabs cmn_tabs"
        >
          <Tab eventKey="monday" title="Monday">
            {activeTab === 'monday' && (
              <PatientInfoTab patientId={patientId} weekday="Monday" exercise_category={exercise_category} weekdays={weekdays} />
            )}
          </Tab>
          <Tab eventKey="tuesday" title="Tuesday">
            {activeTab === 'tuesday' && (
              <PatientInfoTab patientId={patientId} weekday="Tuesday" exercise_category={exercise_category} weekdays={weekdays} />
            )}
          </Tab>
          <Tab eventKey="wednesday" title="Wednesday">
            {activeTab === 'wednesday' && (
              <PatientInfoTab patientId={patientId} weekday="Wednesday" exercise_category={exercise_category} weekdays={weekdays} />
            )}
          </Tab>
          <Tab eventKey="thursday" title="Thursday">
            {activeTab === 'thursday' && (
              <PatientInfoTab patientId={patientId} weekday="Thursday" exercise_category={exercise_category} weekdays={weekdays} />
            )}
          </Tab>
          <Tab eventKey="friday" title="Friday">
            {activeTab === 'friday' && (
              <PatientInfoTab patientId={patientId} weekday="Friday" exercise_category={exercise_category} weekdays={weekdays} />
            )}
          </Tab>
          <Tab eventKey="saturday" title="Saturday">
            {activeTab === 'saturday' && (
              <PatientInfoTab patientId={patientId} weekday="Saturday" exercise_category={exercise_category} weekdays={weekdays} />
            )}
          </Tab>
          <Tab eventKey="sunday" title="Sunday">
            {activeTab === 'sunday' && (
              <PatientInfoTab patientId={patientId} weekday="Sunday" exercise_category={exercise_category} weekdays={weekdays} />
            )}
          </Tab>
        </Tabs>
      </div>
      <AddPateintExercise showAddPateintExercise={showAddPateintExercise} setshowAddPateintExercise={setshowAddPateintExercise} exercise_category={exercise_category} patientId={patientId} weekdays={weekdays} body_parts={body_parts} exerciseDifficuilty={exerciseDifficuilty} />
    </div>
  );
};

export default PatientData;
