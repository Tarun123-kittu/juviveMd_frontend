import React, { useState } from "react";
import PatientPlanForm from "./PatientPlanForm";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import './style.css'
const PatientPlanComponent = () => {
  const [days, setDays] = useState({
    Monday: [
      {
        category: "",
        exerciseId: "",
        difficulty_level: [],
        sets: [
          {
            weight: {
              value: 0,
              unit: "kg",
            },
            reps: 0,
          },
        ],
        intensity: 0,
      },
    ],
    Tuesday: [
      {
        category: "",
        exerciseId: "",
        difficulty_level: [],
        sets: [
          {
            weight: {
              value: 0,
              unit: "kg",
            },
            reps: 0,
          },
        ],
        intensity: 0,
      },
    ],
    Wednesday: [
      {
        category: "",
        exerciseId: "",
        difficulty_level: [],
        sets: [
          {
            weight: {
              value: 0,
              unit: "kg",
            },
            reps: 0,
          },
        ],
        intensity: 0,
      },
    ],
    Thursday: [
      {
        category: "",
        exerciseId: "",
        difficulty_level: [],
        sets: [
          {
            weight: {
              value: 0,
              unit: "kg",
            },
            reps: 0,
          },
        ],
        intensity: 0,
      },
    ],
    Friday: [
      {
        category: "",
        exerciseId: "",
        difficulty_level: [],
        sets: [
          {
            weight: {
              value: 0,
              unit: "kg",
            },
            reps: 0,
          },
        ],
        intensity: 0,
      },
    ],
    Saturday: [
      {
        category: "",
        exerciseId: "",
        difficulty_level: [],
        sets: [
          {
            weight: {
              value: 0,
              unit: "kg",
            },
            reps: 0,
          },
        ],
        intensity: 0,
      },
    ],
    Sunday: [
      {
        category: "",
        exerciseId: "",
        difficulty_level: [],
        sets: [
          {
            weight: {
              value: 0,
              unit: "kg",
            },
            reps: 0,
          },
        ],
        intensity: 0,
      },
    ],
  });
  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="exercise_tab">
          <Tabs
            defaultActiveKey="Monday"
            id="uncontrolled-tab-example"
            className="mb-3 cmn_tabs"
          >
            {Object.keys(days)?.map((day, i) => {
              return (
                <Tab eventKey={day} title={day}>
                  <PatientPlanForm eventData={day} setDays={setDays} days={days} index={i} />
                </Tab>
              )
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatientPlanComponent;
