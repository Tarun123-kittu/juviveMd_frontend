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
import { get_patient_exercise_plan, clear_get_patient_exercise_plan_state } from "../../redux/slices/patientPlan/getPatientExercisePlan";
import Loader from "../../common/Loader/Loader";
import { updatePatientExercisePlan, clear_update_patient_exercise_plan_state } from "../../redux/slices/patientPlan/updatePatientExercisePlan";

const daysData = {
  category: "",
  exerciseId: "",
  exerciseName: "Untitled",
  exerciseImage: "",
  exerciseVideo: "",
  difficulty_level: [],
  active: true,
  bodyParts: [],
  sets: [],
  intensity: 0,
  flexibilityField: [
    {
      reps: "",
      weight: { value: null, unit: "kg" },
    },
  ],
  cardioFields: [
    {
      time: { value: null, unit: "sec" },
      heartRateTarget: { value: null, unit: "bpm" },
      distanceGoal: { value: null, unit: "km" },
      pace: "",
    },
  ],
}

const PatientPlanComponent = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(clear_get_patient_exercise_plan_state())
      dispatch(clear_update_patient_exercise_plan_state())
    }
  }, [])
  const location = useLocation()
  const navigate = useNavigate()
  const patientId = location.state.patientId
  const editable = location.state.editable
  const planStartAt = location.state.planStartAt
  const planEndAt = location.state.planEndAt
  const exercisePlanId = location.state.exercisePlanId
  if (!patientId) {
    navigate(-1)
  }
  const common_data = useSelector((store) => store.COMMON_DATA)
  const isPlanUpdated = useSelector((store) => store.UPDATE_PATIENT_EXERCISE_PLAN)
  const [savePlanModal, setSavePlanModal] = useState(false)
  const [exercise_category, setExercise_category] = useState()
  const [body_parts, setBody_parts] = useState()
  const [activeTab, setActiveTab] = useState("Monday")
  const [exerciseDifficuilty, setExerciseDifficuilty] = useState()
  const [planValidFrom, setPlanValidFrom] = useState('')
  const [planValidTo, setPlanValidTo] = useState(planEndAt || '')
  const [days, setDays] = useState({
    Monday: [daysData],
    Tuesday: [daysData],
    Wednesday: [daysData],
    Thursday: [daysData],
    Friday: [daysData],
    Saturday: [daysData],
    Sunday: [daysData],
  });
  console.log(days, "this is the days")
  const isPlanCreated = useSelector((store) => store.CREATE_PATIENT_PLAN)
  const isPlanExercise = useSelector((store) => store.GET_PATIENT_EXERCISE_PLAN)

  useEffect(() => {
    dispatch(common_data_api())
  }, [])

  useEffect(() => {
    if (editable && exercisePlanId) {
      dispatch(get_patient_exercise_plan({ planId: exercisePlanId }))
    }
  }, [editable, exercisePlanId])

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

              return Object.entries(field).every(([key, value]) => {
                if (key === "heartRateTarget") {
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

      if (Object.keys(validatedPlan).length === 0) {
        alert("No valid exercises found. Please ensure all required fields are completed.");
        return;
      }
      if (editable && exercisePlanId) {
        dispatch(updatePatientExercisePlan({ planId: exercisePlanId, patientId, planValidFrom, planValidTo, days: validatedPlan }))
      } else {
        dispatch(
          create_patient_plan({ patientId, planValidFrom, planValidTo, days: validatedPlan })
        );
      }
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
    if (isPlanCreated?.isError) {
      toast.error(isPlanCreated?.error?.message)
      dispatch(clear_create_patient_plan_state());
    }
  }, [isPlanCreated, dispatch, navigate, patientId]);

  useEffect(() => {
    if (isPlanUpdated?.isSuccess) {
      setSavePlanModal(false)
      dispatch(clear_update_patient_exercise_plan_state())
      navigate("/patientData", { state: { patientId: patientId } });
    }
    if (isPlanUpdated?.isError) {
      toast.error(isPlanUpdated?.error?.message)
      dispatch(clear_update_patient_exercise_plan_state())
    }
  }, [isPlanUpdated])

  useEffect(() => {
    if (isPlanExercise?.isSuccess) {

      const staticDays = {
        Monday: [daysData],
        Tuesday: [daysData],
        Wednesday: [daysData],
        Thursday: [daysData],
        Friday: [daysData],
        Saturday: [daysData],
        Sunday: [daysData],
      };

      const responseDays = Object.keys(isPlanExercise.data.data.days).reduce((acc, day) => {
        acc[day] = isPlanExercise.data.data.days[day].map((exercise) => {
          if (exercise.category === "strength exercise") {
            return {
              ...exercise,
              exerciseId : exercise.exerciseDetails?.id,
              exerciseName: exercise.exerciseDetails?.exercise_name || "Untitled",
              exerciseImage: exercise.exerciseDetails?.image_url,
              exerciseVideo: exercise.exerciseDetails?.video_link,
              active: true,
              bodyParts: exercise.exerciseDetails?.body_parts,
              flexibilityField: exercise.sets.map((val) => ({
                reps: val.reps,
                weight: { value: val.weight.value, unit: val.weight.unit },
              })),
              cardioFields: [{
                time: { value: null, unit: "sec" },
                heartRateTarget: { value: null, unit: "bpm" },
                distanceGoal: { value: null, unit: "km" },
                pace: "",
              }],
            };
          } else {
            return {
              ...exercise,
              exerciseId : exercise.exerciseDetails?.id,
              exerciseName: exercise.exerciseDetails?.exercise_name || "Untitled",
              exerciseImage: exercise.exerciseDetails?.image_url,
              exerciseVideo: exercise.exerciseDetails?.video_link,
              active: true,
              bodyParts: exercise.exerciseDetails?.body_parts,
              cardioFields: exercise.sets.map((val) => ({
                time: { value: val.time.value, unit: val.time.unit },
                heartRateTarget: { value: val.heartRateTarget.value, unit: "bpm" },
                distanceGoal: { value: val.distanceGoal.value, unit: val.distanceGoal.unit },
                pace: val.pace,
              })),
              flexibilityField: [{
                reps: "",
                weight: { value: null, unit: "kg" },
              }],
            };
          }
        });
        return acc;
      }, {});

      const updatedDays = { ...staticDays, ...responseDays };

      setDays(updatedDays);
      setPlanValidFrom(isPlanExercise.data.data.planValidFrom);
      setPlanValidTo(isPlanExercise.data.data.planValidTo);
    }
  }, [isPlanExercise]);

  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        {isPlanExercise?.isLoading && editable ? <Loader /> : <div className="exercise_tab position-relative">
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
                    editable={editable}
                  />
                )}
              </Tab>
            ))}
          </Tabs>
        </div>}
      </div>
      {savePlanModal && <SavePlanModal savePlanModal={savePlanModal} setSavePlanModal={setSavePlanModal} setPlanValidFrom={setPlanValidFrom} setPlanValidTo={setPlanValidTo} planValidFrom={planValidFrom} planValidTo={planValidTo} handleSavePlan={handleSavePlan} loading={isPlanCreated?.isLoading || isPlanUpdated?.isLoading} editable={editable} />}
    </div>
  );
};

export default PatientPlanComponent;
