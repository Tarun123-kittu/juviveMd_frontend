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

import Email from '../../Images/email.svg'
import Phone from '../../Images/phone.svg'
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
        {console.log(patient_data,"patient_data=======>")}
        <div className="d-flex gap-3">
        <div className="report_info flex-grow-1">
         <div className="user_main table_user_data d-flex flex-column">
         <div className="d-flex align-items-center flex-grow-1 gap-2">
            <img src={default_user} alt="User Image" className="user_profile" />
            <div className="d-inline-grid">
              <p className="mb-0 patien_name">{patient_data?.firstName} {patient_data?.lastName}</p>
              <div className="info_flex_grid align-items-center">
                <div className="link_image d-flex justify-content-center align-items-center">
                  <img src={Email} alt="email" />
                </div>
               <div>
                <span>Email</span>
                <p className="m-0">{patient_data?.email}</p>
               </div>
              </div>
              <div className="info_flex_grid align-items-center mt-2">
                <div className="link_image d-flex justify-content-center align-items-center">
                <img src={Phone} alt="phone" />
                </div>
               <div>
                <span>Phone Number</span>
                <p className="m-0">{patient_data?.countryCode ? "+" : ""}{patient_data?.countryCode} {patient_data?.phone}</p>
               </div>
              </div>
              {/* <span>{patient_data?.roleName}</span> */}
            </div>
          </div>
          <div className="execise_days">
            <h4 className="info_heading">Weekly Availability:</h4>
          <ul className="user_select_weeks"> 
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          </div>
         </div>
          <div className="user-data">
            <h4 className="info_heading">General Information: </h4>
          <div className="d-flex gap-3 justify-content-between">
          <ul className="">
            <li>
                <strong>Goal:</strong>
                <span>{patient_data?.goal}</span>
              </li>
            <li>
                <strong>Discomfort body:</strong>
                <span>{patient_data?.discomfort}</span>
              </li>
            <li>
                <strong>Workout Place</strong>
                <span>{patient_data?.workout_place}</span>
              </li>
            <li>
                <strong>Body fat %</strong>
                <span>{patient_data?.fat_percentage?.value}%</span>
              </li>
            <li>
                <strong>Workout Type</strong>
                <span>{patient_data?.workout_types}</span>
              </li>
           






              {/* <li>
                <strong style={{ width: "80px" }}>Age:</strong>
                <span>{calculateAge(patient_data?.dob)} Years</span>
              </li>
              <li>
                <strong>Height({patient_data?.height?.unit}):</strong>
                <span>{patient_data?.height?.value}</span>
              </li>
             
              <li>
                <strong>Weeks:</strong>
                <span>4 Weeks</span>
              </li> */}

            </ul>
            <ul>
            <li>
                <strong>Optimal Weight</strong>
                <span>{patient_data?.optimal_weight?.value}{patient_data?.optimal_weight?.unit}</span>
              </li>
            <li>
                <strong>Sleep Time</strong>
                <span>{patient_data?.sleep_rate}</span>
              </li>
            <li>
                <strong>Home Equipment </strong>
                <span>{patient_data?.equipment}</span>
              </li>
            <li>
                <strong>Workout Time </strong>
                <span>{patient_data?.workout_time}</span>
              </li>
            <li>
                <strong>Present Activity </strong>
                <span>{patient_data?.activity_level}</span>
              </li>
            </ul>
          </div>
            {/* <ul className="justify-content-between">

              <li>
                <strong>Weight ({patient_data?.weight?.unit}):</strong>
                <span>{patient_data?.weight?.value}</span>
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
            </ul> */}
          </div>
        </div>
        <div className="bmi_report d-flex flex-column">
              <h5 className="mb-0">BMI / Reports</h5>
              <div className="bmi_data "> 

              <ul className="d-flex gap-2 ">
                <li className="bmi_card flex-grow-1">
                <div className="link_image d-flex justify-content-center align-items-center">
                  <img src="/static/media/email.f44beff9edd8e704c93f5817bae9c873.svg" alt="email"/>
                  </div>
                  <span>Height</span>
                  <p className="mb-0">{patient_data?.height?.value}{patient_data?.height?.unit}</p>
                </li>
                <li className="bmi_card flex-grow-1">
                <div className="link_image d-flex justify-content-center align-items-center">
                  <img src="/static/media/email.f44beff9edd8e704c93f5817bae9c873.svg" alt="email"/>
                  </div>
                  <span>Weight</span>
                  <p className="mb-0">{patient_data?.weight?.value}{patient_data?.weight?.unit}</p>
                </li>
                <li className="bmi_card flex-grow-1">
                <div className="link_image d-flex justify-content-center align-items-center">
                  <img src="/static/media/email.f44beff9edd8e704c93f5817bae9c873.svg" alt="email"/>
                  </div>
                  <span>BMI</span>
                  <p className="mb-0">{currentBmi}</p>
                </li>
              </ul>
              <div className="footer_bmi">
              <button className="cmn_btn px-4">
              <svg className="me-2" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.7997 2.71048C15.3897 2.30048 14.6797 2.58048 14.6797 3.15048V6.64048C14.6797 8.10048 15.9197 9.31048 17.4297 9.31048C18.3797 9.32048 19.6997 9.32048 20.8297 9.32048C21.3997 9.32048 21.6997 8.65048 21.2997 8.25048C19.8597 6.80048 17.2797 4.19048 15.7997 2.71048Z" fill="white"/>
              <path d="M20.5 10.69H17.61C15.24 10.69 13.31 8.76 13.31 6.39V3.5C13.31 2.95 12.86 2.5 12.31 2.5H8.07C4.99 2.5 2.5 4.5 2.5 8.07V16.93C2.5 20.5 4.99 22.5 8.07 22.5H15.93C19.01 22.5 21.5 20.5 21.5 16.93V11.69C21.5 11.14 21.05 10.69 20.5 10.69ZM11.5 18.25H7.5C7.09 18.25 6.75 17.91 6.75 17.5C6.75 17.09 7.09 16.75 7.5 16.75H11.5C11.91 16.75 12.25 17.09 12.25 17.5C12.25 17.91 11.91 18.25 11.5 18.25ZM13.5 14.25H7.5C7.09 14.25 6.75 13.91 6.75 13.5C6.75 13.09 7.09 12.75 7.5 12.75H13.5C13.91 12.75 14.25 13.09 14.25 13.5C14.25 13.91 13.91 14.25 13.5 14.25Z" fill="white"/>
              </svg>

                Reports</button>
              </div>
              </div>
        </div>
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
      {showAddPateintExercise && <AddPateintExercise showAddPateintExercise={showAddPateintExercise} setshowAddPateintExercise={setshowAddPateintExercise} exercise_category={exercise_category} patientId={patientId} weekdays={weekdays} body_parts={body_parts} exerciseDifficuilty={exerciseDifficuilty} />}
    </div>
  );
};

export default PatientData;
