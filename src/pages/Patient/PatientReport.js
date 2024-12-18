import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Hearticon from '../../Images/heart.svg'
import PerformanceChart from "../../components/ReportCarts/performanceChart";
import ProgressChart from "../../components/ReportCarts/progressChart";
const PatientReport = () => {
    const tabs = [
        { index: 1, tab: "Daily" },
        { index: 2, tab: "Weekly" },
        { index: 3, tab: "Monthly" }
      ];
const [activeTab, setActiveTab] = useState(1); // Default to index 1

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="cmn_head d-flex align-items-center mb-3 position-relative gap-3">
          <h2 className="flex-grow-1">Report</h2>
          <button className="cmn_btn px-4">Back</button>
        </div>
        <Row className="row-gap-3">
            <Col lg={12}>
               <h4 className="report_title">Overall Performace</h4>
            </Col>
          <Col lg={9}>
          <div className="cmn_card">
                <PerformanceChart/>
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
                            onClick={() => handleTabClick(item.index)}
                        >
                            {item.tab}
                        </li>
                        ))}
                </ul>
            </div>
            <ProgressChart/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PatientReport;
