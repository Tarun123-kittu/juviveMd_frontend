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
import { fetchPlanSuggestions, clear_suggested_plans_state } from "../../redux/slices/patientPlan/planSuggestions";
import { get_patient_plan_message, clear_patient_plan_message_state } from "../../redux/slices/patientPlan/getPatientPlanMessage";
import Swal from 'sweetalert2'
import { showToast } from "../../common/toast/showToast";

const daysData = {
  category: "",
  patient_category: "",
  planExerciseId: null,
  training_type: [],
  exerciseId: "",
  exerciseName: "Untitled",
  exerciseImage: "",
  exerciseVideo: "",
  difficuilty_level: "",
  active: true,
  bodyParts: [],
  sets: [
    {
      reps: 0,
      time: { value: 0, unit: "sec" },
      weight: { value: 0, unit: "kg" },
    }
  ]
}


const PatientPlanComponent = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(clear_get_patient_exercise_plan_state())
      dispatch(clear_update_patient_exercise_plan_state())
      dispatch(clear_patient_plan_message_state())
    }
  }, [])
  function getCurrentDate(date) {
    console.log("gotNewDate--", date)
  }

  const location = useLocation()
  const navigate = useNavigate()
  const latestPlanStartDate=location.state.latestPlanStartDate;
  const latestPlanEndDate=location.state.latestPlanEndDate;
  console.log("LatestDates--",latestPlanStartDate,latestPlanEndDate)
  const selectedDate = location.state.selectedDate
  const formattedDate = location.state.formattedDate;
  // console.log("selectedDate--", selectedDate, "formattedDate--", formattedDate)
  const patientId = location.state.patientId
  const editable = location.state.editable
  const hasPlan = location.state.hasPlan
  const planStartAt = location.state.planStartAt
  const planEndAt = location.state.planEndAt
  console.log("planStartCompAt--", planStartAt, "planEndAt--", planEndAt)
  const exercisePlanId = location.state.exercisePlanId
  console.log("exercisePlanId--", exercisePlanId)
  const userpatient_category = location.state.patient_category
  if (!patientId) {
    navigate(-1)
  }
  const common_data = useSelector((store) => store.COMMON_DATA)
  const isPlanUpdated = useSelector((store) => store.UPDATE_PATIENT_EXERCISE_PLAN)
  const [savePlanModal, setSavePlanModal] = useState(false)
  const [exercise_category, setExercise_category] = useState()
  const [body_parts, setBody_parts] = useState()
  const [patient_category, setPatient_category] = useState([])

  const [training_type, setTraining_type] = useState([])
  const [selected_patient_category, setSelected_patient_category] = useState()
  const [selected_training_type, setSelected_training_type] = useState()
  const [activeTab, setActiveTab] = useState("Monday")
  const [exerciseDifficuilty, setExerciseDifficuilty] = useState()
  const [planValidFrom, setPlanValidFrom] = useState('')
  const [planValidTo, setPlanValidTo] = useState(planEndAt || '')

  const [planMessage, setPlanMessage] = useState("")
  const [days, setDays] = useState({
    Monday: [daysData],
    Tuesday: [daysData],
    Wednesday: [daysData],
    Thursday: [daysData],
    Friday: [daysData],
    Saturday: [daysData],
    Sunday: [daysData],
  });
  // console.log(days,"days============>")
  useEffect(() => {
    return () => {
      setDays({
        Monday: [daysData],
        Tuesday: [daysData],
        Wednesday: [daysData],
        Thursday: [daysData],
        Friday: [daysData],
        Saturday: [daysData],
        Sunday: [daysData],
      })
    }
  }, [])


  const isPlanCreated = useSelector((store) => store.CREATE_PATIENT_PLAN)
  const isPlanExercise = useSelector((store) => store.GET_PATIENT_EXERCISE_PLAN)
  const plan_message = useSelector((store) => store.PLAN_MESSAGE)
  const suggested_plans = useSelector((store) => store.PLAN_SUGGESTIONS)

  useEffect(() => {
    dispatch(common_data_api())
    dispatch(get_patient_plan_message({ patientId }))
  }, [])

  useEffect(() => {
    if (editable && exercisePlanId) {
      dispatch(get_patient_exercise_plan({ planId: exercisePlanId }))
    }
  }, [editable, exercisePlanId])

  useEffect(() => {
    if (common_data?.isSuccess) {
      console.log(common_data?.data?.data, "common_data?.data?.data")
      setExercise_category(common_data?.data?.data?.exercise_category)
      setBody_parts(common_data?.data?.data?.bodyParts)
      setExerciseDifficuilty(common_data?.data?.data?.exercise_difficulties)
      setPatient_category(common_data?.data?.data?.patient_category)
      setTraining_type(common_data?.data?.data?.training_type)
    }
  }, [common_data])

  useEffect(() => {
    if (!editable) {
      dispatch(fetchPlanSuggestions({ patientId }))
    }
  }, [hasPlan])

  const handleSavePlan = (newFromDate,newToDate) => {

    try {
      const validatedPlan = Object.keys(days).reduce((acc, day) => {
        const validExercises = days[day]
          .map((exercise) => ({

            exerciseId: exercise.exerciseId,
            planExerciseId: exercise.planExerciseId,
            difficulty_level: exercise.difficuilty_level || 'Easy',
            sets: exercise.sets.map((set) => ({
              time: {
                value: set.time.value,
                unit: set.time.unit,
              },
              weight: {
                value: set.weight.value,
                unit: set.weight.unit,
              },
              reps: set.reps,
            })),
          }))
          .filter(exercise => exercise.exerciseId);

        if (validExercises.length > 0) {
          acc[day] = validExercises;
        }

        return acc;
      }, {});

      if (Object.keys(validatedPlan).length === 0) {
        alert("No valid exercises found. Please ensure all required fields are completed.");
        return;
      }

      const payload = {
        patientId,
        planValidFrom:newFromDate,
        planValidTo:newToDate,
        days: validatedPlan
      };

      if (editable && exercisePlanId) {
        dispatch(updatePatientExercisePlan({ planId: exercisePlanId, ...payload }));
      } else {
        dispatch(create_patient_plan({ payload }));
      }
      // !editable && setPlanValidTo('');
    } catch (error) {
      console.error("Error during plan validation:", error.message);
      toast.error(error.message);
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
        acc[day] = isPlanExercise.data.data.days[day].map((exercise, i) => {
          return {
            ...exercise,
            exerciseId: exercise.exerciseDetails?.id,
            planExerciseId: exercise.planExerciseId,
            category: exercise.exerciseDetails?.exercise_type,
            difficuilty_level: exercise.difficulty_level || "",
            exerciseName: exercise.exerciseDetails?.exercise_name || "Untitled",
            patient_category: exercise?.exerciseDetails?.categories[i]?.category,
            exerciseImage: exercise.exerciseDetails?.image_url,
            exerciseVideo: exercise.exerciseDetails?.video_link,
            training_type: exercise.exerciseDetails?.training_type,
            active: true,
            bodyParts: exercise.exerciseDetails?.body_parts,
            sets: exercise.sets.map((val) => ({
              reps: val.reps,
              weight: { value: val.weight.value, unit: val.weight.unit },
              time: { value: val.time.value, unit: val.time.unit },
            })),
          };
        });
        return acc;
      }, {});

      const updatedDays = { ...staticDays, ...responseDays };

      setDays(updatedDays);
      setPlanValidFrom(isPlanExercise.data.data.planValidFrom);
      setPlanValidTo(isPlanExercise.data.data.planValidTo);
      setSelected_patient_category(isPlanExercise.data.data.patient_category);
      setSelected_training_type(isPlanExercise.data.data.training_type);
    }
  }, [isPlanExercise]);


  useEffect(() => {
    if (suggested_plans?.isSuccess && !editable) {
      const staticDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

      const updatedDays = staticDays.reduce((acc, day) => {
        const dayExercises = suggested_plans?.data?.data?.days?.[day] || [];

        acc[day] = dayExercises.length
          ? dayExercises.map((exercise) => {
            console.log(exercise, "exercise====>")
            const patientCategory = exercise.categories?.find(cat => cat.category === userpatient_category || "A");
            console.log(patientCategory, "patientCategory")
            return {
              category: exercise.exercise_type || "",
              patient_category: exercise?.patient_category || "A",
              training_type: exercise.training_type || [],
              exerciseId: exercise.id || "",
              planExerciseId: exercise.planExerciseId,
              exerciseName: exercise.exercise_name || "Untitled",
              exerciseImage: exercise.image_url || "",
              exerciseVideo: exercise.video_link || "",
              difficuilty_level: "",
              active: true,
              bodyParts: [],
              sets: patientCategory
                ? Array.from({ length: patientCategory.start_point?.sets || 0 }, () => ({
                  reps: patientCategory.start_point?.reps || 0,
                  time: { value: patientCategory.start_point?.time || 0, unit: "sec" },
                  weight: { value: patientCategory.start_point?.weight || 0, unit: "kg" },
                }))
                : [
                  {
                    reps: 0,
                    time: { value: 0, unit: "sec" },
                    weight: { value: 0, unit: "kg" },
                  },
                ],
            };
          })
          : [daysData];

        return acc;
      }, {});
      setDays(updatedDays);

      const firstExercise = suggested_plans?.data?.data?.days?.Monday?.[0];
      if (firstExercise) {
        setSelected_patient_category(firstExercise.patient_category || "A");
        setSelected_training_type(firstExercise.training_type || []);
      }
    }
  }, [suggested_plans, editable]);

  useEffect(() => {
    if (plan_message?.isSuccess) {
      setPlanMessage(plan_message?.data?.data)
    }
  }, [plan_message])
  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="d-flex justify-content-between mb-2">
          <img onClick={() => navigate(-1)} src="/previous.png" alt="back" height={30} width={30} className="mb-2 pointer_cur" />
          {plan_message?.isSuccess && <div className="message_class">
            <p>{planMessage}</p>
          </div>}
        </div>
        {isPlanExercise?.isLoading && editable ? <Loader /> : <div className="exercise_tab position-relative">
          <div className="position-absolute end-0 ps-3 bg-white">
            <button className="cmn_btn filter_btn px-4 " onClick={() => { setSavePlanModal(true) }}>Save Plan</button>
          </div>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => { setActiveTab(k); }}
            id="controlled-tab-example"
            className="mb-3 cmn_tabs"
          >
            {Object.keys(days)?.map((day, i) => {
              const newDate = new Date(selectedDate);
              const jsDayIndex = selectedDate?.getDay();
              const selectedDayIndex = (jsDayIndex + 6) % 7; // Adjust index to match Monday-first format
              const dayDifference = i - selectedDayIndex;
              newDate?.setDate(selectedDate?.getDate() + dayDifference);
              newDate?.setHours(0, 0, 0, 0); // Normalize time for accurate comparison
              const todayDate = new Date();
              todayDate?.setHours(0, 0, 0, 0);
              newDate?.setHours(0, 0, 0, 0);
              // Check if this tab should be disabled
              const isDisabled = newDate?.getTime() < todayDate?.getTime();
              return (<Tab eventKey={day} title={day} key={i} >
                {activeTab === day && (
                  <PatientPlanForm
                    isDisabled={isDisabled}
                    getCurrentDate={getCurrentDate}
                    selectedDate={selectedDate}
                    formattedDate={formattedDate}
                    eventData={day}
                    setDays={setDays}
                    days={days}
                    index={i}
                    exercise_category={exercise_category}
                    body_parts={body_parts}
                    exerciseDifficuilty={exerciseDifficuilty}
                    patientId={patientId}
                    editable={editable}
                    patient_category={patient_category}
                    training_type={training_type}
                    setSelected_patient_category={setSelected_patient_category}
                    selected_patient_category={selected_patient_category}
                    setSelected_training_type={setSelected_training_type}
                    selected_training_type={selected_training_type}
                    planStartAt={planStartAt}
                    planEndAt={planEndAt}

                  />
                )}
              </Tab>)
            })}
          </Tabs>
        </div>}
      </div>
      {savePlanModal && <SavePlanModal savePlanModal={savePlanModal} setSavePlanModal={setSavePlanModal} setPlanValidFrom={setPlanValidFrom} setPlanValidTo={setPlanValidTo} planValidFrom={planValidFrom} planValidTo={planValidTo} handleSavePlan={handleSavePlan} loading={isPlanCreated?.isLoading || isPlanUpdated?.isLoading} editable={editable} hasPlan={hasPlan}  latestPlanStartDate={latestPlanStartDate} latestPlanEndDate={latestPlanEndDate} />}
    </div>
  );
};

export default PatientPlanComponent;