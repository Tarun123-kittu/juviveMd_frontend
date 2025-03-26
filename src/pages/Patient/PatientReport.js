import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Hearticon from '../../Images/heart.svg'
import PerformanceChart from "../../components/ReportCarts/performanceChart";
import ProgressChart from "../../components/ReportCarts/progressChart";
import { useLocation, useNavigate } from "react-router-dom";
import { get_patient_weight__report } from "../../redux/slices/getPatientReportSlice/getPatientWeightReportSlice";
import { clear_get_patient_progress_report_state, get_patient_progress_report, setSelectedReportType } from "../../redux/slices/getPatientReportSlice/getPatientProgressReportSlice";
import { useDispatch, useSelector } from "react-redux";

const PatientReport = () => {
const [patientWeightReportData,setPatientWeightReportData]=useState([])
const [patientProgressReportMonthlyData,setPatientProgressMonthlyReportData]=useState([])
const [activeTab, setActiveTab] = useState(1); // Default to index 1
const navigate=useNavigate()
const dispatch=useDispatch()
const location=useLocation()
const [months,setMonths]=useState([])
const [averageWeight,setAverageWeight]=useState([])
const [unit,setUnit]=useState([])
const [monthlyProgressReportCategories,setMonthlyProgressReportCategories]=useState([])
const [monthlyProgressReportSeries,setMonthlyProgressReportSeries]=useState([])
const [selectedReportTypeData,setSelectedReportTypeData]=useState([])

const patientId = location.state.patientId
const getPatientWeightReportData=useSelector((state)=>state.GET_PATIENT_WEIGHT_REPORT)
const getPatientProgressReportData=useSelector((state)=>state.GET_PATIENT_PROGRESS_REPORT)
const {selectedReportType}=useSelector((state)=>state.GET_PATIENT_PROGRESS_REPORT);


const tabs = [
  { index: 1, tab: "daily" },
  { index: 2, tab: "weekly" },
  { index: 3, tab: "monthly" }
];
console.log("months--",months)
console.log("getPatientWeightReportApi--",getPatientWeightReportData,"patientId--",patientId)
console.log("getPatientProgressReportApi--",getPatientProgressReportData,"patientId--",patientId,)
console.log("selectedReportTypeData--",selectedReportType,selectedReportTypeData)

  const handleTabClick = (item) => {
    setActiveTab(item.index);
    dispatch(setSelectedReportType(item.tab))
  }; 

  useEffect(()=>{dispatch(get_patient_weight__report({patientId}))},[patientId])
  useEffect(()=>{dispatch(get_patient_progress_report({patientId}))},[patientId])

  useEffect(()=>{
    return ()=>clear_get_patient_progress_report_state()
  },[patientId])

  useEffect(()=>{
    if(getPatientWeightReportData?.isSuccess)
    {
      setPatientWeightReportData(getPatientWeightReportData?.data?.data)
      const extractedMonth=getPatientWeightReportData.data.data.map((item)=>item.month)
      const extractedWeight=getPatientWeightReportData.data.data.map((item)=>item.averageWeight)
      const extractedunit=getPatientWeightReportData.data.data.map((item)=>item.unit)
      setMonths(extractedMonth)
      setAverageWeight(extractedWeight)
      setUnit(extractedunit)
    }
  },[getPatientWeightReportData])


  useEffect(()=>{
    if(getPatientProgressReportData?.isSuccess)
    {
      setPatientProgressMonthlyReportData(getPatientProgressReportData?.data?.monthly?.data)
      setMonthlyProgressReportCategories(getPatientProgressReportData?.data?.monthly?.data?.categories)
      setMonthlyProgressReportSeries(getPatientProgressReportData?.data?.monthly?.data?.series)
      const selectReportTypeData=getPatientProgressReportData?.data[selectedReportType].data
      setSelectedReportTypeData(selectReportTypeData)
    }
  },[getPatientProgressReportData,dispatch])



  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="cmn_head d-flex align-items-center mb-3 position-relative gap-3">
          <h2 className="flex-grow-1">Report</h2>
          <button className="cmn_btn px-4" onClick={()=>navigate(-1)}>Back</button>
        </div>
        <Row className="row-gap-3">
            <Col lg={12}>
               <h4 className="report_title">Overall Performace</h4>
            </Col>
          <Col lg={9}>
          <div className="cmn_card">
                <PerformanceChart patientWeightReportData={patientWeightReportData} patientId={patientId} months={months} averageWeight={averageWeight} unit={unit}/>
            </div> 
          </Col>
          <Col lg={3}>
            <div className="cmn_card h-100">
                <div className="heart_head d-flex align-items-center justify-content-between">
                    <div className="hear_logo d-flex align-items-center justify-content-between ">
                    <img src={Hearticon} alt="icon" className="m-auto"/>
                    </div> 
                    <h5>Heart Rate</h5>

                </div>
                <h4 className="heart_rate d-flex gap-2 align-items-center">98 <span>bpm</span></h4>
                <p className="bpm_status mb-0">Normal</p>
                <svg width="279" className="w-100" height="131" viewBox="0 0 279 131" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M55.1784 55.3449C31.7385 51.7311 22.3859 51.9919 2.76562 62.4921V130.787H277.535V17.2266C260.29 24.7215 241.593 27.7488 223.534 33.1092C194.374 41.7653 183.804 18.5771 156.033 30.7268C130.621 41.8447 134.662 68.3911 108.385 72.0217C84.8892 75.2681 78.6182 58.9587 55.1784 55.3449Z" fill="url(#paint0_linear_3911_9093)" fill-opacity="0.4"/>
            <path d="M2.76562 104.779L4.83329 93.2917L18.8475 96.2783L20.2259 87.5482L44.6116 55.6464L95.5808 87.5482L108.997 68.7728L137.978 7.62891L150.197 85.617L188.293 99.2739L224.232 40.6928L277.535 75.6016" stroke="#E8394B" stroke-width="4.30102"/>
            <defs>
            <linearGradient id="paint0_linear_3911_9093" x1="140.954" y1="-12.9505" x2="140.954" y2="125.229" gradientUnits="userSpaceOnUse">
            <stop stop-color="#DA8184"/>
            <stop offset="1" stop-color="#CA6B6E" stop-opacity="0"/>
            </linearGradient>
            </defs>
            </svg>

            </div>
          </Col>
          <Col lg={12}>
          <h4 className="report_title">Individual Performance</h4>
          <div className="cmn_card">
            <div className="progres_head d-flex gap-3 justify-content-between align-items-center">
                <h6>Progress Report </h6>
                <ul>
                    {tabs.map((item) => (
                        <li
                            key={item.index}
                            className={activeTab === item.index ? "primary" : "light"}
                            onClick={() => handleTabClick(item)}
                        >
                            {item.tab}
                        </li>
                        ))}
                </ul>
            </div>
            {
              selectedReportTypeData && 
              (<ProgressChart 
                months={selectedReportTypeData.categories}
                strengthData={selectedReportTypeData?.series?.filter(item => item.name==="Strength").map((item)=>item.data)}
                weightLiftedData={selectedReportTypeData?.series?.filter(item => item.name==="Weight Lifted (kg)").map((item)=>item.data)}
                cardioData={selectedReportTypeData?.series?.filter(item => item.name==="Cardio (min)").map((item)=>item.data)}
                reportType={selectedReportType}
                />
            )
            }
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PatientReport;
