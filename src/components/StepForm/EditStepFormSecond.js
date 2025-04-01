import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const EditStepFormSecond = ({
  health_issue,
  setStep,
  patient_all_data,
  setSelected_health_issue,
  selected_health_issue,
  setStep_form_open,setIs_health_issue
}) => {

  console.log(setStep_form_open,"setStep_form_open")
  useEffect(() => {
    // Initialize selected health issues from patient_all_data.health_issue_text
    if (Array.isArray(patient_all_data?.health_issue_text)) {
      setSelected_health_issue(patient_all_data.health_issue_text);
    } else if (typeof patient_all_data?.health_issue_text === "string") {
      const issuesArray = patient_all_data.health_issue_text.split(/\s+|,+/);
      setSelected_health_issue(issuesArray);
    } else {
      setSelected_health_issue([]);
    }
  }, [patient_all_data, setSelected_health_issue]);

  const handleCheckboxChange = (issue) => {
    setSelected_health_issue((prevSelected) =>
      prevSelected.includes(issue)
        ? prevSelected.filter((item) => item !== issue) // Remove if already selected
        : [...prevSelected, issue] // Add if not selected
    );
  };
  const handleClose = () => {
  setStep_form_open(false);
   setIs_health_issue(true);
  };

  return (
    <div>
      <h5 className="step_heading pt-3">Edit Essential Health Questions</h5>
      <p className="tagLine">
        If you select any checkbox, please consult a doctor before using the
        app.
      </p>

      {health_issue?.map((issue, i) => (
        <Form.Group key={i} className="mb-3" controlId={`option-${i}`}>
          <Form.Check
            type="checkbox"
            id={`option-${i}`}
            name={`option-${i}`}
            label={issue}
            checked={selected_health_issue?.includes(issue)} // Check if issue is pre-selected
            onChange={() => handleCheckboxChange(issue)}
          />
        </Form.Group>
      ))}

      <div className="d-flex gap-3 justify-content-center">
        <button
          onClick={() => setStep(1)}
          className="cmn_btn border-btn ps-4 pe-4"
        >
          Back
        </button>
        <button
              onClick={() => {
                selected_health_issue.length > 0 ? handleClose() : setStep(3);
              }}
          className="cmn_btn ps-4 pe-4"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EditStepFormSecond;
