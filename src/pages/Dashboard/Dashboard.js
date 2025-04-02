import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./Dashboard.css";
import Default_user from "../../Images/default_user.svg";
import AddUsermodal from "../../components/Modals/AddUsermodal";
import DataTable from "../../components/DataTable/DataTable";
import { common_data_api } from "../../redux/slices/commonDataSlice/commonDataDlice";
import { useDispatch, useSelector } from "react-redux";
import Patient from "../Patient/Patient";
import { dashboard_api } from "../../redux/slices/dashboardSlice/dashboard";
import Reception_patient_list from "../../components/patientComponent/patientListComponent";
import { useNavigate } from "react-router-dom";
import { clear_all_patient_state } from "../../redux/slices/patientSlice/getPatientList";
import { clear_get_single_exercise_state } from "../../redux/slices/exerciseSlice/getExercise";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getRoutePermissions } from "../../middleware/permissionsMiddleware/getRoutePermissions";
import { permission_constants } from "../../constants/permissionConstants";
import { Col, Row } from "react-bootstrap";
import TrainerBarChart from "./TrainerBarChart";
import UserActivityChart from "./UserActivityChart";
import { get_user_activity_report } from "../../redux/slices/dashboardSlice/getUserActivityReport";
import { get_trainer_chat_response_report } from "../../redux/slices/dashboardSlice/getTrainerChatResponseReport";
import { PaymentSvg, healthCasesSvg,ExerciseApprovedSvg } from "./DashboardSvg";
const Dashboard = () => {
  const [userActivityReportData,setUserActivityReportData]=useState([])
  const [trainerChatResponseReportData,setTrainerChatResponseReportData]=useState([])
  
  console.log(userActivityReportData,"activityreport",trainerChatResponseReportData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [data, setData] = useState()
  const permissions_data = useSelector((store) => store.PERMISSIONS_DATA)
  const dashboard_data = useSelector((store) => store.DASHBOARD_STATE)
  const PatientPermissions = getRoutePermissions(permission_constants.PATIENT)?.[0] || {};
  const userRole = localStorage.getItem("user_role");
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(common_data_api())
    dispatch(dashboard_api())
  }, [])
  const columns = [
    "User Name	",
    "Date",
    "Age",
    "Phone No.",
    "Gender",
    "Goal",
    "Assign Trainer",
    "Status",
    "Action",
  ];

  // GET_USER_ACTIVITY_REPORT
  const activityReportResponse=useSelector((store)=>store. GET_USER_ACTIVITY_REPORT)
  const trainerChatReportResponse=useSelector((store)=>store. GET_TRAINER_CHAT_RESPONSE_REPORT)

  useEffect(()=>{
    dispatch(get_user_activity_report())
  },[])   

  useEffect(() => {
    if (activityReportResponse?.isSuccess) {
      setUserActivityReportData(activityReportResponse?.data?.data)
    }
  }, [activityReportResponse])

  useEffect(()=>{
    dispatch(get_trainer_chat_response_report())
  },[])   

  useEffect(() => {
    if (trainerChatReportResponse?.isSuccess) {
      setTrainerChatResponseReportData(trainerChatReportResponse?.data?.data)
    }
  }, [trainerChatReportResponse])

  useEffect(() => {
    if (dashboard_data?.isSuccess) {
      setData(dashboard_data?.data?.data)
    }
  }, [dashboard_data])

  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="cmn_head mb-3">
          <h2 className="mb-2">Dashboard</h2>
          <div className="dashboardinfo ">
            {dashboard_data?.isLoading ? <Skeleton className="info_card payment-card" height={200} /> : <div
              className="info_card payment-card"
              title="View Patient payment pending"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (data?.paymentPending >= 0) {
                  navigate("/patient", { state: { val: "paymentPending" } });
                } else {
                  navigate("/exercise", { state: { val: "active" } });
                }
                dispatch(clear_all_patient_state());
              }}
            >
              <div className="info_image d-flex align-items-center justify-content-center">
              {PaymentSvg}
              </div>
              <h3>{data?.paymentPending >=0 ? "Paymant Pending" : data?.totalExercises >= 0 ? "Total Exercise" : "0"}</h3>
              <h4>
                {data?.paymentPending ? data?.paymentPending : data?.totalExercises ? data?.totalExercises : "0"} <span>Till Today</span>
              </h4>
            </div>}
            {dashboard_data?.isLoading ? <Skeleton className="info_card exercise-card" height={200} /> : <div
              className="info_card exercise-card"
              title="View Patient payment pending"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (data?.healthCases >= 0) {
                  navigate("/patient", { state: { val: "healthIssue" } })
                } else {
                  navigate("/exercise", { state: { val: "draft" } });
                }
                dispatch(clear_all_patient_state());
              }}
            >
              <div className="info_image d-flex align-items-center justify-content-center">
                {healthCasesSvg}
              </div>
              <h3>{data?.healthCases >= 0 ? "Health Cases" : data?.exercisesInDraft >= 0 ? "Exercise In Draft" : ""}</h3>
              <h4>
                {data?.healthCases ? data?.healthCases : data?.exercisesInDraft ? data?.exercisesInDraft : "0"} <span>Till Today</span>
              </h4>
            </div>}
            {dashboard_data?.isLoading ? <Skeleton className="info_card exercise-card" height={200} /> : <div
              className="info_card exercise-card"
              title="View Patient payment pending"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (data?.exercisesApproval >= 0) {
                  navigate("/exercise", { state: { val: "approvalRequest" } })
                } else {
                  navigate("/patient", { state: { val: "active" } })
                }
                dispatch(clear_all_patient_state());
              }}
            >
              <div className="info_image d-flex align-items-center justify-content-center">
                {ExerciseApprovedSvg}
              </div>
              <h3>{data?.exercisesApproval >= 0 ? "Exercise Approval" : data?.totalPatients >= 0 ? "Total Patient" : ""}</h3>
              <h4>
                {data?.exercisesApproval ? data?.exercisesApproval : data?.totalPatients ? data?.totalPatients : "0"} <span>Till Today</span>
              </h4>
            </div>}
          </div>
        </div>
        <div>
     { userRole === "Admin" && <Row className="mb-3 pt-2 pb-2">
        <Col lg={9}>
          <div className="chart_card">
          <h4>
          Chats (Response time from Trainer )
          </h4>
          <TrainerBarChart trainerChatResponseReportData={trainerChatResponseReportData}/>
          </div>
        </Col>
        <Col lg={3}>
        <div className="chart_card userActivity">
          <h4>User Activity Pie Chart</h4>
          <UserActivityChart userActivityReportData={userActivityReportData}/>
          </div>
        </Col>
      </Row>}
        </div>
        <div className="cmn_head mb-2">
          <Reception_patient_list showButtons={false} className={true} />
        </div>

      </div>
      <AddUsermodal show={show} setShow={setShow} />
    </div>
  );
};

export default Dashboard;
