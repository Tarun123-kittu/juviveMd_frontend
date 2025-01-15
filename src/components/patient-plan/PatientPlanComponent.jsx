import React, { useState, useEffect } from "react";
import PatientPlanForm from "./PatientPlanForm";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { common_data_api } from "../../redux/slices/commonDataSlice/commonDataDlice";
import { useDispatch, useSelector } from "react-redux";
import './style.css'
import { useLocation,useNavigate } from "react-router-dom";

const PatientPlanComponent = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const patientId = location.state.patientId
  if(!patientId){
    navigate(-1)
  }
  const common_data = useSelector((store) => store.COMMON_DATA)
  const [exercise_category, setExercise_category] = useState()
  const [body_parts, setBody_parts] = useState()
  const [activeTab, setActiveTab] = useState("Monday")
  const [exerciseDifficuilty, setExerciseDifficuilty] = useState()
  const [days, setDays] = useState({
    Monday: [
      {
        category: "",
        exerciseId: "",
        exerciseName: "Untitled",
        exerciseImage: "",
        exerciseVideo: "",
        difficulty_level: [],
        bodyParts: [],
        sets: [],
        intensity: null,
        flexibilityField: [{
          reps: "",
          weight: { value: null, unit: "kg" },
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" },
          heartRateTarget : {value:null,unit :"bpm"},
          distanceGoal : {value:null,unit :"km"},
          pace : "",
        }]
      },
    ],
    Tuesday: [
      {
        category: "",
        exerciseId: "",
        exerciseName: "Untitled",
        exerciseImage: "",
        exerciseVideo: "",
        difficulty_level: [],
        bodyParts: [],
        sets: [],
        intensity: 0,
        flexibilityField: [{
          reps: "",
          weight: { value: null, unit: "kg" },
          time: { value: null, unit: "sec" }
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" }
        }]
      },
    ],
    Wednesday: [
      {
        category: "",
        exerciseId: "",
        exerciseName: "Untitled",
        exerciseImage: "",
        exerciseVideo: "",
        difficulty_level: [],
        bodyParts: [],
        sets: [],
        intensity: 0,
        flexibilityField: [{
          reps: "",
          weight: { value: null, unit: "kg" },
          time: { value: null, unit: "sec" }
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" }
        }]
      },
    ],
    Thursday: [
      {
        category: "",
        exerciseId: "",
        exerciseName: "Untitled",
        exerciseImage: "",
        exerciseVideo: "",
        difficulty_level: [],
        bodyParts: [],
        sets: [],
        intensity: 0,
        flexibilityField: [{
          reps: "",
          weight: { value: null, unit: "kg" },
          time: { value: null, unit: "sec" }
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" }
        }]
      },
    ],
    Friday: [
      {
        category: "",
        exerciseId: "",
        exerciseName: "Untitled",
        exerciseImage: "",
        exerciseVideo: "",
        difficulty_level: [],
        bodyParts: [],
        sets: [],
        intensity: 0,
        flexibilityField: [{
          reps: "",
          weight: { value: null, unit: "kg" },
          time: { value: null, unit: "sec" }
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" }
        }]
      },
    ],
    Saturday: [
      {
        category: "",
        exerciseId: "",
        exerciseName: "Untitled",
        exerciseImage: "",
        exerciseVideo: "",
        difficulty_level: [],
        bodyParts: [],
        sets: [],
        intensity: 0,
        flexibilityField: [{
          reps: "",
          weight: { value: null, unit: "kg" },
          time: { value: null, unit: "sec" }
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" }
        }]
      },
    ],
    Sunday: [
      {
        category: "",
        exerciseId: "",
        exerciseName: "",
        exerciseImage: "",
        exerciseVideo: "",
        difficulty_level: [],
        bodyParts: [],
        sets: [],
        intensity: 0,
        flexibilityField: [{
          reps: "",
          weight: { value: null, unit: "kg" },
          time: { value: null, unit: "sec" }
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" }
        }]
      },
    ],
  });
  console.log(days, "this is the days")

  useEffect(() => {
    dispatch(common_data_api())
  }, [])

  useEffect(() => {
    if (common_data?.isSuccess) {
      setExercise_category(common_data?.data?.data?.exercise_category)
      setBody_parts(common_data?.data?.data?.bodyParts)
      setExerciseDifficuilty(common_data?.data?.data?.exercise_difficulties)
    }
  }, [common_data])

  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="exercise_tab">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            id="controlled-tab-example"
            className="mb-3 cmn_tabs"
          >
            {Object.keys(days)?.map((day, i) => (
              <Tab eventKey={day} title={day} key={i}>
                {activeTab === day && (
                  <PatientPlanForm
                    eventData={day}
                    setDays={setDays}
                    days={days}
                    index={i}
                    exercise_category={exercise_category}
                    body_parts={body_parts}
                    exerciseDifficuilty={exerciseDifficuilty}
                    patientId={patientId}
                  />
                )}
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatientPlanComponent;
