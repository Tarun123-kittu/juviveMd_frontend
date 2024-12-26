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

const PatientInfoTab = ({ patientId, weekday, exercise_category, weekdays }) => {
  const dispatch = useDispatch()
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEditPateintExercise, setshowEditPateintExercise] = useState(false)
  const [planId, setPlanId] = useState(null)
  const [data, setData] = useState([])
  const columns = [
    "Category",
    "Exercise Name",
    "Image",
    "Sets",
    "Description",
    "Patient Review",
    "Action",
  ];

  const patientExerciseData = useSelector((store) => store.GET_PATIENT_PLAN)
  console.log(patientExerciseData, "this is the patient plan exercise")

  useEffect(() => {
    dispatch(clear_patient_plan_state())
    dispatch(get_patient_plan({ id: patientId, weekday }))
  }, [])

  useEffect(() => {
    if (patientExerciseData?.isSuccess) {
      setData(patientExerciseData?.data?.data)
    }
    if (patientExerciseData?.ieError) {
      setData([])
    }
  }, [patientExerciseData])

  const handleEditExercise = (id) => {
    setPlanId(id)
    setshowEditPateintExercise(true)
  }

  return (
    <>
      <DataTable columns={columns}>
        {patientExerciseData?.isLoading ? <tr><td colspan={7}><Loader /></td></tr> : data?.length === 0 ? <tr><td colspan={7}><Nodata /></td></tr> : Array.isArray(data) && data?.map(({ exercise, patient, patientPlan }, i) => (
          <tr>
            <td>{exercise?.category}</td>
            <td>{exercise?.exercise_name}</td>
            <td> <img src={exercise?.imageUrl || Training} altDeleteImage="" className="rounded-5" width={50} height={50} /></td>
            <td>{patientPlan?.sets?.length}</td>
            <td>{exercise?.description}</td>
            <td onClick={() => setShowReviewModal(true)} className="text-decoration-underline">Easy</td>
            <td>
              <div className="d-flex gap-2">
                <img src={LinkImage} width={18} alt="" />
                <img
                  src={DeleteImage}
                  className="ms-2 me-2"
                  width={18}
                  alt=""
                />
                <img src={EditImage} width={18} alt="" onClick={() => handleEditExercise(patientPlan?.id)} />
              </div>
            </td>
          </tr>
        ))}

      </DataTable>
      {showEditPateintExercise && <EditPateintExercise patientId={patientId} setshowEditPateintExercise={setshowEditPateintExercise} showEditPateintExercise={showEditPateintExercise} exercise_category={exercise_category} planId={planId} setPlanId={setPlanId} weekdays={weekdays}/>}
      <FeedbackModal
        setShowReviewModal={setShowReviewModal}
        showReviewModal={showReviewModal}
      />
    </>
  );
};

export default PatientInfoTab;
