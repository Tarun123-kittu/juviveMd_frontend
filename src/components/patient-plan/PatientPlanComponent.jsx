import React, { useState, useEffect } from "react";
import PatientPlanForm from "./PatientPlanForm";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { common_data_api } from "../../redux/slices/commonDataSlice/commonDataDlice";
import { useDispatch, useSelector } from "react-redux";
import './style.css'

const PatientPlanComponent = () => {
  const dispatch = useDispatch()
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
        intensity: 0,
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
