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
                <p className="bpm_status">Normal</p>
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
