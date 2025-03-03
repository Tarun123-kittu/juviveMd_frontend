import React, { useState, useEffect } from "react";
import DataTable from "../../DataTable/DataTable";
import DeleteImage from "../../../Images/delete.png";
import EditImage from "../../../Images/edit.png";
import Training from "../../../Images/training.png";
import LinkImage from "../../../Images/linkIcon.png";
import FeedbackModal from "../../Modals/FeedbackModal";
import { get_patient_plan, clear_patient_plan_state } from "../../../redux/slices/patientPlan/getPAtientPlan";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader";
import Nodata from "../../StaticComponents/Nodata";
import EditPateintExercise from "../../Modals/EditPateintExercise";
import { delete_patient_plan, clear_delete_patient_plan_state } from "../../../redux/slices/patientPlan/deletePatientPlan";
import DeleteModal from "../../Modals/DeleteModal";
import toast from "react-hot-toast";
import { getRoutePermissions } from "../../../middleware/permissionsMiddleware/getRoutePermissions";
import { permission_constants } from "../../../constants/permissionConstants";
import ImagePreview from "../../../common/imagePreview/ImagePreviewer";
import { EyeSvg } from "../../SvgIcons/EyeSvg";
import PatientLogsModal from "./PatientLogsModal";
const PatientInfoTab = ({ patientId, weekday, exercise_category, weekdays, body_parts, exerciseDifficuilty, setLoading, hideItems, formattedDate, exercisePlanId, setExercisePlanId }) => {
  const dispatch = useDispatch()
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditPateintExercise, setshowEditPateintExercise] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [currImage, setCurrImage] = useState("")
  const [planId, setPlanId] = useState(null)
  const [data, setData] = useState([])
  const [feedbackValue, setFeedbackValue] = useState({})
  const is_plan_deleted = useSelector((store) => store.DELETE_PATIENT_PLAN)
  const [patientPlanPermissions] = getRoutePermissions(permission_constants.PATIENTPLAN)
  const [showPatientLogsModal, setShowPatientLogsModal] = useState(false)
  const columns = [
    "Exercise Name",
    "Set/Reps",
    "Weight/Time",
    "Achieved Set/Reps",
    "Achieved weight Time",
    "Patient Review",
    "Action",
  ];

  useEffect(() => {
    return () => {
      setLoading(true)
      dispatch(clear_patient_plan_state())
    }
  }, [])

  const patientExerciseData = useSelector((store) => store.GET_PATIENT_PLAN)

  useEffect(() => {
    setLoading(true)
    dispatch(clear_patient_plan_state())
    if (formattedDate) {
      dispatch(get_patient_plan({ id: patientId, currentDate: formattedDate }))
    }
  }, [formattedDate])

  useEffect(() => {
    if (patientExerciseData?.isSuccess) {
      setData(patientExerciseData?.data?.data)
      setLoading(false)
    }
    if (patientExerciseData?.isError) {
      setData([])
      setLoading(false)
    }
  }, [patientExerciseData])

  const handleEditExercise = (id) => {
    setPlanId(id)
    setshowEditPateintExercise(true)
  }

  const handleDeletePlan = (id) => {
    setPlanId(id)
    setShowDeleteModal(true)
  }

  const handleDelete = () => {
    dispatch(delete_patient_plan({ id: planId }))
  }

  useEffect(() => {
    if (is_plan_deleted?.isSuccess) {
      toast.success("Plan deleted Successfully ")
      dispatch(clear_delete_patient_plan_state())
      dispatch(clear_patient_plan_state())
      setShowDeleteModal(false)
      dispatch(get_patient_plan({ id: patientId, currentDate: formattedDate }))
    }
    if (is_plan_deleted?.isError) {
      toast.error(is_plan_deleted?.error?.message)
      dispatch(clear_delete_patient_plan_state())
    }
  }, [is_plan_deleted])

  const feedbackData = ["", "Effortless", "Fairly easy", "could do 2 more", "could do 1 more", "no more"]

  return (
    <>
      <PatientLogsModal setShow={setShowPatientLogsModal} show={showPatientLogsModal} />
      <DataTable columns={columns}>
        {patientExerciseData?.isLoading ? <tr><td colspan={7}><Loader /></td></tr> : data?.length === 0 ? <tr><td colspan={7}><Nodata /></td></tr> : Object.keys(data) && data?.exercises?.map(({ exerciseDetails, planExercise, logs, feedbacks
        }, i) => {
          return (
            <tr key={i}>
              <td>{exerciseDetails?.exercise_name}</td>
              <td>
                {planExercise?.sets?.length} /
                {planExercise?.sets
                  ?.map((set) => `${set?.reps ? set?.reps + " " + "Reps" : set?.time.value + " " + set?.time.unit}`)
                  .join('-') || "N/A"}
              </td>
              <td>
                {planExercise?.sets
                  ?.map((set) => `${set?.time?.value}${" "}${set?.time?.unit}`)
                  .join('-') || "N/A"}
              </td>

              <td>
                {logs?.length > 0 ? logs?.length + "/" : "------"}
                {logs?.map((log) => log?.sets?.map((set) => `${set?.distanceGoal?.value}${" "}${set?.distanceGoal?.unit}`).join('-'))}
              </td>

              <td>
                {logs?.length > 0 ? logs?.map((log) => log?.sets?.map((set) => `${set?.time?.value}${" "}${set?.time?.unit}`).join('-')) : "------"}
              </td>
              {/* <td>{planExercise?.sets?.length}</td>
              <td>{exerciseDetails?.description}</td> */}
              <td onClick={() => { feedbacks?.length > 0 && setShowReviewModal(true); setFeedbackValue(feedbacks[0]) }} className="text-decoration-underline cursor-pointer">
                {feedbacks?.map((data) => feedbackData[data?.enjoyment]).filter(Boolean).join(', ')}
              </td>

              <td>
                <div className="d-flex gap-2">
                  {/* <img src={LinkImage} width={18} alt="" /> */}
                  {/* {patientPlanPermissions?.canDelete && !hideItems && <img
                    src={DeleteImage}
                    className="ms-2 me-2"
                    width={18}
                    alt=""
                    onClick={() => handleDeletePlan(exerciseDetails?.id)}
                  />} */}
                  <button onClick={() => setShowPatientLogsModal(true)} className="iconBtn">
                    {EyeSvg}
                  </button>
                  {/* <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={planExercise?.active} />
                    <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                  </div> */}
                  {/* {patientPlanPermissions?.canUpdate && !hideItems && <img src={EditImage} width={18} alt="" onClick={() => handleEditExercise(exerciseDetails?.id)} />} */}
                </div>
              </td>
            </tr>
          )
        })
        }

      </DataTable>
      {showEditPateintExercise && <EditPateintExercise patientId={patientId} setshowEditPateintExercise={setshowEditPateintExercise} showEditPateintExercise={showEditPateintExercise} exercise_category={exercise_category} planId={planId} setPlanId={setPlanId} weekdays={weekdays} body_parts={body_parts} exerciseDifficuilty={exerciseDifficuilty} weekday={weekday} />}
      <FeedbackModal
        setShowReviewModal={setShowReviewModal}
        showReviewModal={showReviewModal}
        feedbackValue={feedbackValue}
      />
      <DeleteModal showDeleteModal={showDeleteModal} setshowDeleteModal={setShowDeleteModal} handleDelete={handleDelete} loading={is_plan_deleted?.isLoading} />
      <ImagePreview setShowPopup={setShowPopup} showPopup={showPopup} image={currImage} />
    </>
  );
};

export default PatientInfoTab;
