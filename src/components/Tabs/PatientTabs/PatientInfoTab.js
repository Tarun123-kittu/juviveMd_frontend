import React, { useState } from "react";
import DataTable from "../../DataTable/DataTable";
import DeleteImage from "../../../Images/delete.png";
import EditImage from "../../../Images/edit.png";
import Training from "../../../Images/training.png";
import LinkImage from "../../../Images/linkIcon.png";
import FeedbackModal from "../../Modals/FeedbackModal";
const PatientInfoTab = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const columns = [
    "Exercise Name",
    "Image",
    "Duration Time",
    "Description",
    "Patient Review",
    "Action",
  ];
  
  return (
    <>
      <DataTable columns={columns}>
        <tr>
          <td>Running</td>
          <td> <img src={Training}  altDeleteImage="" /></td>
          <td>10:00 Mins</td>
          <td>Normal pace, 3km</td>
          <td onClick={()=>setShowReviewModal(true)} className="text-decoration-underline">Easy</td>
          <td>
            <div className="d-flex gap-2">
            <img src={LinkImage} width={18} altDeleteImage="" />
            <img
              src={DeleteImage}
              className="ms-2 me-2"
              width={18}
              altDeleteImage=""
            />
            <img src={EditImage} width={18} altDeleteImage="" />
            </div>
          </td>
        </tr>
      </DataTable>
      <FeedbackModal
        setShowReviewModal={setShowReviewModal}
        showReviewModal={showReviewModal}
      />
    </>
  );
};

export default PatientInfoTab;
