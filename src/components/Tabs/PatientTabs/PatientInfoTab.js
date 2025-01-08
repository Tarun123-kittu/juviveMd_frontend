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

const PatientInfoTab = ({ patientId, weekday, exercise_category, weekdays, body_parts, exerciseDifficuilty, setLoading }) => {
  const dispatch = useDispatch()
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditPateintExercise, setshowEditPateintExercise] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [currImage, setCurrImage] = useState("")
  const [planId, setPlanId] = useState(null)
  const [data, setData] = useState([])
  const is_plan_deleted = useSelector((store) => store.DELETE_PATIENT_PLAN)
  const [patientPlanPermissions] = getRoutePermissions(permission_constants.PATIENTPLAN)
  const columns = [
    "Category",
    "Exercise Name",
    "Image",
    "Sets",
    "Description",
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
    dispatch(get_patient_plan({ id: patientId, weekday }))
  }, [])

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
      dispatch(get_patient_plan({ id: patientId, weekday }))
    }
    if (is_plan_deleted?.isError) {
      toast.error(is_plan_deleted?.error?.message)
      dispatch(clear_delete_patient_plan_state())
    }
  }, [is_plan_deleted])

  return (
    <>
      <DataTable columns={columns}>
        {patientExerciseData?.isLoading ? <tr><td colspan={7}><Loader /></td></tr> : data?.length === 0 ? <tr><td colspan={7}><Nodata /></td></tr> : Array.isArray(data) && data?.map(({ exercise, patient, patientPlan }, i) => (
          <tr>
            <td>{patientPlan?.category}</td>
            <td>{exercise?.exercise_name}</td>
            <td> <img type="button" src={exercise?.image_url || Training} altDeleteImage="" className="rounded-5" width={50} height={50} onClick={() => { setCurrImage(exercise?.image_url || Training); setShowPopup(true) }} /></td>
            <td>{patientPlan?.sets?.length}</td>
            <td>{exercise?.description}</td>
            <td className="text-decoration-underline">Easy</td>
            <td>
              <div className="d-flex gap-2">
                {/* <img src={LinkImage} width={18} alt="" /> */}
                {patientPlanPermissions?.canDelete && <img
                  src={DeleteImage}
                  className="ms-2 me-2"
                  width={18}
                  alt=""
                  onClick={() => handleDeletePlan(patientPlan?.id)}
                />}
                {patientPlanPermissions?.canUpdate && <img src={EditImage} width={18} alt="" onClick={() => handleEditExercise(patientPlan?.id)} />}
              </div>
            </td>
          </tr>
        ))}

      </DataTable>
      {showEditPateintExercise && <EditPateintExercise patientId={patientId} setshowEditPateintExercise={setshowEditPateintExercise} showEditPateintExercise={showEditPateintExercise} exercise_category={exercise_category} planId={planId} setPlanId={setPlanId} weekdays={weekdays} body_parts={body_parts} exerciseDifficuilty={exerciseDifficuilty} weekday={weekday} />}
      <FeedbackModal
        setShowReviewModal={setShowReviewModal}
        showReviewModal={showReviewModal}
      />
      <DeleteModal showDeleteModal={showDeleteModal} setshowDeleteModal={setShowDeleteModal} handleDelete={handleDelete} loading={is_plan_deleted?.isLoading} />
      <ImagePreview setShowPopup={setShowPopup} showPopup={showPopup} image={currImage} />
    </>
  );
};

export default PatientInfoTab;
