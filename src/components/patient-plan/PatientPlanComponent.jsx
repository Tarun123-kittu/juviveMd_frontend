import React, { useState, useEffect } from "react";
import PatientPlanForm from "./PatientPlanForm";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { common_data_api } from "../../redux/slices/commonDataSlice/commonDataDlice";
import { useDispatch, useSelector } from "react-redux";
import './style.css'
import { useLocation, useNavigate } from "react-router-dom";
import SavePlanModal from "../Modals/SavePlanModal";
import { create_patient_plan, clear_create_patient_plan_state } from "../../redux/slices/patientPlan/createPatientPlan";
import toast from "react-hot-toast";

const PatientPlanComponent = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const patientId = location.state.patientId
  if (!patientId) {
    navigate(-1)
  }
  const common_data = useSelector((store) => store.COMMON_DATA)
  const [savePlanModal, setSavePlanModal] = useState(false)
  const [exercise_category, setExercise_category] = useState()
  const [body_parts, setBody_parts] = useState()
  const [activeTab, setActiveTab] = useState("Monday")
  const [exerciseDifficuilty, setExerciseDifficuilty] = useState()
  const [planValidFrom, setPlanValidFrom] = useState('')
  const [planValidTo, setPlanValidTo] = useState('')
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
        flexibilityField: [{
          reps: "",
          weight: { value: null, unit: "kg" },
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" },
          heartRateTarget: { value: null, unit: "bpm" },
          distanceGoal: { value: null, unit: "km" },
          pace: "",
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
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" },
          heartRateTarget: { value: null, unit: "bpm" },
          distanceGoal: { value: null, unit: "km" },
          pace: "",
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
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" },
          heartRateTarget: { value: null, unit: "bpm" },
          distanceGoal: { value: null, unit: "km" },
          pace: "",
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
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" },
          heartRateTarget: { value: null, unit: "bpm" },
          distanceGoal: { value: null, unit: "km" },
          pace: "",
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
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" },
          heartRateTarget: { value: null, unit: "bpm" },
          distanceGoal: { value: null, unit: "km" },
          pace: "",
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
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" },
          heartRateTarget: { value: null, unit: "bpm" },
          distanceGoal: { value: null, unit: "km" },
          pace: "",
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
        }],
        cardioFields: [{
          time: { value: null, unit: "sec" },
          heartRateTarget: { value: null, unit: "bpm" },
          distanceGoal: { value: null, unit: "km" },
          pace: "",
        }]
      },
    ],
  });
  const isPlanCreated = useSelector((store) => store.CREATE_PATIENT_PLAN)
  console.log(isPlanCreated, "this is the is plan created")

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

  const handleSavePlan = () => {
    try {
      const validatedPlan = Object.keys(days).reduce((acc, day) => {
        // Filter exercises that pass all validations
        const validExercises = days[day].filter((exercise) => {
          // Check if category is present
          if (!exercise.category) return false;

          // Validation based on category
          if (exercise.category === "strength exercise") {
            // Validate flexibilityField
            const isFlexibilityValid = exercise.flexibilityField.every((field) =>
              Object.values(field).every(
                (value) => value !== null && value !== "" && value !== undefined
              )
            );

            if (!isFlexibilityValid) {
              throw new Error(
                `Validation failed for a strength exercise in ${day}. Ensure all flexibilityField values are provided.`
              );
            }
          } else if (exercise.category === "cardio exercise") {
            // Validate cardioFields
            const isCardioValid = exercise.cardioFields.every((field, index) => {
              console.log(`Validating cardioFields for ${day}, exercise:`, exercise);
              console.log(`Field ${index}:`, field);

              return Object.entries(field).every(([key, value]) => {
                if (key === "heartRateTarget") {
                  console.log(`Validating heartRateTarget:`, value);
                  return (
                    value &&
                    typeof value === "object" &&
                    value.value !== null &&
                    value.value !== "" &&
                    value.value !== undefined &&
                    value.unit !== null &&
                    value.unit !== "" &&
                    value.unit !== undefined
                  );
                }
                return value !== null && value !== "" && value !== undefined;
              });
            });

            if (!isCardioValid) {
              throw new Error(
                `Validation failed for a cardio exercise in ${day}. Ensure all cardioFields values are provided.`
              );
            }
          }

          // Check other required fields
          return (
            exercise.exerciseId &&
            exercise.exerciseName &&
            exercise.exerciseImage !== "" &&
            exercise.exerciseVideo !== "" &&
            exercise.intensity >= 0
          );
        });

        // Include the day if it has valid exercises
        if (validExercises.length > 0) {
          acc[day] = validExercises;
        }

        return acc;
      }, {});

      // Log validatedPlan for debugging
      console.log("Validated Plan:", validatedPlan);

      if (Object.keys(validatedPlan).length === 0) {
        alert("No valid exercises found. Please ensure all required fields are completed.");
        return;
      }

      // Save the validated plan
      dispatch(
        create_patient_plan({ patientId, planValidFrom, planValidTo, days: validatedPlan })
      );
    } catch (error) {
      console.error("Error during plan validation:", error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isPlanCreated?.isSuccess) {
      setSavePlanModal(false);
      dispatch(clear_create_patient_plan_state());
      navigate("/patientData", { state: { patientId: patientId } });
    }
    if(isPlanCreated?.isError){
      toast.error(isPlanCreated?.error?.message)
      dispatch(clear_create_patient_plan_state());
    }
  }, [isPlanCreated, dispatch, navigate, patientId]);




  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="exercise_tab position-relative">
          <div className="position-absolute end-0 ps-3 bg-white">
            <button className="cmn_btn filter_btn px-4 " onClick={() => { setSavePlanModal(true) }}>Save Plan</button>
          </div>
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
      {savePlanModal && <SavePlanModal savePlanModal={savePlanModal} setSavePlanModal={setSavePlanModal} setPlanValidFrom={setPlanValidFrom} setPlanValidTo={setPlanValidTo} planValidFrom={planValidFrom} planValidTo={planValidTo} handleSavePlan={handleSavePlan} />}
    </div>
  );
};

export default PatientPlanComponent;
